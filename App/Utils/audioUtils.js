'use strict';

import Sound from 'react-native-sound';
import {NativeModules} from 'react-native';

var {RNRecordAudio} = NativeModules;

var audioUtils = {
  _toggleRecording() {
    var _handleAddRecording = this._handleAddRecording;
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
          _handleAddRecording();
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
  },

  _startTimer() {
    this.timer = setTimeout(() => {
      this._time();
      this._startTimer();
    }, 80);
  },

  _stopTimer() {
    clearTimeout(this.timer);
  },

  _time() {
    if (this.state.tenthSec < 9) {
      this.setState({
        hundredthSec: 0,
        tenthSec: this.state.tenthSec + 1
      });
    } else if (this.state.sec < 9) {
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
  },

  _resetTimer() {
    this.setState({
      // playing: false,
      hundredthSec: 0,
      tenthSec: 0,
      sec: 0,
      tenSec: 0,
      min: 0,
      tenMin: 0
    });
  },

  _togglePlay(sound) {
    this._stopTimer();
    this._resetTimer();
    this.setState({playing : !this.state.playing});

    if (this.state.playing) {

      this._startTimer();

      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing');
          this._stopTimer();
          this._resetTimer();
          this.setState({playing : false});
        } else {
          console.log('playback failed due to audio decoding errors');
          this._stopTimer();
          this._resetTimer();
          this.setState({playing : false});
        }
      });

    } else {
      console.log('stop')
      sound.stop();

    }
  }
}

export default audioUtils;
