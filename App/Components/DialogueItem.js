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
          { this.dialogue.phraseTrans }
        </Text>
      ) : (
        <Text style={styles.bubbleText}>
          { this.dialogue.phrase }
        </Text>
      )

    return (
        <TouchableHighlight
          style={styles.card}
          onPress={this._toggleShow}
          underlayColor='#EEEEEE'
          >
          <View>
          <Text style={styles.labelText}>{this.person.name}:</Text>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.imageHolder} source={{uri: this.person.pictureUri}} />
            <View style={{flexDirection: 'column', flex: 1}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={styles.bubble}>

                  {text}

                </View>
              </View>
              {playButton}
            </View>
          </View>
          </View>
        </TouchableHighlight>
    )
  }

}

const styles = StyleSheet.create({
  labelText: {
    fontFamily: 'helvetica',
    fontWeight: '300',
    fontSize: 18,
    marginBottom: 10,
  },
  imageHolder: {
    justifyContent: 'center',
    height: 80,
    width: 80,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C8C7CC',
    borderRadius: 10
  },
  bubble: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#C8C7CC',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  bubbleText: {
    backgroundColor: 'rgba(255,255,255,0)',
    fontSize: 18
  },
  button: {
    flex: 1,
    height: 45,
    width: 45,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#C8C7CC',
    borderWidth: 2,
    borderRadius: 22.5,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#858E99',
    alignSelf: 'center'
  },
  card: {
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  }
});

export default DialogueItem;
