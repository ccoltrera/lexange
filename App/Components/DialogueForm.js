'use strict';
import React, {
  Component,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableHighlight,
  LayoutAnimation
} from 'react-native';

import _handleChange from '../Utils/templateUtils';
import Icon from 'react-native-vector-icons/FontAwesome';
import RecordButton from './RecordButton';

class DialogueForm extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();

    this.state = {
      phrase: this.template.dialogue[this.props.num].phrase,
      phraseTrans: this.template.dialogue[this.props.num].phraseTrans,
      audioUri: this.template.dialogue[this.props.num].audioUri,
      showRecordPanel: false,
    };

    this._handleChangePhrase = _handleChange.bind(
      this,
      'phrase',
      ['dialogue', this.props.num, 'phrase']
    );

    this._handleChangePhraseTrans = _handleChange.bind(
      this,
      'phraseTrans',
      ['dialogue', this.props.num, 'phraseTrans']
    );

    this._toggleRecordPanel = this._toggleRecordPanel.bind(this);

    this.personNum = this.template.dialogue[this.props.num].person;
    this.person = this.template.people[this.personNum];

  }

  _toggleRecordPanel() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      showRecordPanel: !this.state.showRecordPanel
    });
  }

  render() {

    var recordPanel = this.state.showRecordPanel ? (
      <View style={styles.recordPanel}>
        <View style={{flexDirection: 'column'}}>
          <RecordButton
            num={this.props.num}
            AudioRecorder={this.props.AudioRecorder}
            _setRecordingLength={this.props._setRecordingLength}
            recordingLength={this.props.recordingLength}
            _toggleRecordPanel={this._toggleRecordPanel}
            />
          <View style={styles.timeWrapper}>
            <Text style={styles.recordTime}>{this.props.recordingLength}s</Text>
          </View>
        </View>
      </View>
    ) : (
      <View style={[styles.recordPanel, {left: null, paddingLeft: 0, paddingRight: 0}]}>
      </View>
    )

    return(
      <View style={styles.card}>
        <Text style={styles.labelText}>{this.person.name}:</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Image style={styles.imageHolder} source={{uri: this.person.pictureUri}} />
            <TouchableHighlight
              style={styles.button}
              onPress={this._toggleRecordPanel}
              underlayColor='#EEEEEE'
              >
              <Icon name='microphone' style={styles.buttonIcon} />
            </TouchableHighlight>
          </View>
          <View style={{flexDirection: 'column', flex: 1, marginLeft: 10}}>
            <Text style={styles.textInputLabel}>
              '{this.template.dialogue[this.props.num].guide}' in {this.template.languages.teacher}:
            </Text>
            <View style={styles.talkBubble}>
              <View style={styles.talkBubbleTriangle} />
              <TextInput
                  autoCorrect={false}
                  returnKeyType='done'
                  style={[styles.textInput, styles.talkBubbleSquare]}
                  value={this.state.phrase}
                  onChange={this._handleChangePhrase}
                  placeholder={'\'' + this.template.dialogue[this.props.num].guide + '\' in ' + this.template.languages.teacher}
                  />
              <View style={styles.talkBubbleTriangleInside} />
            </View>
            <Text style={[styles.textInputLabel, {marginBottom: 7}]}>
              Translation in {this.template.languages.student}:
            </Text>
            <TextInput
              autoCorrect={false}
              returnKeyType='done'
              style={styles.textInput}
              value={this.state.phraseTrans}
              onChange={this._handleChangePhraseTrans}
              placeholder={'Translation in ' + this.template.languages.student}
              />
          </View>
        </View>
        {recordPanel}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  labelText: {
    fontFamily: 'helvetica',
    fontWeight: '300',
    fontSize: 18,
    marginBottom: 5,
    // alignSelf: 'center'
  },
  imageHolder: {
    justifyContent: 'center',
    height: 80,
    width: 80,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C8C7CC',
    borderRadius: 10
  },
  textInput: {
    flex: 1,
    height: 40,
    marginBottom: 15,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#C8C7CC',
    borderRadius: 18,
    color: '#000000',
  },
  textInputLabel: {
    fontFamily: 'helvetica',
    fontWeight: '300',
    fontSize: 16,
    marginBottom: 3
  },
  card: {
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  button: {
    height: 55,
    width: 55,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#C8C7CC',
    borderWidth: 2,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonIcon: {
    fontSize: 28,
    color: '#858E99',
    alignSelf: 'center'
  },
  recordPanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    paddingTop: 20,
    paddingLeft: 18,
    borderRadius: 5,
    backgroundColor: '#FFFFFF'
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  timeWrapper: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center'
  },
  recordTime: {
    fontSize: 65,
    color: '#169FAD',
    fontWeight: '700',
    alignSelf: 'center'
  },
  talkBubbleSquare: {
  //   height: 40,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    // borderColor: '#000000',
  //   borderRadius: 18
  },
  talkBubbleTriangle: {
    position: 'absolute',
    left: -9,
    top: 7,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 13,
    borderRightWidth: 36,
    borderRightColor: '#C8C7CC',
    borderBottomWidth: 13,
    borderBottomColor: 'transparent'
  },
  talkBubbleTriangleInside: {
    position: 'absolute',
    left: -3.0,
    top: 16.75,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 3.25,
    borderRightWidth: 9,
    borderRightColor: '#FFFFFF',
    borderBottomWidth: 3.25,
    borderBottomColor: 'transparent'
  }
});

export default DialogueForm;
