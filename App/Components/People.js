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
        _readTemplate: this.props._readTemplate,
        _updateTemplate: this.props._updateTemplate
      }
    });
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
        <View style={styles.tutorialBox}>
          <Text style={styles.tutorialText}>
            Make richer lessons by giving characters:
          </Text>
          <Text style={[styles.tutorialText, {marginLeft: 10}]}>
            <Icon name='circle' style={{fontSize: 5}} /> a name
          </Text>
          <Text style={[styles.tutorialText, {marginLeft: 10}]}>
            <Icon name='circle' style={{fontSize: 5}} /> a description in {this.template.languages.teacher}
          </Text>
          <Text style={[styles.tutorialText, {marginLeft: 10}]}>
            <Icon name='circle' style={{fontSize: 5}} /> a picture
          </Text>
        </View>
        {people}
        <ContinueButton
          enabled={
            // (this.state.continue || this.template.people[0].pictureUri)
            true
          }
          label='Dialogue'
          _next={this._next}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
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
    marginBottom: 3,
    fontSize: 16
  }
});

export default People;
