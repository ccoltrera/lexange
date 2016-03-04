'use strict';
import React, {
  StyleSheet,
  Text,
  View,
  Component,
  TextInput,
  TouchableHighlight,
  Modal,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import _handleChange from '../Utils/templateUtils';

class Character extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();

    this.state = {
      name: this.template.characters[this.props.num].name,
      descTrans: this.template.characters[this.props.num].descTrans,
      pictureUri: this.template.characters[this.props.num].pictureUri,
    };

    this._handleChangeName = _handleChange.bind(
      this,
      'name',
      ['characters', this.props.num, 'name']
    );
    this._handleChangeTrans = _handleChange.bind(
      this,
      'descTrans',
      ['characters', this.props.num, 'descTrans']
    );
    this._setImage = _handleChange.bind(
      this,
      'pictureUri',
      ['characters', this.props.num, 'pictureUri']
    );
    this._removeImage = _handleChange.bind(
      this,
      'pictureUri',
      ['characters', this.props.num, 'pictureUri'],
      ''
    );

    this._toggleCam = this.props._toggleCam.bind(undefined, this._setImage);
  }

  render() {

    var cameraButton = (!this.state.pictureUri) ? (
      <TouchableHighlight onPress={this._toggleCam} style={styles.cameraButton}>
        <Icon name='camera' style={styles.camera}/>
      </TouchableHighlight>
    ) : (
      <Image style={styles.cameraButton} source={{uri: this.state.pictureUri}} onPress={this._toggleCam} />
    )

    const desc = this.template.characters[this.props.num].desc;

    return (
      <View>
        <Text style={styles.desc}>{desc}: </Text>
        <View style={styles.row}>
          {cameraButton}
          <View style={styles.column}>
            <TextInput
              autoCorrect={false}
              returnKeyType='done'
              style={styles.textInput}
              value={this.state.name}
              onChange={this._handleChangeName}
              placeholder='Name'
              />
            <TextInput
              autoCorrect={false}
              returnKeyType='done'
              style={styles.textInput}
              value={this.state.descTrans}
              onChange={this._handleChangeTrans}
              placeholder={'\'' + desc + '\' in ' + this.template.languages.teacher}
              />
            </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column',
    flex: 1
  },
  desc: {
    marginBottom: 5,
    fontSize: 16
  },
  textInput: {
    flex: 5,
    height: 50,
    padding: 4,
    marginLeft: 5,
    marginBottom: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    color: '#FFFFFF'
  },
  cameraButton: {
    justifyContent: 'center',
    height: 80,
    width: 80,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10
  },
  roundedHighlight: {
    height: 80,
    width: 40,
    borderRadius: 10
  },
  camera: {
    fontSize: 36,
    alignSelf: 'center'
  }
});

export default Character;
