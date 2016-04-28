'use strict';
import React, {
  Component,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

class VocabCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    this.template = this.props.template;
    this.content = this.template[this.props.content][this.props.num];

    this._toggleShow = this._toggleShow.bind(this);

    this.desc = decodeURIComponent(this.content.desc);
    this.descTrans = decodeURIComponent(this.content.descTrans);
    this.name = decodeURIComponent(this.content.name);

    this._togglePhotoModal = this.props._togglePhotoModal.bind(null, this.content.pictureUri);
  }

  _toggleShow() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    var text = this.state.show ? (
        <Text style={[styles.cardText, {color: '#858E99'}]}>
          { this.descTrans }
        </Text>
      ) : (
        <Text style={styles.cardText}>
          { this.desc }
        </Text>
      )

    var contentBlock = this.props.content === 'people' ? (
        <View>
          <Text style={[styles.cardText, {fontWeight: 'bold', color: 'rgba(22,159,173,1)'}]}>{this.name}</Text>
          {text}
        </View>
      ) : (
        <View>
          {text}
        </View>
      )

    // Checks for values seen in the example lesson
    var image;
    if (this.content.pictureUri === 'Camila.png') {
      image = require('../../Images/Camila.png');
    }
    else if (this.content.pictureUri === 'Lucas.jpg') {
      image = require('../../Images/Lucas.jpg');
    }
    else {
      image = {uri: this.content.pictureUri};
    }

    return(
      <TouchableWithoutFeedback
        onPress={this._toggleShow}>
        <View style={styles.card}>
        <View style={styles.row}>
        <TouchableHighlight
          onPress={this._togglePhotoModal}>
          <Image style={styles.imageHolder} source={image} />
        </TouchableHighlight>
          <View style={styles.textColumn}>
            {contentBlock}
          </View>
        </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

}

const styles = StyleSheet.create({
  imageHolder: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    height: 100,
    width: 100,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'rgba(22,159,173,0.8)',
    borderRadius: 15
  },
  card: {
    height: 130,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  cardText: {
    backgroundColor: 'rgba(255,255,255,0)',
    fontSize: 18,
    fontWeight: '400',
    color: '#414141',
    marginLeft: 10,
    marginBottom: 10
  },
  textColumn: {
    // height: 80,
    flexDirection: 'column',
    marginLeft: 105,
    // justifyContent: 'center',
  }
});

export default VocabCard;
