'use strict';
import React, {
  StyleSheet,
  Text,
  View,
  Component,
  TextInput,
  TouchableHighlight
} from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';
import {AudioRecorder} from 'react-native-audio';

import DialogueForm from './DialogueForm';
import ContinueButton from './ContinueButton';
import Finished from './Finished';

class Main extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();
    this.state = {
      recordingLength: 0.0,
      greeting: ''
    }

    this._handleChange = this._handleChange.bind(this);
    this._setRecordingLength = this._setRecordingLength.bind(this);

    this._next = this._next.bind(this);
  }

  _handleChange(event) {
    this.setState({
      greeting: event.nativeEvent.text
    });
  }

  _next() {
    this.props.toRoute({
      name: 'Finished Lesson',
      component: Finished,
      passProps: {
        _readTemplate: this.props._readTemplate,
        _updateTemplate: this.props._updateTemplate,
        AudioRecorder: AudioRecorder,
        recorded: false,
        recordingLength: this.state.recordingLength,
      }
    });
  }

  _setRecordingLength(length) {
    this.setState({
      recordingLength: length
    });
  }

  render() {
    var dialogueForms = [];
    for (let i=0; i < this.template.dialogue.length; i++) {
      dialogueForms.push(
        <DialogueForm
          key={'dialogue' + i}
          num={i}
          _updateTemplate={this.props._updateTemplate}
          _readTemplate={this.props._readTemplate}
          AudioRecorder={AudioRecorder}
          _setRecordingLength={this._setRecordingLength}
          recordingLength={this.state.recordingLength}
        />
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.tutorialBox}>
          <Text style={styles.tutorialText}>
            Make dialogue more useful with audio
          </Text>
        </View>
        {dialogueForms}
        <ContinueButton
          enabled={
            // this.state.recordingLength
            true
          }
          label='Finish'
          _next={this._next}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    flexDirection: 'column',
    backgroundColor: '#FDFDF1'
  },
  tutorialBox: {
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C8C7CC'
  },
  tutorialText: {
    marginBottom: 3,
    fontSize: 16
  },
});

export default Main;
