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

import SmartScrollView from 'react-native-smart-scroll-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Dialogue extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();
    this.state = {
      continue: false,
      showRecordingPanel: false,
      recordingNum: null,
    }

    this._next = this._next.bind(this);
    this._toggleRecordingPanel = this._toggleRecordingPanel.bind(this);
    this._completenessCheck = this._completenessCheck.bind(this);

    this.teacherLang = decodeURIComponent(this.template.languages.teacher);
    this.studentLang = decodeURIComponent(this.template.languages.student);
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

  _toggleRecordingPanel(num) {
    this.setState({
      recordingNum: num,
      showRecordingPanel: !this.state.showRecordingPanel,
    });

    this._completenessCheck();
  }

  _completenessCheck() {

    this.template = this.props._readTemplate();

    for (let i = 0; i < this.template.dialogue.length; i++) {
      if (!this.template.dialogue[i].phrase) {
        var nextUp = 'phrase' + i;
        this.setState({
          nextUp: nextUp,
          continue: false
        });
        return;
      }
      if (!this.template.dialogue[i].audioUri) {
        var nextUp = 'audioUri' + i;
        this.setState({
          nextUp: nextUp,
          continue: false
        });
        return;
      }
      if (!this.template.dialogue[i].phraseTrans) {
        var nextUp = 'phraseTrans' + i;
        this.setState({
          nextUp: nextUp,
          continue: false
        });
        return;
      }
    }

    this.setState({
      nextUp: '',
      continue: true
    });
  }

  componentDidMount() {
    this._completenessCheck();
  }

  render() {
    var {height, width} = Dimensions.get('window');
    var height = height - 64;

    var dialogueForms = [];
    for (let i=0; i < this.template.dialogue.length; i++) {
      dialogueForms.push(
        <DialogueForm
          key={'dialogue' + i}
          num={i}
          nextUp={this.state.nextUp}
          _updateTemplate={this.props._updateTemplate}
          _readTemplate={this.props._readTemplate}
          _completenessCheck={this._completenessCheck}
          _toggleRecordingPanel={this._toggleRecordingPanel}
        />
      )
    }

    var tutorialText = (
      <View>
        {
          this.props.showTutorial ? (
            <Text style={styles.tutorialText}>
              Now give your character something to say! {'\n\n'}
              Most lesson templates have dialogues, but let's just have one phrase for your first lesson. {'\n'}
            </Text>
          ) : (
            null
          )
        }
        <Text style={styles.tutorialText}>
          Complete dialogues with:
        </Text>
        <Text style={[styles.tutorialText, {marginLeft: 10}]}>
          - written sentences in {this.teacherLang}
        </Text>
        <Text style={[styles.tutorialText, {marginLeft: 10}]}>
          - audio in {this.teacherLang} (tap the photo)
        </Text>
        <Text style={[styles.tutorialText, {marginLeft: 10}]}>
          - natural translations in {this.studentLang}
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
              _completenessCheck={this._completenessCheck}
              _readTemplate={this.props._readTemplate}
              _updateTemplate={this.props._updateTemplate}
              _toggleRecordingPanel={this._toggleRecordingPanel} />
        </Modal>
        <View style={{height: height}}>
          <SmartScrollView
            style={styles.scrollView}>
            {dialogueForms}
            <View style={styles.padder}></View>
          </SmartScrollView>
        </View>
        <Tutorial
          tutorialText={tutorialText}
          showTutorial={this.props.showTutorial} />
        <ContinueButton
          enabled={
            this.state.continue
            // true
          }
          label='Finished'
          _next={this._next}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C6DCDF',
  },
  scrollView: {
    paddingTop: 5,
    // marginBottom: 70,
  },
  padder: {
    height: 120
  },
  headerShadow: {
    backgroundColor: '#169FAD',
    marginLeft: -2,
    marginRight: -2,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  tutorialText: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '300',
    color: '#414141',
    fontFamily: 'System',
    backgroundColor: 'transparent'
  },
});

export default Dialogue;
