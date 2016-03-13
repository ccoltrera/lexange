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

    this.state = {
      newSnapUri: ''
    }

    this._retake = this._retake.bind(this);
  }

  _retake() {
    this.setState({
      newSnapUri: ''
    });
  }

  render() {
    var dimens = Dimensions.get('window');
    var barHeight = (dimens.height - dimens.width) / 2;

    var pictureOver = this.state.newSnapUri ? (
      <View style={styles.imageContainer}>
        <Image style={[styles.image, {height: dimens.height, width: dimens.width} ]} source={{uri: this.state.newSnapUri}} />
        <View style={[styles.bar, {top: 0, height: barHeight}]}></View>
        <View style={[styles.bar, {bottom: 0, height: barHeight}]}></View>
      </View>
    ) : (
      null
    )

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            captureTarget={Camera.constants.CaptureTarget.disk}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>
            <View style={[styles.bar, {top: 0, height: barHeight}]}></View>
            <View style={[styles.bar, {bottom: 0, height: barHeight}]}></View>
            <Icon style={styles.capture} name='camera' onPress={this.takePicture.bind(this)} />
            <TouchableHighlight
              onPress={this.props._toggleCam} >
              <Text style={styles.cancel} >Cancel</Text>
            </TouchableHighlight>
          </Camera>
        </View>
        {pictureOver}
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {

        this.setState({
          newSnapUri: data
        });

        Alert.alert(
          'Use picture?',
          'You can change it later if you want.',
          [
            {text: 'Retake', onPress: () => this._retake() },
            {text: 'OK', onPress: () => {
              this.props._setImage(data);
              this.props._toggleCam()
            } },
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
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0
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
  bar: {
    position: 'absolute',
    right: 0,
    left: 0,
    backgroundColor: '#000000',
  },
  image: {
    flex: 1
  }
});

export default CamModal;
