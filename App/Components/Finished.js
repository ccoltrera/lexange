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
import ContinueButton from './ContinueButton';

import CreateAccount from './CreateAccount';

class Finished extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();

    this._next = this._next.bind(this);
  }

  _next() {
    this.props.toRoute({
      name: 'Create Account',
      component: CreateAccount,
    });
  }

  render() {

    var peopleCards = [];
    if (this.template.people.length > 0) {
      for (let i=0; i < this.template.people.length; i++) {
        peopleCards.push(
          <VocabCard
            key={'vocabCard' + i}
            num={i}
            content='people'
            _updateTemplate={this.props._updateTemplate}
            _readTemplate={this.props._readTemplate}
          />
        )
      }
    }

    var peopleBlock = (peopleCards.length > 0) ? (
      <View style={styles.cardColumn}>
        <Text style={styles.labelText}>PEOPLE:</Text>
        {peopleCards}
      </View>
    ) : (
      <View style={styles.cardColumn}></View>
    )

    var itemCards = [];
    if (this.template.items.length > 0) {
      for (let i=0; i < this.template.items.length; i++) {
        itemCards.push(
          <VocabCard
            key={'vocabCard' + i}
            num={i}
            content='items'
            _updateTemplate={this.props._updateTemplate}
            _readTemplate={this.props._readTemplate}
          />
        )
      }
    }

    var itemBlock = (itemCards.length > 0) ? (
      <View style={styles.cardColumn}>
        <Text style={styles.labelText}>ITEMS:</Text>
        {peopleCards}
      </View>
    ) : (
      <View style={styles.cardColumn}></View>
    )

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
        <View style={styles.tutorialBox}>
          <Text style={styles.tutorialText}>
            Here's your finished lesson! Click on cards and dialogue to see translations
          </Text>
        </View>
        <View style={styles.cardRow}>
          {peopleBlock}
          {itemBlock}
        </View>
        <Text style={styles.labelText}>DIALOGUE:</Text>
        {dialogueItems}
        <ContinueButton
          enabled={true}
          label={'Share Your Lesson!'}
          _next={this._next}/>
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
  tutorialBox: {
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C8C7CC'
  },
  tutorialText: {
    fontSize: 16
  },
  labelText: {
    fontFamily: 'helvetica',
    fontWeight: '100',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 5,
  },
  cardRow: {
    flexDirection: 'row'
  },
  cardColumn: {
    flexDirection: 'column',
    flex: 1
  },
});

export default Finished;
