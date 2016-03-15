'use strict';
import React, {
  Component,
  View,
  TouchableHighlight,
  StyleSheet,
  NativeModules
} from 'react-native';

var { RNRecordAudio } = NativeModules;

import Icon from 'react-native-vector-icons/FontAwesome';
import _handleChange from '../Utils/templateUtils';

import Sound from 'react-native-sound';

class RecordingPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      audioUri: '',
      recording: false,
      audioReady: false,
      playing: false,
    };

    this._toggleRecording = this._toggleRecording.bind(this);
    this._play = this._play.bind(this);

    this._handleAddRecording = _handleChange.bind(
      this,
      'audioUri',
      ['dialogue', this.props.num, 'audioUri'],
      'test.m4a'
    );
  }

  _toggleRecording() {
    var _toggleRecording = this._handleAddRecording;

    if (this.state.recording) {

      RNRecordAudio.stopRecord(
        "test.m4a", // filename

        function errorCallback(results) {
            console.log('JS Error: ' + results['errMsg']);
        },

        function successCallback(results) {
            console.log('JS Success: ' + results['successMsg']);
            _toggleRecording();
        }
      );


    } else {
      // lock play button when recording
      this.setState({audioReady: false, audioUri: ''});

      RNRecordAudio.startRecord(
        "test.m4a", // filename

        function errorCallback(results) {
            console.log('JS Error: ' + results['errMsg']);
        },

        function successCallback(results) {
            console.log('JS Success: ' + results['successMsg']);
        }
      );

    }

    this.setState({recording: !this.state.recording});
  }

  _play(sound) {
    console.log(sound.getDuration())

    this.setState({playing : !this.state.playing});

    this.state.playing ? (
      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing');
          this.setState({playing : false});
        } else {
          console.log('playback failed due to audio decoding errors');
          this.setState({playing : false});
        }
      })
    ) : (
      sound.stop()
    )
  }

  render() {

    var recording = (this.state.audioUri && !this.state.audioReady) ?  (
      new Sound('test.m4a', Sound.DOCUMENT, (error) => {
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
      <TouchableHighlight
        style={styles.button}
        underlayColor='#EEEEEE'
        onPress={this._toggleRecording}>
        {recordIcon}
      </TouchableHighlight>
      {playButton}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#169FAD',
    justifyContent: 'center'
  },
  button: {
    height: 55,
    width: 55,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#C8C7CC',
    borderWidth: 0,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonIcon: {
    fontSize: 28,
    color: '#FFF',
    alignSelf: 'center'
  },
});

export default RecordingPanel;
