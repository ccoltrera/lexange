'use strict';
import React, {
  Component,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
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
    var {height, width} = Dimensions.get('window');
    var bubbleWidth = width - 165;

    return(
      <View style={styles.card}>
        <Text style={styles.labelText}>{this.template.dialogue[this.props.num].guide + ' (' + this.template.languages.teacher + ')'}</Text>
        <View style={{flexDirection: 'row'}}>
        <View style={styles.imageHolder}>
          <Image style={styles.image} source={{uri: this.person.pictureUri}} />
          <TouchableOpacity
            style={styles.button}
            onPress={this._toggleRecordingPanel}
            >
            <Icon name='microphone' style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
            <View style={styles.talkBubble}>
              <View style={styles.talkBubbleTriangle} />
                <TextInput
                    autoCorrect={false}
                    returnKeyType='done'
                    multiline={true}
                    style={[styles.textInput, styles.talkBubbleSquare, {width: bubbleWidth}]}
                    value={this.state.phrase}
                    onChange={this._handleChangePhrase}
                    placeholder={this.template.dialogue[this.props.num].guide + ' (' + this.template.languages.teacher + ')'}
                    />
              <View style={styles.talkBubbleTriangleInside} />
            </View>
          </View>
        <TextInput
          autoCorrect={false}
          returnKeyType='done'
          style={styles.textInput}
          value={this.state.phraseTrans}
          onChange={this._handleChangePhraseTrans}
          placeholder={'Translation in ' + this.template.languages.student}
          />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  card: {
    margin: 18,
    marginBottom: 0,
    padding: 15,
    paddingBottom: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
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
    fontSize: 20,
    marginBottom: 15,
    alignSelf: 'center'
  },
  imageHolder: {
    justifyContent: 'center',
    height: 80,
    width: 80,
    borderRadius: 15
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 15,
    height: 80,
    width: 80,
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
    borderColor: '#C8C7CC',
    borderRadius: 12,
    color: '#000000',
  },
  button: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 80,
    width: 80,
    backgroundColor: 'rgba(240,183,103,0.5)',
    borderRadius: 15,
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 36,
    color: '#FFFFFF',
    alignSelf: 'center'
  },
  talkBubbleSquare: {
    marginLeft: 15,
    flex: 1,
    height: 80,
  },
  talkBubbleTriangle: {
    position: 'absolute',
    left: 0,
    top: 33,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 6,
    borderRightWidth: 16,
    borderRightColor: '#979797',
    borderBottomWidth: 6,
    borderBottomColor: 'transparent'
  },
  talkBubbleTriangleInside: {
    position: 'absolute',
    left: 2,
    top: 33,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 6,
    borderRightWidth: 16,
    borderRightColor: '#FFFFFF',
    borderBottomWidth: 6,
    borderBottomColor: 'transparent'
  }
});

export default DialogueForm;
