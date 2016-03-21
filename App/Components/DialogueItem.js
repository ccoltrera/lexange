'use strict';
import React, {
  Component,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
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

    var playColor = this.state.audioReady ? '#FFFFFF' : '#FFFFFF';

    var playIcon = this.state.playing ? (
      <Icon name='stop' style={[styles.buttonIcon, {fontSize: 22}]} />
    ) : (
      <Icon name='play' style={[styles.buttonIcon, {paddingLeft: 4, color: playColor}]} />
    )

    var playButton = this.state.audioReady ? (
      <TouchableOpacity
        style={styles.button}
        onPress={this._togglePlaySound}>
        {playIcon}
      </TouchableOpacity>
    ) : (
      <View style={[styles.button, {backgroundColor: '#979797'}]}>
        {playIcon}
      </View>
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

    var bubbleSpecifics = this.state.show ? (
      {backgroundColor: '#FFFFFF' }
    ) : (
      {backgroundColor: '#8ACFD6',
        borderWidth: 0 }
    )

    var triangleInsideColor = this.state.show ? (
      {borderRightColor: '#FFFFFF' }
    ) : (
      {borderRightColor: '#8ACFD6', left: 4}
    )

    var triangleOutsideColor = this.state.show ? (
      null
    ) : (
      {borderRightColor: 'transparent' }
    )

    return (
        <TouchableHighlight
          style={styles.card}
          onPress={this._toggleShow}
          underlayColor='#EEEEEE'
          >
          <View style={{flexDirection: 'row'}}>
            <View style={styles.imageHolder}>
              <Image style={styles.image} source={{uri: this.person.pictureUri}} />
              {playButton}
            </View>
            <View style={{flexDirection: 'column', flex: 1}}>
              <View>
                <View style={styles.talkBubble}>
                  <View style={[styles.talkBubbleTriangle, triangleOutsideColor]} />
                    <View
                      style={[styles.bubble, styles.talkBubbleSquare, bubbleSpecifics]}>
                      {text}
                    </View>
                  <View style={[styles.talkBubbleTriangleInside, triangleInsideColor]} />
                </View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
    )
  }

}

const styles = StyleSheet.create({
  card: {
    margin: 15,
    marginBottom: 0,
    padding: 15,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    },
    justifyContent: 'center'
  },
  imageHolder: {
    justifyContent: 'center',
    height: 80,
    width: 80,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#979797',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 15,
    height: 80,
    width: 80,
  },
  button: {
    position: 'absolute',
    right: -60,
    // left: 40,
    top: 20,
    // left: 0,
    // alignSelf: 'center',
    height: 120,
    width: 120,
    // backgroundColor: 'rgba(240,183,103,0.5)',
    backgroundColor: 'rgba(22,159,173,1)',
    borderRadius: 60,
    justifyContent: 'center',
    // borderWidth: 2,
    borderColor: 'rgba(22,159,173,0.6)',
    // backgroundColor: 'rgba(255,255,255,1)'
  },
  buttonIcon: {
    fontSize: 26,
    color: '#FFFFFF',
    marginRight: 47,
    marginBottom: 49,
    // color: 'rgba(22,159,173,1)',
    alignSelf: 'center'
  },
  bubble: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    // height: 50,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#979797',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  talkBubbleSquare: {
    marginLeft: 15,
    flex: 1,
    // height: 80,
  },
  talkBubbleTriangle: {
    position: 'absolute',
    left: 3,
    top: 11,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 6,
    borderRightWidth: 13,
    borderRightColor: '#979797',
    borderBottomWidth: 6,
    borderBottomColor: 'transparent'
  },
  talkBubbleTriangleInside: {
    position: 'absolute',
    left: 5,
    top: 11,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 6,
    borderRightWidth: 13,
    borderRightColor: '#FFFFFF',
    borderBottomWidth: 6,
    borderBottomColor: 'transparent'
  },
  bubbleText: {
    backgroundColor: 'rgba(255,255,255,0)',
    fontSize: 18
  },
});

export default DialogueItem;
