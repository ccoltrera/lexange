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

class DialogueItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      show: false,
      audioReady: false
    };

    this.template = this.props._readTemplate();

    this._play = this._play.bind(this);

    this.dialogue = this.template.dialogue[this.props.num];
    this.person = this.template.people[this.dialogue.person];

    this._toggleShow = this._toggleShow.bind(this);

    this._play = this._play.bind(this);
    this._time = this._time.bind(this);
    this._startTimer = this._startTimer.bind(this);
    this._stopTimer = this._stopTimer.bind(this);
    this._resetTimer = this._resetTimer.bind(this);

    if (this.dialogue.audioUri) {
      this.audioObject = new Sound(this.dialogue.audioUri, Sound.DOCUMENT, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        } else { // loaded successfully
          console.log('duration in seconds: ' + this.audioObject.duration +
            ' number of channels: ' + this.audioObject.numberOfChannels);

          this._playSound = this._play.bind(null, this.audioObject);
          this.setState({audioReady: true});
        }
      })
    }
  }

  _toggleShow() {
    this.setState({
      show: !this.state.show
    });
  }

   _startTimer() {
    this.timer = setTimeout(() => {
      this._time();
      this._startTimer();
    }, 1000);
  }

  _stopTimer() {
    clearTimeout(this.timer);
  }

  _time() {
    if (this.state.sec < 9) {
      this.setState({
        hundredthSec: 0,
        tenthSec: 0,
        sec: this.state.sec + 1
      });
    } else if (this.state.tenSec < 5) {
      this.setState({
        hundredthSec: 0,
        tenthSec: 0,
        sec: 0,
        tenSec: this.state.tenSec + 1
      });
    } else if (this.state.min < 9) {
      this.setState({
        hundredthSec: 0,
        tenthSec: 0,
        sec: 0,
        tenSec: 0,
        min: this.state.min + 1
      });
    } else if (this.state.tenMin < 5) {
      this.setState({
        hundredthSec: 0,
        tenthSec: 0,
        sec: 0,
        tenSec: 0,
        min: 0,
        tenMin: this.state.tenMin + 1
      });
    } else {
      this.setState({
        hundredthSec: 0,
        tenthSec: 0,
        sec: 0,
        tenSec: 0,
        min: 0,
        tenMin: 0
      });
    }
  }

  _resetTimer() {
    this.setState({
      hundredthSec: 0,
      tenthSec: 0,
      sec: 0,
      tenSec: 0,
      min: 0,
      tenMin: 0
    });
  }

  _play(sound) {
    this._stopTimer();
    this._resetTimer();
    this.setState({playing : !this.state.playing});

    if (this.state.playing) {

      this._startTimer();

      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing');
          this._stopTimer();
          this.setState({playing : false});
        } else {
          console.log('playback failed due to audio decoding errors');
          this._stopTimer();
          this.setState({playing : false});
        }
      });

    } else {

      sound.stop();

    }
  }

  render() {

    var playColor = this.state.audioReady ? '#FFFFFF' : '#EEEEEE';

    var playIcon = this.state.playing ? (
      <Icon name='stop' style={[styles.buttonIcon, {color: '#FFFFFF', fontSize: 24}]} />
    ) : (
      <Icon name='play' style={[styles.buttonIcon, {paddingLeft: 3.5, color: playColor}]} />
    )

    var playButton = this.state.audioReady ? (
      <TouchableHighlight
        style={styles.button}
        underlayColor='#028B99'
        onPress={this._playSound}>
        {playIcon}
      </TouchableHighlight>
    ) : (
      <View style={[styles.button, {backgroundColor: '#FFFFFF', borderWidth: 1}]}>
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
    flex: 1,
    height: 55,
    width: 55,
    marginTop: 10,
    backgroundColor: '#169FAD',
    borderColor: '#C8C7CC',
    borderWidth: 0,
    borderRadius: 27.5,
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 28,
    color: '#FFF',
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
  }
});

export default DialogueItem;
