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

    this.personNum = this.template.dialogue[this.props.num].person;
    this.person = this.template.people[this.personNum];

    this._toggleRecordingPanel = this.props._toggleRecordingPanel.bind(null, this.props.num);

  }

  render() {

    return(
      <View style={styles.card}>
        <Text style={styles.labelText}>{this.person.name}:</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Image style={styles.imageHolder} source={{uri: this.person.pictureUri}} />
            <TouchableHighlight
              style={styles.button}
              onPress={this._toggleRecordingPanel}
              // underlayColor='#028B99'
              underlayColor='#EEEEEE'
              >
              <Icon name='microphone' style={styles.buttonIcon} />
            </TouchableHighlight>
          </View>
          <View style={{flexDirection: 'column', flex: 1, marginLeft: 10}}>
            <Text style={styles.textInputLabel}>
              {this.template.dialogue[this.props.num].guide} ( in {this.template.languages.teacher} ):
            </Text>
            <View style={styles.talkBubble}>
              <View style={styles.talkBubbleTriangle} />
              <TextInput
                  autoCorrect={false}
                  returnKeyType='done'
                  style={[styles.textInput, styles.talkBubbleSquare]}
                  value={this.state.phrase}
                  onChange={this._handleChangePhrase}
                  placeholder={'' + this.template.dialogue[this.props.num].guide + ' ( in ' + this.template.languages.teacher + ' )'}
                  />
              <View style={styles.talkBubbleTriangleInside} />
            </View>
            <Text style={[styles.textInputLabel, {marginBottom: 7}]}>
              Translation ( in {this.template.languages.student} ):
            </Text>
            <TextInput
              autoCorrect={false}
              returnKeyType='done'
              style={styles.textInput}
              value={this.state.phraseTrans}
              onChange={this._handleChangePhraseTrans}
              placeholder={'Translation ( in ' + this.template.languages.student + ' )'}
              />
          </View>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  labelText: {
    fontFamily: 'System',
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
    fontFamily: 'System',
    color: '#000000',
  },
  textInputLabel: {
    fontFamily: 'System',
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
    // backgroundColor: '#169FAD',
    backgroundColor: '#FFFFFF',
    borderColor: '#C8C7CC',
    borderWidth: 2,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonIcon: {
    fontSize: 28,
    // color: '#FFF',
    color: '#169FAD',
    alignSelf: 'center'
  },
  timeWrapper: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  talkBubbleSquare: {
  //   height: 40,
    backgroundColor: '#169FAD',
    borderWidth: 2,
    borderColor: '#169FAD',
    color: '#FFFFFF'
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
    borderRightColor: '#169FAD',
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
    borderRightColor: '#169FAD',
    borderBottomWidth: 3.25,
    borderBottomColor: 'transparent'
  }
});

export default DialogueForm;
