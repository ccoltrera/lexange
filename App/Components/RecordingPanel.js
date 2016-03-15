'use strict';
import React, {
  Component,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  NativeModules
} from 'react-native';

var { RNRecordAudio } = NativeModules;
import Sound from 'react-native-sound';

import Icon from 'react-native-vector-icons/FontAwesome';
import _handleChange from '../Utils/templateUtils';

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

    this._toggleRecording = this._toggleRecording.bind(this);
    this._play = this._play.bind(this);
    this._time = this._time.bind(this);
    this._startTimer = this._startTimer.bind(this);
    this._stopTimer = this._stopTimer.bind(this);
    this._resetTimer = this._resetTimer.bind(this);

    this._handleAddRecording = _handleChange.bind(
      this,
      'audioUri',
      ['dialogue', this.props.num, 'audioUri'],
      this.audioName +'.m4a'
    );

    this.audioName = this.template.id + '-audio-' + this.props.num;


  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  _toggleRecording() {
    var _toggleRecording = this._handleAddRecording;
    var _startTimer = this._startTimer;

    if (this.state.recording) {

      this._stopTimer();

      RNRecordAudio.stopRecord(
        this.audioName +".m4a", // filename

        function errorCallback(results) {
          console.log('JS Error: ' + results['errMsg']);
        },

        function successCallback(results) {
          console.log('JS Success: ' + results['successMsg']);
          _toggleRecording();
        }
      );


    } else {
      this._resetTimer();

      // lock play button when recording
      this.setState({audioReady: false, audioUri: ''});

      RNRecordAudio.startRecord(
        this.audioName +".m4a", // filename

        function errorCallback(results) {
          console.log('JS Error: ' + results['errMsg']);
        },

        function successCallback(results) {
          _startTimer();
          console.log('JS Success: ' + results['successMsg']);
        }
      );

    }

    this.setState({recording: !this.state.recording});
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

    var recording = (this.state.audioUri && !this.state.audioReady) ?  (
      new Sound(this.audioName +'.m4a', Sound.DOCUMENT, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        } else { // loaded successfully
          console.log('duration in seconds: ' + recording.duration +
              'number of channels: ' + recording.numberOfChannels);

          this._playSound = this._play.bind(null, recording);
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
        <Text style={styles.timer}>{this.state.tenMin}{this.state.min}:{this.state.tenSec}{this.state.sec}</Text>
        <View style={styles.buttonGroup}>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#EEEEEE'
            onPress={this._toggleRecording}>
            {recordIcon}
          </TouchableHighlight>
          {playButton}
          <TouchableHighlight
            style={[styles.button, {width: null, paddingLeft: 15, paddingRight: 15}]}
            underlayColor='#EEEEEE'
            onPress={this.props._toggleRecordingPanel}>
            <Text style={styles.buttonText}>DONE</Text>
          </TouchableHighlight>
        </View>
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
  }
});

export default RecordingPanel;
