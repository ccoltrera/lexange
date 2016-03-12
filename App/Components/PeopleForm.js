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

    const desc = this.template.people[this.props.num].desc;

    return (
      <View>
        <View style={styles.card}>
          <View style={[styles.row, styles.labelWrapper]}>
            <Text style={[styles.labelText, {fontWeight: 'bold', color: 'rgba(22,159,173,1)'}]}>Character {this.props.num + 1}: </Text>
            <Text style={styles.labelText}>{desc}</Text>
          </View>
          <View style={styles.row}>
            <TouchableHighlight
              onPress={this._toggleCam}
              style={styles.cameraButton}
              underlayColor='#EEEEEE'
              >
              {cameraButton}
            </TouchableHighlight>
            <View style={styles.column}>
              <Text style={styles.textInputLabel}>
                Name in {this.template.languages.teacher}:
              </Text>
              <TextInput
                autoCorrect={false}
                returnKeyType='done'
                style={styles.textInput}
                value={this.state.name}
                onChange={this._handleChangeName}
                placeholder={'Name in' + this.template.languages.teacher}
                />
              <Text style={styles.textInputLabel}>
                '{desc}' in {this.template.languages.teacher}:
              </Text>
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
    flex: 1,
    paddingLeft: 10,
    // paddingRight: 10
  },
  padder: {
    height: 50
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
  cameraButton: {
    justifyContent: 'center',
    height: 80,
    width: 80,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#C8C7CC',
    borderRadius: 10
  },
  cameraButtonImage: {
    flex: 1,
    borderRadius: 9
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
    marginBottom: 5,
  },
  labelText: {
    fontFamily: 'helvetica',
    fontWeight: '300',
    fontSize: 18,
    marginBottom: 5,
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

export default PeopleForm;
