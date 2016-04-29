'use strict';
import React, {
  Text,
  View,
  Component,
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView,
  Dimensions,
  Modal
} from 'react-native';

import Tutorial from './Tutorial';
import VocabCard from './VocabCard';
import DialogueItem from './DialogueItem';
import ContinueButton from './ContinueButton';
import PhotoModal from './PhotoModal';

import Templates from './Templates';
import exampleLesson from '../Utils/exampleLesson';

class Finished extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showThisTutorial: this.props.showTutorial,
      showPhotoModal: false
    }

    this.template = exampleLesson;

    this._next = this._next.bind(this);
    this._toggleTutorial = this._toggleTutorial.bind(this);
    this._togglePhotoModal = this._togglePhotoModal.bind(this);
  }

  _next() {
    if (this.props.role === 'teacher') {
      this.props.toRoute({
        name: 'Templates',
        component: Templates,
        headerStyle: styles.headerShadow,
        passProps: {
          tutorial: this.props.showTutorial,
        }
      });
    }
    else if (this.props.role === 'student') {
      this.props.toRoute({
        name: 'Create Account',
        component: CreateAccount,
        headerStyle: styles.headerShadow
      });
    }
  }

  _toggleTutorial() {
    this.setState({
      showThisTutorial: !this.state.showThisTutorial
    })
  }

  _togglePhotoModal(pictureUri) {
    this.setState({
      modalPictureUri: pictureUri,
      showPhotoModal: !this.state.showPhotoModal
    })
  }

  render() {
    var tutorialText = this.props.role === 'teacher' ? (
      <View>
        <Text style={styles.tutorialText}>
          Here's a simple example of what you'll be making.
        </Text>
        <Text style={styles.tutorialText}>
          Tap text to see translations, and tap photos in the dialogue to hear audio.
        </Text>
      </View>
      ) : (
      <View>
        <Text style={styles.tutorialText}>
          Lessons are like stories, with characters and dialogue. Some even have locations and items!
        </Text>
        <Text style={styles.tutorialText}>
          Tap text to see translations, and tap photos in the dialogue to hear audio.
        </Text>
      </View>
    )

    var placeCards = [];
    if (this.template.places.length > 0) {
      for (let i=0; i < this.template.places.length; i++) {
        placeCards.push(
          <VocabCard
            key={'itemsCard' + i}
            num={i}
            content='places'
            _togglePhotoModal={this._togglePhotoModal}
            template={this.template}
          />
        )
      }
    }

    var placeBlock = (placeCards.length > 0) ? (
      (placeCards.length === 1) ? (
        <View>
          <Text style={styles.labelText}>{'Location'.toUpperCase()}</Text>
          {placeCards}
        </View>
      ) : (
        <View>
          <Text style={styles.labelText}>Locations</Text>
          {placeCards}
        </View>
      )
    ) : (
      null
    )

    var peopleCards = [];
    if (this.template.people.length > 0) {
      for (let i=0; i < this.template.people.length; i++) {
        peopleCards.push(
          <VocabCard
            key={'peopleCard' + i}
            num={i}
            content='people'
            _togglePhotoModal={this._togglePhotoModal}
            template={this.template}
          />
        )
      }
    }

    var peopleBlock = (peopleCards.length > 0) ? (
      <View>
        <Text style={styles.labelText}>{'Characters'.toUpperCase()}</Text>
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
            key={'itemsCard' + i}
            num={i}
            content='items'
            _togglePhotoModal={this._togglePhotoModal}
            template={this.template}
          />
        )
      }
    }

    var itemBlock = (itemCards.length > 0) ? (
      <View>
        <Text style={styles.labelText}>{'Items'.toUpperCase()}</Text>
        {itemCards}
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
          _togglePhotoModal={this._togglePhotoModal}
          template={this.template}
        />
      )
    }


    return (
      <View style={styles.container}>
        <Modal
          animated={true}
          transparent={true}
          visible={this.state.showPhotoModal}>
          <PhotoModal
            pictureUri={this.state.modalPictureUri}
            _togglePhotoModal={this._togglePhotoModal} />
        </Modal>
        <View style={{height: Dimensions.get('window').height - 134}}>
          <ScrollView
            style={styles.scrollView}
            showVerticalScrollIndicator={true}>
            {peopleBlock}
            {placeBlock}
            {itemBlock}
            <Text style={styles.labelText}>{'Dialogue'.toUpperCase()}</Text>
            {dialogueItems}
            <View style={styles.padder}></View>
          </ScrollView>
        </View>
        <Tutorial
          header={'Example Lesson'}
          tutorialText={tutorialText}
          showTutorial={this.props.showTutorial} />
        <ContinueButton
          enabled={true}
          label={this.props.role === 'teacher' ? 'Make Your First Lesson!' : 'Study Mode'}
          _next={this._next}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C6DCDF',
  },
  scrollView: {
    paddingTop: 16,
  },
  padder: {
    height: 75
  },
  headerShadow: {
    backgroundColor: '#169FAD',
    marginLeft: -2,
    marginRight: -2,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  tutorialText: {
    marginBottom: 15,
    fontSize: 16,
    fontWeight: '300',
    backgroundColor: 'transparent',
    fontFamily: 'System'
  },
  labelText: {
    fontFamily: 'helvetica',
    fontWeight: 'bold',
    // alignSelf: 'center',
    marginLeft: 15,
    color: '#169FAD',
    // color: '#FFF',
    fontSize: 16,
    marginTop: 0,
    marginBottom: 15,
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
