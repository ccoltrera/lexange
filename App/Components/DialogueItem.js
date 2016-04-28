'use strict';
import React, {
  Component,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
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

    this.template = this.props.template;

    this.dialogue = this.template.dialogue[this.props.num];
    this.person = this.template.people[this.dialogue.person];

    this._toggleShow = this._toggleShow.bind(this);

    this._togglePlay = audioUtils._togglePlay.bind(this);
    this._time = audioUtils._time.bind(this);
    this._startTimer = audioUtils._startTimer.bind(this);
    this._stopTimer = audioUtils._stopTimer.bind(this);
    this._resetTimer = audioUtils._resetTimer.bind(this);

    if (this.dialogue.audioUri) {
      // If audio is template audio, find it in the main bundle
      var location = (this.dialogue.audioUri.substring(0,8) === 'tutorial') ? (Sound.MAIN_BUNDLE) : (Sound.DOCUMENT)

      this.audioObject = new Sound(this.dialogue.audioUri, location, (error) => {
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

    this.phrase = decodeURIComponent(this.dialogue.phrase);
    this.phraseTrans = decodeURIComponent(this.dialogue.phraseTrans);
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
      <Icon name='play' style={[styles.buttonIcon, {paddingLeft: 2, color: playColor}]} />
    )

    var playButton = this.state.audioReady ? (
      <TouchableOpacity
        onPress={this._togglePlaySound}
        style={styles.touchableWrap}>
        <View style={styles.button}>
          {playIcon}
        </View>
      </TouchableOpacity>
    ) : (
      <View style={[styles.button, {backgroundColor: 'rgba(151,151,151,0.8)'}]}>
        {playIcon}
      </View>
    )

    var imageHolderColor = this.state.audioReady ? (
      {borderColor: 'rgba(22,159,173,0.8)'}
    ) : (
      {borderColor: 'rgba(151,151,151,0.8)'}
    )

    var text = this.state.show ? (
        <Text style={[styles.bubbleText, {color: '#858E99'}]}>
          { this.phraseTrans }
        </Text>
      ) : (
        <Text style={[styles.bubbleText, {color: '#FFFFFF'}]}>
          { this.phrase }
        </Text>
      )

    var bubbleSpecifics = this.state.show ? (
      {backgroundColor: '#FFFFFF' }
    ) : (
      {backgroundColor: 'rgba(22,159,173,1)',
        borderWidth: 0 }
    )

    var triangleInsideColor = this.state.show ? (
      {borderRightColor: '#FFFFFF' }
    ) : (
      {borderRightColor: 'rgba(22,159,173,1)', left: 4}
    )

    var triangleOutsideColor = this.state.show ? (
      null
    ) : (
      {borderRightColor: 'transparent' }
    )

    var blockTop = (this.props.num === 0) ? (
      null
    ) : (
      <View style={styles.blockTop}></View>
    )

    var blockTopBlender = (this.props.num === 0) ? (
      null
    ) : (
      <View style={styles.blockTopBlender}></View>
    )

    var blockTopDiffuser = (this.props.num === 0) ? (
      null
    ) : (
      <View style={styles.blockTopDiffuser}></View>
    )

    var numDialogues = this.template.dialogue.length;

    var blockBottom = (numDialogues >= 1 && numDialogues - 1 === this.props.num) ? (
      null
    ) : (
      <View style={styles.blockBottom}></View>
    )

    var blockBottomBlender = (numDialogues >= 1 && numDialogues - 1 === this.props.num) ? (
      null
    ) : (
      <View style={styles.blockBottomBlender}></View>
    )

    var spacingAdjust = {};

    if ( !(numDialogues >= 1 && numDialogues - 1 === this.props.num) ) {
      spacingAdjust.paddingBottom = 5;
    }

    if ( !(this.props.num === 0) ) {
      spacingAdjust.paddingTop = 10
    }


    // Checks for values seen in the example lesson
    var image;
    if (this.person.pictureUri === 'Camila.png') {
      image = require('../../Images/Camila.png');
    }
    else if (this.person.pictureUri === 'Lucas.jpg') {
      image = require('../../Images/Lucas.jpg');
    }
    else {
      image = {uri: this.person.pictureUri};
    }

    return (
      <View style={[styles.card, spacingAdjust]}>
        {blockTop}
        {blockTopBlender}
        {blockBottom}
        {blockBottomBlender}
        {blockTopDiffuser}
          <View style={{flexDirection: 'row'}}>
            <TouchableWithoutFeedback
              onPress={this._togglePlaySound}>
              <View style={[styles.imageHolder, imageHolderColor]}>
                <Image style={styles.image} source={image} />
                {playButton}
              </View>
            </TouchableWithoutFeedback>
            <View style={{flexDirection: 'column', flex: 1}}>
              <TouchableWithoutFeedback
                onPress={this._toggleShow}
                underlayColor='#FFFFFF'
                >
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
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
    )
  }

}

const styles = StyleSheet.create({
  touchableSection: {
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 20
  },
  card: {
    // marginTop: 1,
    // marginBottom: 1,
    marginLeft: 15,
    marginRight: 15,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    },
    justifyContent: 'center'
  },
  blockBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    },
  },
  blockBottomBlender: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: '#FFFFFF',
  },
  blockTopDiffuser: {
    position: 'absolute',
    top: -5,
    left: 0.1,
    right: 0.1,
    height: 5,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  blockTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    },
  },
  blockTopBlender: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 25,
    backgroundColor: '#FFFFFF',
  },
  imageHolder: {
    justifyContent: 'center',
    height: 100,
    width: 100,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    // borderColor: 'rgba(22,159,173,0.8)',
    // backgroundColor: 'rgba(22,159,173,1)',
  },
  image: {
    position: 'absolute',
    top: -1,
    left: -1,
    // borderRadius: 15,
    height: 98,
    width: 98,
  },
  touchableWrap: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1
  },
  button: {
    position: 'absolute',
    right: 7,
    left: 52,
    bottom: 7,
    top: 52,
    // left: 0,
    // alignSelf: 'center',
    // height: 30,
    // width: 120,
    // backgroundColor: 'rgba(240,183,103,1)',
    backgroundColor: 'rgba(22,159,173,0.8)',
    borderRadius: 11,
    justifyContent: 'center',
    // borderWidth: 2,
    borderColor: '#FFFFFF'
    // borderColor: 'rgba(22,159,173,0.6)',
    // backgroundColor: 'rgba(255,255,255,1)'
  },
  buttonIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    // marginRight: 5,
    // marginBottom: 5,
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
