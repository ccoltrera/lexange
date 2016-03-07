'use strict';
import React, {
  Text,
  View,
  Component,
  StyleSheet,
  TouchableHighlight,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class Finished extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();
    this.state = {
      playing: false
    };

    this._play = this._play.bind(this);
    this._stop = this._stop.bind(this);
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

    return (
      <View style={styles.container}>
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

export default Finished;
