'use strict';
import React, {
  Component,
  View,
  StyleSheet,
  Image
} from 'react-native';

class DialogueItem extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();

    this.dialogue = this.template.dialogue[this.props.num];
    this.character = this.template.characters[this.dialogue.character];
  }

  render() {
    return (
      <View>
        <Text style={styles.labelText}>{this.template.characters[0].name}:</Text>
        <View style={styles.row}>
          <Image style={styles.imageHolder} source={{uri: this.props.pictureURI}} />
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>{this.template.dialogue[0].diaTrans}</Text>
          </View>
          {playButton}
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
    backgroundColor: '#FDFDF1'
  },
  button: {
    flex: 1,
    height: 40,
    marginTop: 0,
    backgroundColor: '#FFFFFF',
    borderColor: '#C8C7CC',
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center'
  },
  labelText: {
    fontFamily: 'helvetica',
    fontWeight: '100',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 16,
  },
  imageHolder: {
    justifyContent: 'center',
    height: 80,
    width: 80,
    marginTop: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C8C7CC',
    borderRadius: 10
  },
  bubble: {
    marginTop: 0,
    backgroundColor: '#FFFFFF',
    flex: 6,
    height: 50,
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
    borderColor: '#C8C7CC',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  bubbleText: {
    backgroundColor: 'rgba(255,255,255,0)',
    fontSize: 16
  },
  row: {
    flexDirection: 'row'
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'column'
  },
  buttonText: {
    fontSize: 18,
    color: '#858E99',
    alignSelf: 'center'
  }
});

export default DialogueItem;
