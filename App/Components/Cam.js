'use strict';
import React, {
  AppRegistry,
  Component,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Alert
} from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

class CamModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {


    return this.props.pictureURI ? (
        <View style={styles.container}>
          <Image style={styles.image} source={{uri: this.props.pictureURI}}></Image>
        </View>
      ) : (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          captureTarget={Camera.constants.CaptureTarget.disk}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Icon style={styles.capture} name='camera' onPress={this.takePicture.bind(this)} />
          <TouchableHighlight
            onPress={this.props._toggleCam} >
            <Text style={styles.cancel} >Cancel</Text>
          </TouchableHighlight>
        </Camera>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log(data)
        this.props._setImage(data);
        Alert.alert(
          'Use picture?',
          'You can change it later if you want.',
          [
            {text: 'Retake', onPress: () => this.props._removeImage() },
            {text: 'OK', onPress: () => this.props._toggleCam() },
          ]
        )
      })
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  cancel: {
    margin: 10,
    color: '#fff',
    fontSize: 16
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    fontSize: 40
  },
  image: {
    flex: 1
  }
});

export default CamModal;
