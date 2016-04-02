'use strict';
import React, {
  Component,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Dimensions
} from 'react-native';

import _handleChange from '../Utils/templateUtils';
import Icon from 'react-native-vector-icons/FontAwesome';

class DialogueForm extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();

    this.state = {
      phrase: decodeURIComponent(this.template.dialogue[this.props.num].phrase),
      phraseTrans: decodeURIComponent(this.template.dialogue[this.props.num].phraseTrans),
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

    this.teacherLang = decodeURIComponent(this.template.languages.teacher);
    this.studentLang = decodeURIComponent(this.template.languages.student);
  }

  render() {
    var {height, width} = Dimensions.get('window');
    var bubbleWidth = width - 176;

    var nextStyle = {};
    var nextBorder = {borderWidth: 2, borderColor: '#F02B1F'}

    switch(this.props.nextUp) {
      case 'phrase' + this.props.num:
        nextStyle.phrase = nextBorder;
        nextStyle.phraseTriangle = {borderRightColor: '#F02B1F'};
        nextStyle.phraseTriangleInside = {left: 8};
        break;
      case 'audioUri' + this.props.num:
        // nextStyle.recordButton = nextBorder;
        nextStyle.recordBack = {backgroundColor: 'rgba(240,43,31,0.8)', };
        nextStyle.imageBorder = nextBorder;
        break;
      case 'phraseTrans' + this.props.num:
        nextStyle.phraseTrans = nextBorder;
        break;
    }

    return(
      <View style={styles.card}>
        <Text style={styles.labelText}>
          <Text style={styles.boldLabelText}>
            {this.template.dialogue[this.props.num].guide}
          </Text>
          {' (in ' + this.teacherLang + ')'}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={[styles.imageHolder, nextStyle.imageBorder]}>
            <Image style={styles.image} source={{uri: this.person.pictureUri}} />
            <TouchableOpacity onPress={this._toggleRecordingPanel}
              style={styles.touchableWrap}>
              <View style={[styles.button, nextStyle.recordButton, nextStyle.recordBack]}>
                <Icon name='microphone' style={[styles.buttonIcon, nextStyle.recordIcon]} />
              </View>
            </TouchableOpacity>
          </View>
            <View style={styles.talkBubble}>
              <View style={[styles.talkBubbleTriangle, nextStyle.phraseTriangle]} />
                <TextInput
                    autoCorrect={false}
                    returnKeyType='done'
                    multiline={true}
                    style={[styles.textInput, styles.talkBubbleSquare, {width: bubbleWidth}, nextStyle.phrase]}
                    value={this.state.phrase}
                    onChange={this._handleChangePhrase}
                    placeholder={this.template.dialogue[this.props.num].guide + ' (in ' + this.teacherLang + ')'}
                    />
              <View style={[styles.talkBubbleTriangleInside, nextStyle.phraseTriangleInside]} />
            </View>
          </View>
        <TextInput
          autoCorrect={false}
          returnKeyType='done'
          style={[styles.textInput, nextStyle.phraseTrans]}
          value={this.state.phraseTrans}
          onChange={this._handleChangePhraseTrans}
          placeholder={'Translation in ' + this.studentLang}
          />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  card: {
    margin: 15,
    marginBottom: 0,
    padding: 15,
    paddingBottom: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    },
    justifyContent: 'center'
  },
  labelText: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 18,
    marginBottom: 15,
    // alignSelf: 'center'
  },
  boldLabelText: {
    fontWeight: 'bold',
    color: 'rgba(22,159,173,1)'
  },
  imageHolder: {
    justifyContent: 'center',
    height: 100,
    width: 100,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(22,159,173,0.8)',
    // backgroundColor: 'rgba(22,159,173,1)',
  },
  image: {
    position: 'absolute',
    top: -1,
    left: -1,
    // borderRadius: 15,
    height: 98,
    width: 98,
  },
  textInput: {
    flex: 1,
    height: 40,
    marginBottom: 15,
    paddingLeft: 12,
    paddingRight: 12,
    fontFamily: 'System',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#979797',
    color: '#414141',
    borderRadius: 12,
  },
  touchableWrap: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1
  },
  button: {
    position: 'absolute',
    right: 7,
    left: 52,
    bottom: 7,
    top: 52,
    // left: 0,
    // alignSelf: 'center',
    // height: 30,
    // width: 120,
    // backgroundColor: 'rgba(240,183,103,1)',
    backgroundColor: 'rgba(22,159,173,0.8)',
    borderRadius: 11,
    justifyContent: 'center',
    // borderWidth: 2,
    borderColor: '#FFFFFF'
    // borderColor: 'rgba(22,159,173,0.6)',
    // backgroundColor: 'rgba(255,255,255,1)'
  },
  buttonIcon: {
    fontSize: 25,
    color: '#FFFFFF',
    // marginRight: 5,
    // marginBottom: 5,
    // color: 'rgba(22,159,173,1)',
    alignSelf: 'center'
  },
  talkBubbleSquare: {
    marginLeft: 15,
    // marginRight: 15,
    flex: 1,
    height: 100,
  },
  talkBubbleTriangle: {
    position: 'absolute',
    left: 3,
    top: 11,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 6,
    borderRightWidth: 13,
    borderRightColor: '#979797',
    borderBottomWidth: 6,
    borderBottomColor: 'transparent'
  },
  talkBubbleTriangleInside: {
    position: 'absolute',
    left: 5,
    top: 11,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 6,
    borderRightWidth: 13,
    borderRightColor: '#FFFFFF',
    borderBottomWidth: 6,
    borderBottomColor: 'transparent'
  }
});

export default DialogueForm;
