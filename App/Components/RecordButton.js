/**
 * Audio Recorder Sample App
 * https://github.com/jsierles/react-native-audiorecorder
 */
'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Component
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class RecordButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      stoppedPlaying: false,
      playing: false,
      finished: false,
      recorded: false
    }

    this._handleRecordPress = this._handleRecordPress.bind(this);
    this._handlePlayPress = this._handlePlayPress.bind(this);

    this._play = this._play.bind(this);
    this._stop = this._stop.bind(this);
    this._record = this._record.bind(this);

  }

  componentDidMount() {
    this.props.AudioRecorder.prepareRecordingAtPath('/dialogue' + this.props.num + '.caf')
    this.props.AudioRecorder.onProgress = (data) => {
      this.setState({currentTime: Math.floor(data.currentTime)});
      if (data.currentTime > 0) {
        this.props._setRecordingLength( this.state.currentTime );
      }
      if (this.state.currentTime >= this.props.recordingLength) {
        this.setState({playing: false});
      }

    };

    this.props.AudioRecorder.onFinished = (data) => {
      console.log(`Finished recording: ${data.finished}`)
    };

  }

  _stop() {
    if (this.state.recording) {
      this.props.AudioRecorder.stopRecording();
      this.setState({stoppedRecording: true, recording: false, recorded: true});
    } else if (this.state.playing) {
      this.props.AudioRecorder.stopPlaying();
      this.setState({playing: false, stoppedPlaying: true});
    }
  }

  _record() {
    this.props.AudioRecorder.startRecording();
    this.setState({recording: true, playing: false});
  }

 _play() {
    if (this.state.recording) {
      this._stop();
      this.setState({recording: false});
    }
    this.props.AudioRecorder.playRecording();
    this.setState({playing: true});

  }

  _handleRecordPress() {
    if (!this.state.recording) {
      this._record();
    } else {
      this._stop();
    }
  }

  _handlePlayPress() {
    if (!this.state.playing) {
      this._play();
    } else {
      this._stop();
    }
  }

  render() {
    var recordButton = !this.state.recording ? (
      <Icon name='circle' style={[styles.buttonText, {color: 'red'}]} />
    ) : (
      <Icon name='stop' style={styles.buttonText} />
    )

    var playIcon = this.state.playing ? (
      <Icon name='stop' style={styles.buttonText} />
    ) : (
      <Icon name='play' style={[styles.buttonText, {paddingLeft: 3}]} />
    );

    var playButton = this.state.recorded ? (
      <TouchableHighlight
        style={styles.button}
        onPress={this._play}
        underlayColor='#EEEEEE'
        >
        {playIcon}
      </TouchableHighlight>
    ) : (
      <View
        style={styles.button}
        underlayColor='#EEEEEE'
        >
        {playIcon}
      </View>
    )

    return (
      <View style={styles.buttonGroup}>
        <TouchableHighlight
          style={styles.button}
          onPress={this._handleRecordPress}
          underlayColor='#EEEEEE'
          >
          {recordButton}
        </TouchableHighlight>
        {playButton}
        <TouchableHighlight
          style={styles.button}
          onPress={()=> {
              this._stop();
              this.props._toggleRecordPanel();
            }
          }
          underlayColor='#EEEEEE'
          >
          <Icon name='check' style={[styles.buttonText, {color: 'green'}]} />
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  button: {
    height: 55,
    width: 55,
    margin: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#C8C7CC',
    borderWidth: 2,
    borderRadius: 27.5,
    justifyContent: 'center'
  },
  buttonGroup: {
    // marginBottom: 10,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 28,
    color: '#858E99',
    alignSelf: 'center'
  }
});


export default RecordButton;
