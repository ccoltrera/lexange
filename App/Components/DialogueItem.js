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

    // var cardMarginTop = (this.props.num === 0) ? (
    //   {marginTop: 0}
    // ) : (
    //   {marginTop: 0}
    // )

    // var cardMarginBottom =  (numDialogues >= 1 && numDialogues - 1 === this.props.num) ? (
    //   null
    // ) : (
    //   {marginBottom: 0}
    // )

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


    return (
      <TouchableWithoutFeedback

        onPress={this._toggleShow}
        underlayColor='#FFFFFF'
        >
      <View style={styles.card}>
        {blockTop}
        {blockTopBlender}
        {blockBottom}
        {blockBottomBlender}
        {blockTopDiffuser}
          <View style={{flexDirection: 'row'}}>
            <TouchableWithoutFeedback
              onPress={this._togglePlaySound}>
              <View style={styles.imageHolder}>
                <Image style={styles.image} source={{uri: this.person.pictureUri}} />
                {playButton}
              </View>
            </TouchableWithoutFeedback>
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
        </View>
      </TouchableWithoutFeedback>
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
    shadowOpacity: 0.5,
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
    shadowOpacity: 0.5,
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
    shadowOpacity: 0.5,
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
    height: 80,
    width: 80,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#979797',
    backgroundColor: '#FFFFFF'
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
    backgroundColor: 'rgba(22,159,173,0.8)',
    borderRadius: 60,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF'
    // borderColor: 'rgba(22,159,173,0.6)',
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
