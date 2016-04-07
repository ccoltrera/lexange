'use strict';
import React, {
  Component,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class PhotoModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var dimens = Dimensions.get('window');
    var barHeight = (dimens.height - dimens.width) / 2;

    // Checks for values seen in the example lesson
    var image;
    if (this.props.pictureUri === 'Camila.png') {
      console.log('Camila');
      image = require('../../Images/Camila.png');
    }
    else if (this.props.pictureUri === 'Lucas.png') {
      image = require('../../Images/Lucas.png');
    }
    else {
      image = {uri: this.props.pictureUri};
    }

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={[styles.image, {top: barHeight, height: dimens.width, width: dimens.width} ]} source={image} />
        </View>
        <View style={[styles.bar, {top: 0, height: barHeight}]}></View>
        <View style={[styles.bar, {bottom: 0, height: barHeight}]}></View>
        <Icon name='times' style={styles.closer} onPress={this.props._togglePhotoModal}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  closer: {
    position: 'absolute',
    top: 30,
    left: 15,
    fontSize: 30,
    color: '#FFF'
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
    margin: 15,
    color: '#fff',
    fontSize: 16
  },
  bar: {
    position: 'absolute',
    right: 0,
    left: 0,
    backgroundColor: '#000000',
  },
  image: {
    position: 'absolute'
  }
});

export default PhotoModal;
