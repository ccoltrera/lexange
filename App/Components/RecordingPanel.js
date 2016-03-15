'use strict';
import React, {
  Component,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  NativeModules,
} from 'react-native';

var { RNRecordAudio } = NativeModules;

import Sound from 'react-native-sound';

import Icon from 'react-native-vector-icons/FontAwesome';
import _handleChange from '../Utils/templateUtils';

import audioUtils from '../Utils/audioUtils';

class RecordingPanel extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();

    this.state = {
      audioUri: this.template.dialogue[this.props.num].audioUri,
      recording: false,
      audioReady: false,
      playing: false,
      // hundredthSec: 0,
      tenthSec: 0,
      sec: 0,
      tenSec: 0,
      min: 0,
      tenMin: 0
    };

    this._toggleRecording = audioUtils._toggleRecording.bind(this);
    this._togglePlay = audioUtils._togglePlay.bind(this);
    this._time = audioUtils._time.bind(this);
    this._startTimer = audioUtils._startTimer.bind(this);
    this._stopTimer = audioUtils._stopTimer.bind(this);
    this._resetTimer = audioUtils._resetTimer.bind(this);
    this._done = this._done.bind(this);

    this.audioName = this.template.id + '-audio-' + this.props.num;

    this._handleAddRecording = _handleChange.bind(
      this,
      'audioUri',
      ['dialogue', this.props.num, 'audioUri'],
      this.audioName +'.m4a'
    );

  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  _done(audioObject) {
    if (this.state.recording) {
      var _handleAddRecording = this._handleAddRecording.bind(null, true);

      RNRecordAudio.stopRecord(
        this.audioName +".m4a", // filename

        function errorCallback(results) {
          console.log('JS Error: ' + results['errMsg']);
        },

        function successCallback(results) {
          console.log('JS Success: ' + results['successMsg']);
          _handleAddRecording();
        }
      );
    }
    if (this.state.playing) {
      // console.log(audioObject);
      audioObject.stop();
    }

    this.props._toggleRecordingPanel()
  }

  render() {

    this.audioObject = (this.state.audioUri && !this.state.audioReady) ?  (
      new Sound(this.audioName +'.m4a', Sound.DOCUMENT, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        } else { // loaded successfully
          console.log('duration in seconds: ' + this.audioObject.getDuration() +
            ' number of channels: ' + this.audioObject.getNumberOfChannels());

          // console.log(Sound.DOCUMENT)

          this._playSound = this._togglePlay.bind(null, this.audioObject);
          this._done = this._done.bind(null, this.audioObject);
          this.setState({audioReady: true});
        }
      })
    ) : ( null )


    var recordIcon = this.state.recording ? (
      <Icon name='stop' style={[styles.buttonIcon, {color: 'black', fontSize: 24}]} />
    ) : (
      <Icon name='circle' style={[styles.buttonIcon, {color: 'red'}]} />
    )

    var playColor = this.state.audioReady ? '#000000' : '#EEEEEE';

    var playIcon = this.state.playing ? (
      <Icon name='stop' style={[styles.buttonIcon, {color: '#000000', fontSize: 24}]} />
    ) : (
      <Icon name='play' style={[styles.buttonIcon, {paddingLeft: 3.5, color: playColor}]} />
    )

    var playButton = this.state.audioReady ? (
      <TouchableHighlight
        style={styles.button}
        underlayColor='#EEEEEE'
        onPress={this._playSound}>
        {playIcon}
      </TouchableHighlight>
    ) : (
      <View style={styles.button}>
        {playIcon}
      </View>
    )

    return(
      <View style={styles.container}>
        <Text style={styles.timer}>{this.state.tenMin}{this.state.min}:{this.state.tenSec}{this.state.sec}.{this.state.tenthSec}</Text>
        <View style={styles.buttonGroup}>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#EEEEEE'
            onPress={this._toggleRecording}>
            {recordIcon}
          </TouchableHighlight>
          {playButton}
        </View>
          <TouchableHighlight
            style={[styles.bottomButton, {width: null, paddingLeft: 15, paddingRight: 15}]}
            underlayColor='#EEEEEE'
            onPress={this._done}>
            <View style={styles.touchWrapper}>
              <Text style={styles.bottomButtonText}>Done </Text>
              <View style={{marginLeft: 5, marginTop: 2}}>
                <Icon name='chevron-down' style={styles.chevron} />
              </View>
            </View>
          </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#169FAD',
    justifyContent: 'center',
  },
  timer: {
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 60,
    fontFamily: 'Droid Sans Mono',
    color: '#FFFFFF'
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    margin: 5,
    height: 55,
    width: 55,
    backgroundColor: '#FFFFFF',
    borderColor: '#C8C7CC',
    borderWidth: 0,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonIcon: {
    fontSize: 28,
    color: '#FFFFFF',
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'System',
    backgroundColor: 'transparent'
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    // borderWidth: 1,
    // borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  bottomButtonText: {
    fontSize: 20,
    color: '#169FAD',
    fontFamily: 'System',
    fontWeight: '700',
    alignSelf: 'center'
  },
  touchWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  chevron: {
    fontSize: 20,
    color: '#169FAD'
  }
});

export default RecordingPanel;
