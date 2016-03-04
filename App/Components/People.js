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

import Dialogue from './Dialogue';
import Cam from './Cam';
import ContinueButton from './ContinueButton';

import _handleChange from '../Utils/templateUtils';


class Character extends Component {
  constructor(props) {
    super(props);

    const template = this.props._readTemplate();
    this.state = {
      showCam: false,
      characterName: '',
      descTrans: '',
      pictureUri: '',
      language: template.languages.teacher
    };

    this._next = this._next.bind(this);
    this._handleChangeName = this._handleChangeName.bind(this);
    this._handleChangeTrans = this._handleChangeTrans.bind(this);
    this._toggleCam = this._toggleCam.bind(this);
    this._setImage = this._setImage.bind(this);
    this._removeImage = this._removeImage.bind(this);
  }

  _handleChangeName(event) {
    this.setState({
      characterName: event.nativeEvent.text
    });
  }

  _handleChangeTrans(event) {
    this.setState({
      descTrans: event.nativeEvent.text
    });
  }

  _next() {
    this.props.navigator.push({
      title: 'Dialogue',
      component: Dialogue,
      passProps: {
        characterName: this.state.characterName,
        descTrans: this.state.descTrans,
        pictureUri: this.state.pictureUri
      }
    })
  }

  _setImage(uri) {
    this.setState({
      pictureUri: uri
    });
  }

  _removeImage() {
    this.setState({
      pictureUri: ''
    });
  }

  render() {

    var cameraButton = (!this.state.pictureUri) ? (
      <TouchableHighlight onPress={this._toggleCam} style={styles.cameraButton}>
        <Icon name='camera' style={styles.camera}/>
      </TouchableHighlight>
    ) : (
      <Image style={styles.cameraButton} source={{uri: this.state.pictureUri}} onPress={this._toggleCam} />
    )

    return (
      <View>
        <Text style={styles.characterDesc}>Man on the street: </Text>
        <View style={styles.row}>
          {cameraButton}
          <View style={styles.column}>
            <TextInput
              returnKeyType='done'
              style={styles.textInput}
              value={this.state.characterName}
              onChange={this._handleChangeName}
              placeholder='Name'
              />
            <TextInput
              returnKeyType='done'
              style={styles.textInput}
              value={this.state.descTrans}
              onChange={this._handleChangeTrans}
              placeholder={'\'Man on the street\' in ' + this.state.language}
              />
            </View>
        </View>
      </View>
    )
  }
}

class People extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();
    this.state = {
      showCam: false,
      characterName: '',
      descTrans: '',
      pictureUri: '',
      language: this.template.languages.teacher
    };
  }

  _toggleCam() {
    this.setState({
      showCam: !this.state.showCam
    });
  }

  render() {



    return (
      <View style={styles.container}>
        <Modal
          animated={true}
          transparent={true}
          visible={this.state.showCam}>
          <Cam
            _setImage={this._setImage}
            _removeImage={this._removeImage}
            _toggleCam={this._toggleCam}
            pictureUri={this.state.pictureUri}/>
        </Modal>
        <ContinueButton
          enabled={ (this.state.characterName && this.state.descTrans && this.state.pictureUri) }
          label='Dialogue'
          _next={this._next}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 65,
    flexDirection: 'column',
    backgroundColor: '#48BBEC'
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column',
    flex: 1
  },
  characterDesc: {
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

export default People;
