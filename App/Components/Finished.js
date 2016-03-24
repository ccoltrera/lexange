'use strict';
import React, {
  Text,
  View,
  Component,
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Tutorial from './Tutorial';
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
    var tutorialText = (
      <View>
        <Text style={styles.tutorialText}>
          Here's your finished lesson! Tap the cards to see translations, tap dialogue photos to hear audio.
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
            _updateTemplate={this.props._updateTemplate}
            _readTemplate={this.props._readTemplate}
          />
        )
      }
    }

    var placeBlock = (placeCards.length > 0) ? (
      (placeCards.length === 1) ? (
        <View>
          <Text style={styles.labelText}>Location</Text>
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
            _updateTemplate={this.props._updateTemplate}
            _readTemplate={this.props._readTemplate}
          />
        )
      }
    }

    var peopleBlock = (peopleCards.length > 0) ? (
      <View>
        <Text style={styles.labelText}>Characters</Text>
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
            _updateTemplate={this.props._updateTemplate}
            _readTemplate={this.props._readTemplate}
          />
        )
      }
    }

    var itemBlock = (itemCards.length > 0) ? (
      <View>
        <Text style={styles.labelText}>Items</Text>
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
          _updateTemplate={this.props._updateTemplate}
          _readTemplate={this.props._readTemplate}
        />
      )
    }


    return (
      <View style={styles.container}>
        <View style={{height: Dimensions.get('window').height - 134}}>
          <ScrollView
            style={styles.scrollView}
            showVerticalScrollIndicator={true}>
            {peopleBlock}
            {placeBlock}
            {itemBlock}
            <Text style={styles.labelText}>Dialogue</Text>
            {dialogueItems}
            <View style={styles.padder}></View>
          </ScrollView>
        </View>
        <Tutorial
          tutorialText={tutorialText}
          showTutorial={this.props.showTutorial} />
        <ContinueButton
          enabled={true}
          label={'Make More Lessons!'}
          _next={this._next}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDF1',
  },
  scrollView: {
    paddingTop: 10,
  },
  padder: {
    height: 75
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
  tutorialText: {
    marginBottom: 5,
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
    fontSize: 18,
    marginTop: 5,
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
