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

class PeopleForm extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();

    this.state = {
      name: this.template.people[this.props.num].name,
      descTrans: this.template.people[this.props.num].descTrans,
      pictureUri: this.template.people[this.props.num].pictureUri,
    };

    this._handleChangeName = _handleChange.bind(
      this,
      'name',
      ['people', this.props.num, 'name']
    );
    this._handleChangeTrans = _handleChange.bind(
      this,
      'descTrans',
      ['people', this.props.num, 'descTrans']
    );
    this._setImage = _handleChange.bind(
      this,
      'pictureUri',
      ['people', this.props.num, 'pictureUri']
    );
    this._removeImage = _handleChange.bind(
      this,
      'pictureUri',
      ['people', this.props.num, 'pictureUri'],
      ''
    );

    this._toggleCam = this.props._toggleCam.bind(undefined, this._setImage);
  }

  render() {

    var characterPhoto = (!this.state.pictureUri) ? (
      <Text style={[styles.labelText, {color: '#C7C7CD', alignSelf: 'center', marginBottom: 80}]}>Character's Photo</Text>
    ) : (
      // <TouchableOpacity
      //   onPress={this._toggleCam}
      //   >
        <Image
          // style={styles.cameraButton}
          style={styles.characterPhoto}
          source={{uri: this.state.pictureUri}}
          onPress={this._toggleCam}
          />
      // </TouchableOpacity>
    )

    const desc = this.template.people[this.props.num].desc;

    return (
      <View>
        <View style={styles.card}>
          <Text style={styles.labelText}><Text style={styles.boldLabelText}>Character {this.props.num + 1}: </Text>{desc}</Text>
          <TouchableWithoutFeedback
            onPress={this._toggleCam}>
          <View style={styles.photoFrame}>
          {characterPhoto}
          <TouchableOpacity
            style={styles.button}
            onPress={this._toggleCam}
            >
            <Icon name='camera' style={styles.buttonIcon} />
          </TouchableOpacity>
          </View>
          </TouchableWithoutFeedback>
          <TextInput
            autoCorrect={false}
            returnKeyType='done'
            style={styles.textInput}
            value={this.state.name}
            onChange={this._handleChangeName}
            placeholder={'Character\'s Name (' + this.template.languages.teacher + ')'}
            />
          <TextInput
            autoCorrect={false}
            returnKeyType='done'
            style={styles.textInput}
            value={this.state.descTrans}
            onChange={this._handleChangeTrans}
            placeholder={'\'' + desc + '\' (in ' + this.template.languages.teacher + ')'}
            />
        </View>
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
    fontSize: 18,
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
  characterPhoto: {
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
    backgroundColor: 'rgba(22,159,173,1)',
    borderRadius: 85,
    justifyContent: 'center',
    // borderWidth: 2,
    borderColor: 'rgba(22,159,173,0.6)',
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
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 12,
    color: '#000000',
  },
});

export default PeopleForm;
