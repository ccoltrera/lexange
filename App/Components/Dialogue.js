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
      showThisTutorial: this.props.showTutorial,
      recordingLength: 0.0,
      greeting: ''
    }

    this._handleChange = this._handleChange.bind(this);
    this._setRecordingLength = this._setRecordingLength.bind(this);

    this._next = this._next.bind(this);
    this._toggleTutorial = this._toggleTutorial.bind(this);
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
        showTutorial: this.props.showTutorial,
        _readTemplate: this.props._readTemplate,
        _updateTemplate: this.props._updateTemplate,
        AudioRecorder: AudioRecorder,
        recorded: false,
        recordingLength: this.state.recordingLength,
      },
      headerStyle: styles.headerShadow
    });
  }

  _setRecordingLength(length) {
    this.setState({
      recordingLength: length
    });
  }

  _toggleTutorial() {
    this.setState({
      showThisTutorial: !this.state.showThisTutorial
    })
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

    var tutorial = this.state.showThisTutorial ? (
      <View style={styles.tutorialBox}>
        <TouchableHighlight
          style={[styles.closeTutButton, {marginBottom: 5}]}
          onPress={this._toggleTutorial}
          underlayColor='#FFFFFF'
          >
          <View style={{flexDirection: 'row'}}>
            <Text>HIDE TIPS </Text>
            <Icon name='times-circle-o' style={styles.closeTutIcon} />
          </View>
        </TouchableHighlight>
        <Text style={styles.tutorialText}>
          Just a one phrase 'dialogue' this time.
        </Text>
        <Text style={styles.tutorialText}>
          Make dialogues more useful by adding text AND audio.
        </Text>
      </View>
    ) : (
      <View style={styles.tutorialBox}>
        <TouchableHighlight
          style={[styles.closeTutButton, {marginBottom: -5}]}
          onPress={this._toggleTutorial}
          underlayColor='#FFFFFF'
          >
          <View style={{flexDirection: 'row'}}>
            <Text>SHOW TIPS </Text>
            <Icon name='times-circle-o' style={styles.closeTutIcon} />
          </View>
        </TouchableHighlight>
      </View>
    )

    return (
      <View style={styles.container}>
        {tutorial}
        {dialogueForms}
        <ContinueButton
          enabled={
            // this.state.recordingLength
            true
          }
          label='Done'
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
  headerShadow: {
    backgroundColor: '#169FAD',
    marginLeft: -2,
    marginRight: -2,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  tutorialBox: {
    marginLeft: -1,
    marginRight: -1,
    padding: 15,
    paddingBottom: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C8C7CC'
  },
  tutorialText: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '300'
  },
  closeTutButton: {
    alignSelf: 'flex-end',
    borderRadius: 15,
    marginTop: -10,
    marginRight: -3
  },
  closeTutIcon: {
    fontSize: 16,
    borderRadius: 8,
  },
  closeTutText: {
    fontWeight: '400'
  }
});

export default Main;
