'use strict';
import React, {
  Component,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class DialogueItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      show: false
    };

    this.template = this.props._readTemplate();

    this._play = this._play.bind(this);
    this._stop = this._stop.bind(this);

    this.dialogue = this.template.dialogue[this.props.num];
    this.character = this.template.characters[this.dialogue.character];

    this._toggleShow = this._toggleShow.bind(this);
  }

  _play() {
    this.props.AudioRecorder.playRecording();
    this.setState({playing: true});

  }

  _stop() {
    if (this.state.playing) {
      this.props.AudioRecorder.stopPlaying();
      this.setState({playing: false});
    }
  }

  _toggleShow() {
    this.setState({
      show: !this.state.show
    });
    // console.log('hmmmmm')
  }

  render() {
    var playIcon = this.state.playing ? 'stop' : 'volume-up';

    var playButton = this.props.recordingLength ? (
      <TouchableHighlight
        style={styles.button}
        onPress={this._play}
        underlayColor='#EEEEEE'
        >
        <Icon name={playIcon} style={styles.buttonText} />
      </TouchableHighlight>
    ) : (
      <TouchableHighlight
        style={styles.button}
        underlayColor='#EEEEEE'
        >
        <Icon name='volume-off' style={styles.buttonText} />
      </TouchableHighlight>
    )

    var text = this.state.show ? (
        <Text style={[styles.bubbleText, {color: '#858E99'}]}>
          { this.dialogue.guide }
        </Text>
      ) : (
        <Text style={styles.bubbleText}>
          { this.dialogue.diaTrans }
        </Text>
      )

    return (
        <View>
        <Text style={styles.labelText}>{this.character.name.toUpperCase() }:</Text>
        <View style={styles.row}>
          <Image style={styles.imageHolder} source={{uri: this.character.pictureUri}} />
          <TouchableHighlight
            style={styles.bubble}
            onPress={this._toggleShow}
            underlayColor='#FFFFFF'
            >

            {text}

          </TouchableHighlight>
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
    fontSize: 14,
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
    flex: 5,
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
    borderColor: '#C8C7CC',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
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
