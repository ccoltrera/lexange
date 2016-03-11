'use strict';
import React, {
  StyleSheet,
  Text,
  View,
  Component,
  TextInput,
  TouchableHighlight,
  Modal,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';

import Cam from './Cam';
import Tutorial from './Tutorial';
import Dialogue from './Dialogue';
import ContinueButton from './ContinueButton';
import PeopleForm from './PeopleForm';

import _handleChange from '../Utils/templateUtils';

class People extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();
    this.state = {
      continue: false,
      showCam: false,
      _setImage: undefined
    };

    this._next = this._next.bind(this);
    this._toggleCam = this._toggleCam.bind(this);
  }

  _toggleCam(_setImage) {
    this.setState({
      continue: true,
      _setImage: _setImage,
      showCam: !this.state.showCam
    });
  }

  _next() {
    this.props.toRoute({
      name: 'Dialogue',
      component: Dialogue,
      passProps: {
        showTutorial: this.props.showTutorial,
        _readTemplate: this.props._readTemplate,
        _updateTemplate: this.props._updateTemplate
      },
      headerStyle: styles.headerShadow
    });
  }

  render() {
    var {height, width} = Dimensions.get('window');
    var height = height - 134;

    var people = [];
    for (let i = 0; i < this.template.people.length; i++) {
      people.push(
        <PeopleForm
          key={'character' + i}
          num={i}
          _updateTemplate={this.props._updateTemplate}
          _readTemplate={this.props._readTemplate}
          _toggleCam={this._toggleCam} />
      )
    }

    var tutorialText = (
      <View >
        <Text style={styles.tutorialText}>
          For your first lesson, we'll just have one character for the dialogue.
        </Text>
        <Text style={styles.tutorialText}>
          Make richer lessons by giving characters:
        </Text>
        <Text style={[styles.tutorialText, {marginLeft: 10}]}>
          - a name
        </Text>
        <Text style={[styles.tutorialText, {marginLeft: 10}]}>
          - a description in {this.template.languages.teacher}
        </Text>
        <Text style={[styles.tutorialText, {marginLeft: 10}]}>
          - a picture
        </Text>
      </View>
    )

    return (
      <View style={styles.container}>
        <Modal
          animated={true}
          transparent={true}
          visible={this.state.showCam}>
          <Cam
            _setImage={this.state._setImage}
            _removeImage={this._removeImage}
            _toggleCam={this._toggleCam} />
        </Modal>
        <View style={{height: height}}>
          <ScrollView
            style={styles.scrollView}
            showVerticalScrollIndicator={true}>
            {people}
            <View style={styles.padder}></View>
          </ScrollView>
        </View>
        <Tutorial
          tutorialText={tutorialText}
          showTutorial={this.props.showTutorial} />
        <ContinueButton
          enabled={
            // (this.state.continue || this.template.people[0].pictureUri)
            true
          }
          label='Next'
          _next={this._next}
        />
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
    paddingTop: 15,
    paddingBottom: 40
  },
  padder: {
    height: 50
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
    fontWeight: '300'
  },
});

export default People;
