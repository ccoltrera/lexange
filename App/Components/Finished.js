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
        <Text>{this.props.characterName}:</Text>
        <View style={styles.row}>
          <Image style={styles.imageHolder} source={{uri: this.props.pictureURI}} />
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>{this.props.greeting}</Text>
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
    marginTop: 65,
    flexDirection: 'column',
    backgroundColor: '#169FAD'
  },
  button: {
    flex: 1,
    height: 40,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center'
  },
  imageHolder: {
    justifyContent: 'center',
    height: 80,
    width: 80,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10
  },
  bubble: {
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    flex: 6,
    height: 50,
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
    borderColor: '#FFFFFF'
  },
  bubbleText: {
    backgroundColor: 'rgba(255,255,255,0)',
    marginLeft: 10,
    fontSize: 18
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
    color: '#111111',
    alignSelf: 'center'
  }
});

export default Finished;
