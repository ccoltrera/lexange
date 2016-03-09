'use strict';
import React, {
  Component,
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';

import _handleChange from '../Utils/templateUtils';
import RecordButton from './RecordButton';

class DialogueForm extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();

    this.state = {
      diaTrans: this.template.dialogue[this.props.num].diaTrans,
      audioUri: this.template.dialogue[this.props.num].audioUri
    };

    this._handleChangeTrans = _handleChange.bind(
      this,
      'diaTrans',
      ['dialogue', this.props.num, 'diaTrans']
    );

    this.characterNum = this.template.dialogue[this.props.num].character;
    this.character = this.template.characters[this.characterNum];

  }

  render() {
    return(
      <View>
        <Text style={styles.labelText}>{this.character.name.toUpperCase()}:</Text>
        <View style={[/*styles.backBox,*/ styles.row]}>
        <View style={styles.bubble}>
            <TextInput
              autoCorrect={false}
              returnKeyType='done'
              style={styles.textInput}
              value={this.state.diaTrans}
              onChange={this._handleChangeTrans}
              placeholder={this.template.dialogue[this.props.num].guide}
              />
        </View>
            <RecordButton
              num={this.props.num}
              AudioRecorder={this.props.AudioRecorder}
              _setRecordingLength={this.props._setRecordingLength}
              recordingLength={this.props.recordingLength}
              style={styles.recordButton}
              />
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15
  },
  labelText: {
    fontFamily: 'helvetica',
    fontWeight: '100',
    fontSize: 14,
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 16,
  },
  // backBox: {
  //   backgroundColor: '#FFFFFF',
  //   justifyContent: 'center',
  //   paddingTop: 10,
  //   paddingBottom: 10,
  //   paddingLeft: 26,
  //   paddingRight: 26,
  //   borderWidth: 1,
  //   borderColor: '#C8C7CC'
  // },
  bubble: {
    marginTop: 0,
    backgroundColor: '#FFFFFF',
    flex: 6,
    height: 50,
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
    borderColor: '#C8C7CC',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10
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

export default DialogueForm;
