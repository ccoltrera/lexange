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

class PeopleForm extends Component {
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
      <Icon name='camera' style={styles.camera}/>
    ) : (
      <Image
        // style={styles.cameraButton}
        style={styles.cameraButtonImage}
        source={{uri: this.state.pictureUri}}
        onPress={this._toggleCam}
        />
    )

    const desc = this.template.characters[this.props.num].desc;

    return (
      <View>
        <View style={[styles.row, styles.labelWrapper]}>
          <Text style={[styles.labelText, {fontWeight: 'bold'}]}>CHARACTER {this.props.num + 1}: </Text>
          <Text style={styles.labelText}>{desc.toUpperCase()}</Text>
        </View>
        <View style={[styles.row, styles.backBox]}>
          <View style={styles.row}>
            <TouchableHighlight
              onPress={this._toggleCam}
              style={styles.cameraButton}
              underlayColor='#EEEEEE'
              >
              {cameraButton}
            </TouchableHighlight>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
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
    height: 30,
    paddingLeft: 10,
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#C8C7CC',
    borderRadius: 8,
    color: '#000000'
  },
  cameraButton: {
    justifyContent: 'center',
    height: 80,
    width: 80,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C8C7CC',
    borderRadius: 10
  },
  cameraButtonImage: {
    flex: 1,
    borderRadius: 10
  },
  roundedHighlight: {
    height: 80,
    width: 40,
    borderRadius: 10
  },
  camera: {
    fontSize: 36,
    color: '#858E99',
    alignSelf: 'center'
  },
  labelWrapper: {
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 16,
  },
  labelText: {
    fontFamily: 'helvetica',
    fontWeight: '100',
    fontSize: 14,
  },
  backBox: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 26,
    paddingRight: 26,
    borderWidth: 1,
    borderColor: '#C8C7CC'
  },
});

export default PeopleForm;
