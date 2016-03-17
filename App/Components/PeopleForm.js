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
          <Text style={styles.labelText}><Text style={styles.boldLabelText}>Character {this.props.num + 1}: </Text>{desc}</Text>
          <TouchableHighlight
            onPress={this._toggleCam}
            style={styles.cameraButton}
            underlayColor='#EEEEEE'
            >
            {cameraButton}
          </TouchableHighlight>
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
              placeholder={'\'' + desc + '\' (in' + this.template.languages.teacher + ')'}
              />
        </View>
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
    alignSelf: 'center'
  },
  boldLabelText: {
    fontWeight: 'bold',
    color: 'rgba(22,159,173,1)'
  },
  cameraButton: {
    justifyContent: 'center',
    height: 170,
    width: 170,
    margin: 15,
    backgroundColor: 'rgba(240,183,103,0.5)',
    borderRadius: 15,
    alignSelf: 'center'
  },
  camera: {
    fontSize: 100,
    color: '#FFFFFF',
    alignSelf: 'center'
  },
  cameraButtonImage: {
    flex: 1,
    borderRadius: 15
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
