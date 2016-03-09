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
    this.person = this.template.people[this.dialogue.person];

    this._toggleShow = this._toggleShow.bind(this);
  }

  _play() {
    this.props.AudioRecorder.playRecording();
    this.setState({playing: true});

  }

  _stop() {
      this.props.AudioRecorder.stopPlaying();
      this.setState({playing: false});
  }

  _toggleShow() {
    this.setState({
      show: !this.state.show
    });
  }

  componentDidMount() {
    this.props.AudioRecorder.onProgress = (data) => {
      this.setState({currentTime: Math.floor(data.currentTime)});
      if (this.state.currentTime >= this.props.recordingLength) {
        this.setState({playing: false});
      }
    }
  }

  render() {

    var playButton = this.props.recordingLength ? (
      this.state.playing ? (
        <TouchableHighlight
          style={styles.button}
          onPress={this._stop}
          underlayColor='#EEEEEE'
          >
          <Icon name='stop' style={styles.buttonText} />
        </TouchableHighlight>
      ) : (
        <TouchableHighlight
          style={styles.button}
          onPress={this._play}
          underlayColor='#EEEEEE'
          >
          <Icon name='volume-up' style={styles.buttonText} />
        </TouchableHighlight>
      )
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
          <Text style={styles.charName}>{this.person.name.toUpperCase() }</Text>
          <View style={styles.row}>
            <Image style={styles.imageHolder} source={{uri: this.person.pictureUri}} />
            <TouchableHighlight
              style={styles.bubble}
              onPress={this._toggleShow}
              underlayColor='#EEEEEE'
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
  button: {
    flex: 1,
    height: 45,
    marginTop: 0,
    backgroundColor: '#FFFFFF',
    borderColor: '#C8C7CC',
    borderWidth: 3,
    borderRadius: 22.5,
    justifyContent: 'center'
  },
  charName: {
    fontFamily: 'helvetica',
    fontWeight: '100',
    fontSize: 14,
    // marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  imageHolder: {
    justifyContent: 'center',
    height: 60,
    width: 60,
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
  buttonText: {
    fontSize: 18,
    color: '#858E99',
    alignSelf: 'center'
  }
});

export default DialogueItem;
