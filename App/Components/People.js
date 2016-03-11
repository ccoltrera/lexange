'use strict';
import React, {
  StyleSheet,
  Text,
  View,
  Component,
  TextInput,
  TouchableHighlight,
  Modal,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Cam from './Cam';
import Dialogue from './Dialogue';
import ContinueButton from './ContinueButton';
import PeopleForm from './PeopleForm';

import _handleChange from '../Utils/templateUtils';

class People extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();
    this.state = {
      showThisTutorial: this.props.showTutorial,
      continue: false,
      showCam: false,
      _setImage: undefined
    };

    this._next = this._next.bind(this);
    this._toggleCam = this._toggleCam.bind(this);
    this._toggleTutorial = this._toggleTutorial.bind(this);
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

  _toggleTutorial() {
    this.setState({
      showThisTutorial: !this.state.showThisTutorial
    })
  }

  render() {
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

    var tutorial = this.state.showThisTutorial ? (
      <View style={styles.tutorialBox}>
        <TouchableHighlight
          style={[styles.closeTutButton, {marginBottom: 5}]}
          onPress={this._toggleTutorial}
          underlayColor='#FFFFFF'
          >
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.closeTutText}>HIDE TIPS </Text>
            <Icon name='times-circle-o' style={styles.closeTutIcon} />
          </View>
        </TouchableHighlight>
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
    ) : (
      <View style={styles.tutorialBox}>
        <TouchableHighlight
          style={[styles.closeTutButton, {marginBottom: -5}]}
          onPress={this._toggleTutorial}
          underlayColor='#FFFFFF'
          >
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.closeTutText}>SHOW TIPS </Text>
            <Icon name='times-circle-o' style={styles.closeTutIcon} />
          </View>
        </TouchableHighlight>
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
        {tutorial}
        {people}
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
    // paddingTop: 15,
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
  }
});

export default People;
