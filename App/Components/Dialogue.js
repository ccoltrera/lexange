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
    this._handleSubmit = this._handleSubmit.bind(this);
    this._setRecordingLength = this._setRecordingLength.bind(this);
  }

  _handleChange(event) {
    this.setState({
      greeting: event.nativeEvent.text
    });
  }

  _handleSubmit() {
    this.props.navigator.push({
      title: 'Finished Lesson',
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
    var continueButton = (this.state.greeting && this.state.recordingLength) ? (
      <TouchableHighlight
        style={styles.button}
        onPress={this._handleSubmit}
        underlayColor='white'
        >
        <Text style={styles.buttonText}>Finish <Icon name='caret-right' /></Text>
      </TouchableHighlight>
    ) : (
      <TouchableHighlight
        style={styles.unbutton}
        underlayColor='white'
        >
        <Text style={styles.unbuttonText}>Finish <Icon name='caret-right' /></Text>
      </TouchableHighlight>
    )

    return (
      <View style={styles.container}>
        <Text style={styles.characterName}>{this.template.characters[0].name}:</Text>
        <View style={styles.row}>
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
            />
        </View>
        {continueButton}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 65,
    flexDirection: 'column',
    backgroundColor: '#169FAD'
  },
  row: {
    flexDirection: 'row'
  },
  characterName: {
    marginBottom: 5,
    fontSize: 16
  },
  textInput: {
    flex: 5,
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    color: '#FFFFFF'
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
  }
});

export default Main;
