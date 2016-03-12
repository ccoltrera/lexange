'use strict';
import React, {
  StyleSheet,
  Text,
  View,
  Component,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Dimensions
} from 'react-native';

import {AudioRecorder} from 'react-native-audio';

import Tutorial from './Tutorial';
import DialogueForm from './DialogueForm';
import ContinueButton from './ContinueButton';
import Finished from './Finished';

class Dialogue extends Component {
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

    var tutorialText = (
      <View>
        <Text style={styles.tutorialText}>
          Now give your character something to say.
        </Text>
        <Text style={styles.tutorialText}>
          Most lessons will have more characters and dialogue, but for now just one phrase.
        </Text>
        <Text style={styles.tutorialText}></Text>
        <Text style={styles.tutorialText}>
          Make dialogues more useful by adding text AND audio.
        </Text>
      </View>
    )

    return (
      <View style={styles.container}>
        <View style={{height: Dimensions.get('window').height - 134}}>
          <ScrollView
            style={styles.scrollView}
            showVerticalScrollIndicator={true}>
            {dialogueForms}
            <View style={styles.padder}></View>
          </ScrollView>
        </View>
        <Tutorial
          tutorialText={tutorialText}
          showTutorial={this.props.showTutorial} />
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
    backgroundColor: '#FDFDF1'
  },
  scrollView: {
    paddingTop: 15,
    paddingBottom: 40
  },
  padder: {
    height: 50
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
  tutorialText: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '300'
  },
});

export default Dialogue;
