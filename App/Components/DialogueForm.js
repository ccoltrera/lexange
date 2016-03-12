'use strict';
import React, {
  Component,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image
} from 'react-native';

import _handleChange from '../Utils/templateUtils';
import RecordButton from './RecordButton';

class DialogueForm extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();

    this.state = {
      phrase: this.template.dialogue[this.props.num].phrase,
      phraseTrans: this.template.dialogue[this.props.num].phraseTrans,
      audioUri: this.template.dialogue[this.props.num].audioUri
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

    this.personNum = this.template.dialogue[this.props.num].person;
    this.person = this.template.people[this.personNum];

  }

  render() {
    return(
      <View style={styles.card}>
        <Text style={styles.labelText}>{this.person.name}:</Text>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.imageHolder} source={{uri: this.person.pictureUri}} />
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text style={styles.textInputLabel}>
              '{this.template.dialogue[this.props.num].guide}' in {this.template.languages.teacher}:
            </Text>
            <TextInput
              autoCorrect={false}
              returnKeyType='done'
              style={styles.textInput}
              value={this.state.phrase}
              onChange={this._handleChangePhrase}
              placeholder={'\'' + this.template.dialogue[this.props.num].guide + '\' in ' + this.template.languages.teacher}
              />
            <RecordButton
              num={this.props.num}
              AudioRecorder={this.props.AudioRecorder}
              _setRecordingLength={this.props._setRecordingLength}
              recordingLength={this.props.recordingLength}
              />
            <Text style={styles.textInputLabel}>
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
  },
  imageHolder: {
    justifyContent: 'center',
    height: 80,
    width: 80,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C8C7CC',
    borderRadius: 10
  },
  bubble: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#C8C7CC',
    padding: 10
  },
  textInput: {
    flex: 1,
    height: 40,
    marginBottom: 5,
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
    fontSize: 14,
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
});

export default DialogueForm;
