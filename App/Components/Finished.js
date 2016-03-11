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

import VocabCard from './VocabCard';
import DialogueItem from './DialogueItem';
import ContinueButton from './ContinueButton';

import CreateAccount from './CreateAccount';

class Finished extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showThisTutorial: this.props.showTutorial,
    }

    this.template = this.props._readTemplate();

    this._next = this._next.bind(this);
    this._toggleTutorial = this._toggleTutorial.bind(this);
  }

  _next() {
    this.props.toRoute({
      name: 'Create Account',
      component: CreateAccount,
      headerStyle: styles.headerShadow
    });
  }

  _toggleTutorial() {
    this.setState({
      showThisTutorial: !this.state.showThisTutorial
    })
  }

  render() {
    var tutorial = this.state.showThisTutorial ? (
      <View style={styles.tutorialBox}>
        <TouchableHighlight
          style={[styles.closeTutButton, {marginBottom: 5}]}
          onPress={this._toggleTutorial}
          underlayColor='#FFFFFF'
          >
          <View style={{flexDirection: 'row'}}>
            <Text>HIDE TIPS </Text>
            <Icon name='times-circle-o' style={styles.closeTutIcon} />
          </View>
        </TouchableHighlight>
        <Text style={styles.tutorialText}>
          Here's your finished lesson! Click on cards and dialogue to see translations
        </Text>
      </View>
    ) : (
      <View style={styles.tutorialBox}>
        <TouchableHighlight
          style={[styles.closeTutButton, {marginBottom: -5}]}
          onPress={this._toggleTutorial}
          underlayColor='#FFFFFF'
          >
          <View style={{flexDirection: 'row'}}>
            <Text>SHOW TIPS </Text>
            <Icon name='times-circle-o' style={styles.closeTutIcon} />
          </View>
        </TouchableHighlight>
      </View>
    )

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
      <View>
        <Text style={styles.labelText}>Characters:</Text>
        {peopleCards}
      </View>
    ) : (
      null
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
      <View>
        <Text style={styles.labelText}>Objects:</Text>
        {peopleCards}
      </View>
    ) : (
      null
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
        {tutorial}
        {peopleBlock}
        {itemBlock}
        <Text style={styles.labelText}>Dialogue:</Text>
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
    // padding: 15,
    flexDirection: 'column',
    backgroundColor: '#FDFDF1'
  },
  headerShadow: {
    backgroundColor: '#169FAD',
    marginLeft: -2,
    marginRight: -2,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  tutorialBox: {
    marginLeft: -1,
    marginRight: -1,
    padding: 15,
    paddingBottom: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C8C7CC'
  },
  tutorialText: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '300'
  },
  closeTutButton: {
    alignSelf: 'flex-end',
    borderRadius: 15,
    marginTop: -10,
    marginRight: -3
  },
  closeTutIcon: {
    fontSize: 16,
    borderRadius: 8,
  },
  closeTutText: {
    fontWeight: '400'
  },
  labelText: {
    fontFamily: 'helvetica',
    fontWeight: '300',
    fontSize: 16,
    marginLeft: 15,
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
