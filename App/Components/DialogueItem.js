'use strict';
import React, {
  Component,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Sound from 'react-native-sound';

import audioUtils from '../Utils/audioUtils';

class DialogueItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      show: false,
      audioReady: false,
      // hundredthSec: 0,
      tenthSec: 0,
      sec: 0,
      tenSec: 0,
      min: 0,
      tenMin: 0
    };

    this.template = this.props._readTemplate();

    this.dialogue = this.template.dialogue[this.props.num];
    this.person = this.template.people[this.dialogue.person];

    this._toggleShow = this._toggleShow.bind(this);

    this._togglePlay = audioUtils._togglePlay.bind(this);
    this._time = audioUtils._time.bind(this);
    this._startTimer = audioUtils._startTimer.bind(this);
    this._stopTimer = audioUtils._stopTimer.bind(this);
    this._resetTimer = audioUtils._resetTimer.bind(this);

    if (this.dialogue.audioUri) {
      this.audioObject = new Sound(this.dialogue.audioUri, Sound.DOCUMENT, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        } else { // loaded successfully
          console.log('duration in seconds: ' + this.audioObject.getDuration() +
            ' number of channels: ' + this.audioObject.getNumberOfChannels());

          var audioDuration = this.audioObject.getDuration();

          this._togglePlaySound = this._togglePlay.bind(null, this.audioObject);
          this.setState({
            audioReady: true,
            audioDuration: Math.round(audioDuration * 10) / 10
          });
        }
      })
    }
  }

  _toggleShow() {
    this.setState({
      show: !this.state.show
    });
  }

  _generateTimeDisplay(num) {
    var timeString = '';

    if (num > 60) {

    }
    else {
      timeString = '00:';
      if (num >= 10) {
        timeString = timeString + num;
      } else {
        timeString = timeString + '0' + num;
      }
    }

    if (timeString.length === 5) {
      timeString = timeString + '.0';
    }

    return timeString;
  }

  render() {

    var playColor = this.state.audioReady ? '#169FAD' : '#EEEEEE';

    var playIcon = this.state.playing ? (
      <Icon name='stop' style={[styles.buttonIcon, {fontSize: 24}]} />
    ) : (
      <Icon name='play' style={[styles.buttonIcon, {paddingLeft: 3.5, color: playColor}]} />
    )

    var playButton = this.state.audioReady ? (
      <TouchableHighlight
        style={styles.button}
        // underlayColor='#028B99'
        underlayColor='#EEEEEE'
        onPress={this._togglePlaySound}>
        {playIcon}
      </TouchableHighlight>
    ) : (
      <View style={[styles.button]}>
        {playIcon}
      </View>
    )

    var durationString = this._generateTimeDisplay(this.state.audioDuration);

    var timeDisplay = this.state.audioReady ? (
      // <Text style={styles.timer}>{this.state.tenMin}{this.state.min}:{this.state.tenSec}{this.state.sec}.{this.state.tenthSec} / {durationString}</Text>
      null
    ) : (
      null
    )

    var text = this.state.show ? (
        <Text style={[styles.bubbleText, {color: '#858E99'}]}>
          { this.dialogue.phraseTrans }
        </Text>
      ) : (
        <Text style={[styles.bubbleText, {color: '#FFFFFF'}]}>
          { this.dialogue.phrase }
        </Text>
      )

    var bubbleColor = this.state.show ? (
      {backgroundColor: '#FFFFFF' }
    ) : (
      null
    )

    var triangleColor = this.state.show ? (
      {borderRightColor: '#FFFFFF' }
    ) : (
      null
    )

    return (
        <TouchableHighlight
          style={styles.card}
          onPress={this._toggleShow}
          underlayColor='#EEEEEE'
          >
          <View>
          <Text style={styles.labelText}>{this.person.name}:</Text>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.imageHolder} source={{uri: this.person.pictureUri}} />
            <View style={{flexDirection: 'column', flex: 1}}>
              <View>
                <View style={styles.talkBubble}>
                  <View style={styles.talkBubbleTriangle} />
                    <View
                      style={[styles.bubble, styles.talkBubbleSquare, bubbleColor]}>
                      {text}
                    </View>
                  <View style={[styles.talkBubbleTriangleInside, triangleColor]} />
                </View>
              </View>
              {playButton}
              {timeDisplay}
            </View>
          </View>
          </View>
        </TouchableHighlight>
    )
  }

}

const styles = StyleSheet.create({
  labelText: {
    fontFamily: 'helvetica',
    fontWeight: '300',
    fontSize: 18,
    marginBottom: 10,
  },
  imageHolder: {
    justifyContent: 'center',
    height: 80,
    width: 80,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C8C7CC',
    borderRadius: 10
  },
  bubble: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    // height: 50,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#C8C7CC',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  bubbleText: {
    backgroundColor: 'rgba(255,255,255,0)',
    fontSize: 18
  },
  button: {
    height: 55,
    width: 55,
    marginTop: 10,
    // backgroundColor: '#169FAD',
    backgroundColor: '#FFFFFF',
    borderColor: '#C8C7CC',
    borderWidth: 2,
    borderRadius: 27.5,
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 28,
    // color: '#FFF',
    color: '#169FAD',
    alignSelf: 'center'
  },
  card: {
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  talkBubbleSquare: {
    backgroundColor: '#169FAD',
    borderWidth: 2,
    borderColor: '#169FAD',
  },
  talkBubbleTriangle: {
    position: 'absolute',
    left: -9,
    top: 7,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 13,
    borderRightWidth: 36,
    borderRightColor: '#169FAD',
    borderBottomWidth: 13,
    borderBottomColor: 'transparent'
  },
  talkBubbleTriangleInside: {
    position: 'absolute',
    left: -3.0,
    top: 16.75,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 3.25,
    borderRightWidth: 9,
    borderRightColor: '#169FAD',
    borderBottomWidth: 3.25,
    borderBottomColor: 'transparent'
  },
  timer: {
    // alignSelf: 'center',
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'Droid Sans Mono',
    color: '#000000'
  },
});

export default DialogueItem;
