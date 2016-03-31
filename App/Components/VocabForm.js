'use strict';
import React, {
  StyleSheet,
  Text,
  View,
  Component,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import _handleChange from '../Utils/templateUtils';

class VocabForm extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();

    this.state = this.props.type === 'people' ? ({
      name: decodeURIComponent(this.template[this.props.type][this.props.num].name),
      desc: decodeURIComponent(this.template[this.props.type][this.props.num].desc),
      descTrans: decodeURIComponent(this.template[this.props.type][this.props.num].descTrans),
      pictureUri: this.template[this.props.type][this.props.num].pictureUri,
    }) : ({
      desc: decodeURIComponent(this.template[this.props.type][this.props.num].desc),
      descTrans: decodeURIComponent(this.template[this.props.type][this.props.num].descTrans),
      pictureUri: this.template[this.props.type][this.props.num].pictureUri,
    })

    this._handleChangeName = _handleChange.bind(
      this,
      'name',
      [this.props.type, this.props.num, 'name']
    );
    this._handleChangeDesc = _handleChange.bind(
      this,
      'desc',
      [this.props.type, this.props.num, 'desc']
    );
    this._handleChangeDescTrans = _handleChange.bind(
      this,
      'descTrans',
      [this.props.type, this.props.num, 'descTrans']
    );
    this._setImage = _handleChange.bind(
      this,
      'pictureUri',
      [this.props.type, this.props.num, 'pictureUri']
    );
    this._removeImage = _handleChange.bind(
      this,
      'pictureUri',
      [this.props.type, this.props.num, 'pictureUri'],
      ''
    );

    this._toggleCam = this.props._toggleCam.bind(undefined, this._setImage);

    this.teacherLang = decodeURIComponent(this.template.languages.teacher);
    this.studentLang = decodeURIComponent(this.template.languages.student);
  }

  render() {

    var descriptor = '';

    switch (this.props.type) {
      case 'people':
        descriptor = 'Character';
        break;
      case 'items':
        descriptor = 'Item';
        break;
      case 'places':
        descriptor = 'Location';
        break;
    }

    var vocabPhoto = (!this.state.pictureUri) ? (
      <Text style={[styles.labelText, {color: '#C7C7CD', alignSelf: 'center', marginBottom: 80}]}>Photo of the {descriptor}</Text>
    ) : (
      // <TouchableOpacity
      //   onPress={this._toggleCam}
      //   >
        <Image
          // style={styles.cameraButton}
          style={styles.vocabPhoto}
          source={{uri: this.state.pictureUri}}
          onPress={this._toggleCam}
          />
      // </TouchableOpacity>
    )

    const guide = this.template[this.props.type][this.props.num].guide;

    var nextStyle = {};
    var nextBorder = {borderWidth: 2, borderColor: '#F02B1F'}

    switch(this.props.nextUp) {
      case 'pictureUri' + this.props.num:
        nextStyle.photoFrame = nextBorder;
        nextStyle.recordBack = {backgroundColor: 'rgba(240,43,31,0.8)', top: 84};
        break;
      case 'name' + this.props.num:
        nextStyle.name = nextBorder;
        break;
      case 'desc' + this.props.num:
        nextStyle.desc = nextBorder;
        break;
      case 'descTrans' + this.props.num:
        nextStyle.descTrans = nextBorder;
        break;
    }

    return (
      <View style={styles.card}
        >
        <Text style={styles.labelText}><Text style={styles.boldLabelText}>{descriptor} {this.props.num + 1}: </Text>{guide}</Text>
        <TouchableWithoutFeedback
          onPress={this._toggleCam}>
        <View style={[styles.photoFrame, nextStyle.photoFrame]}>
          {vocabPhoto}
          <TouchableOpacity
            style={[styles.button, nextStyle.recordBack]}
            onPress={this._toggleCam}
            >
            <Icon name='camera' style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
        {this.props.type === 'people' ? ( <TextInput
          autoCorrect={false}
          returnKeyType='done'
          style={[styles.textInput, nextStyle.name]}
          value={this.state.name}
          onChange={this._handleChangeName}
          placeholder={'Character\'s Name (' + this.teacherLang + ')'}
          />) : (
            null
          )}
        <TextInput
          autoCorrect={false}
          returnKeyType='done'
          style={[styles.textInput, nextStyle.desc]}
          value={this.state.desc}
          onChange={this._handleChangeDesc}
          placeholder={'\'' + guide + '\' (in ' + this.teacherLang + ')'}
          />
        <TextInput
          autoCorrect={false}
          returnKeyType='done'
          style={[styles.textInput, nextStyle.descTrans]}
          value={this.state.descTrans}
          onChange={this._handleChangeDescTrans}
          placeholder={(this.state.desc ? '\'' + this.state.desc + '\'' : 'Translation') + ' in ' + this.studentLang}
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
    textAlign: 'center',
    // alignSelf: 'center'
  },
  boldLabelText: {
    fontWeight: 'bold',
    color: 'rgba(22,159,173,1)'
  },
  photoFrame: {
    height: 170,
    width: 170,
    margin: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#979797',
    alignSelf: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  vocabPhoto: {
    // flex: 1,
    height: 170,
    width: 170,
    alignSelf: 'center',
    borderRadius: 15
  },
  button: {
    position: 'absolute',
    right: -85,
    // left: 40,
    top: 85,
    // left: 0,
    // alignSelf: 'center',
    height: 170,
    width: 170,
    // backgroundColor: 'rgba(240,183,103,1)',
    backgroundColor: 'rgba(22,159,173,0.8)',
    borderRadius: 85,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF'
    // borderColor: 'rgba(22,159,173,0.6)',
    // backgroundColor: 'rgba(255,255,255,1)'
  },
  buttonIcon: {
    fontSize: 30,
    color: '#FFFFFF',
    marginRight: 65,
    marginBottom: 70,
    // color: 'rgba(22,159,173,1)',
    alignSelf: 'center'
  },
  textInput: {
    flex: 1,
    height: 40,
    marginBottom: 15,
    paddingLeft: 12,
    paddingRight: 12,
    fontFamily: 'System',
    fontSize: 18,
    color: '#414141',
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 12,
  },
});

export default VocabForm;
