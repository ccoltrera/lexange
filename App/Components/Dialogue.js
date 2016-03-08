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
      name: 'Finished Scenario',
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
    var dialogue = [];
    for (let i=0; i < this.template.dialogue.length; i++) {
      dialogue.push(
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
        {dialogue}
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
  row: {
    flexDirection: 'row'
  },
  labelText: {
    fontFamily: 'helvetica',
    fontWeight: '100',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 16,
  },
  backBox: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 26,
    paddingRight: 26,
    borderWidth: 1,
    borderColor: '#C8C7CC'
  },
  textInput: {
    flex: 5,
    height: 30,
    paddingLeft: 10,
    marginTop: 5,
    marginRight: 10,
    marginBottom: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#C8C7CC',
    borderRadius: 8,
    color: '#000000'
  },
  recordButton: {
    flex: 1
  }
});

export default Main;
