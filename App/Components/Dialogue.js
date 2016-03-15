'use strict';
import React, {
  StyleSheet,
  Text,
  View,
  Component,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  Modal
} from 'react-native';

import {AudioRecorder} from 'react-native-audio';

import Tutorial from './Tutorial';
import RecordingPanel from './RecordingPanel';
import DialogueForm from './DialogueForm';
import ContinueButton from './ContinueButton';
import Finished from './Finished';

class Dialogue extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();
    this.state = {
      showThisTutorial: this.props.showTutorial,
      greeting: '',
      showRecordingPanel: false,
      recordingNum: null
    }

    this._next = this._next.bind(this);
    this._toggleTutorial = this._toggleTutorial.bind(this);
    this._toggleRecordingPanel = this._toggleRecordingPanel.bind(this);
  }

  _next() {
    this.props.toRoute({
      name: 'Finished Lesson',
      component: Finished,
      passProps: {
        showTutorial: this.props.showTutorial,
        _readTemplate: this.props._readTemplate,
        _updateTemplate: this.props._updateTemplate,
      },
      headerStyle: styles.headerShadow
    });
  }

  _toggleTutorial() {
    this.setState({
      showThisTutorial: !this.state.showThisTutorial
    })
  }

  _toggleRecordingPanel(num) {
    this.setState({
      recordingNum: num,
      showRecordingPanel: !this.state.showRecordingPanel
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
          _toggleRecordingPanel={this._toggleRecordingPanel}
        />
      )
    }

    var tutorialText = (
      <View>
        <Text style={styles.tutorialText}>
          Now give your character something to say!
        </Text>
        <Text style={styles.tutorialText}>
          Most lesson templates have dialogues, but let's just have one phrase for your first lesson.
        </Text>
        <Text style={styles.tutorialText}></Text>
        <Text style={styles.tutorialText}>
          Complete dialogues with:
        </Text>
        <Text style={[styles.tutorialText, {marginLeft: 10}]}>
          - written sentences in {this.template.languages.teacher}
        </Text>
        <Text style={[styles.tutorialText, {marginLeft: 10}]}>
          - audio in {this.template.languages.teacher}
        </Text>
        <Text style={[styles.tutorialText, {marginLeft: 10}]}>
          - natural translations in {this.template.languages.student}
        </Text>
      </View>
    )

    return (
      <View style={styles.container}>
        <Modal
            animated={true}
            transparent={true}
            visible={this.state.showRecordingPanel}>
            <RecordingPanel
              num={this.state.recordingNum}
              _readTemplate={this.props._readTemplate}
              _updateTemplate={this.props._updateTemplate}
              _toggleRecordingPanel={this._toggleRecordingPanel} />
        </Modal>
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
