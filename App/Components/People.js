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
import Character from './Character';

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
    var characters = [];
    for (let i = 0; i < this.template.characters.length; i++) {
      characters.push(
        <Character
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
        {characters}
        <ContinueButton
          enabled={ /*this.state.continue*/ true }
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
  }
});

export default People;
