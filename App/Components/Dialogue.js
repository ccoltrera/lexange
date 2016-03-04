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

import ContinueButton from './ContinueButton';
import RecordButton from './RecordButton';
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
        greeting: this.state.greeting,
        AudioRecorder: AudioRecorder,
        recorded: true,
        recordingLength: this.state.recordingLength,
        characterName: this.template.characters[0].name,
        descTrans: this.template.characters[0].descTrans,
        pictureURI: this.template.characters[0].pictureUri
      }
    });
  }

  _setRecordingLength(length) {
    this.setState({recordingLength: length});
  }

  render() {

    return (
      <View style={styles.container}>
          <Text style={styles.labelText}>{this.template.characters[0].name}:</Text>
        <View style={[styles.backBox, styles.row]}>

            <TextInput
              style={styles.textInput}
              value={this.state.greeting}
              onChange={this._handleChange}
              placeholder='Morning greeting'
              />
            <RecordButton
              AudioRecorder={AudioRecorder}
              _setRecordingLength={this._setRecordingLength}
              recordingLength={this.state.recordingLength}
              style={styles.recordButton}
              />

        </View>
          <ContinueButton
            enabled={ /*this.state.greeting && this.state.recordingLength*/ true }
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
    flexDirection: 'column',
    backgroundColor: '#FDFDF1'
  },
  row: {
    flexDirection: 'row'
  },
  labelText: {
    fontFamily: 'helvetica',
    fontWeight: '100',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
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
    borderColor: '#000000',
    borderRadius: 8,
    color: '#000000'
  },
  button: {
    marginTop: 10,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#111111',
    alignSelf: 'center'
  },
  unbutton: {
    marginTop: 10,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  unbuttonText: {
    fontSize: 18,
    color: 'rgba(10,10,10,0.2)',
    alignSelf: 'center'
  },
  recordButton: {
    flex: 1
  }
});

export default Main;
