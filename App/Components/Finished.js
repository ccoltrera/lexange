'use strict';
import React, {
  Text,
  View,
  Component,
  StyleSheet,
  TouchableHighlight,
  Image
} from 'react-native';

import VocabCard from './VocabCard';
import DialogueItem from './DialogueItem';

class Finished extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();
  }

  render() {

    var vocabCards = []
    for (let i=0; i < this.template.characters.length; i++) {
      vocabCards.push(
        <VocabCard
          key={'vocabCard' + i}
          num={i}
          _updateTemplate={this.props._updateTemplate}
          _readTemplate={this.props._readTemplate}
        />
      )
    }

    var dialogueItems = [];
    for (let i=0; i < this.template.dialogue.length; i++) {
      dialogueItems.push(
        <DialogueItem
          key={'dialogue' + i}
          num={i}
          _updateTemplate={this.props._updateTemplate}
          _readTemplate={this.props._readTemplate}
          AudioRecorder={this.props.AudioRecorder}
          _setRecordingLength={this._setRecordingLength}
          recordingLength={this.props.recordingLength}
        />
      )
    }

    return (

      <View style={styles.container}>
        {vocabCards}
        {dialogueItems}
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
  labelText: {
    fontFamily: 'helvetica',
    fontWeight: '100',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 16,
  },
});

export default Finished;
