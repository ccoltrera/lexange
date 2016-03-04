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
      showCam: false,
      _setImage: undefined
    };

    this._next = this._next.bind(this);
    this._toggleCam = this._toggleCam.bind(this);
  }

  _toggleCam(_setImage) {
    console.log(arguments)
    this.setState({
      _setImage: _setImage,
      showCam: !this.state.showCam
    });
  }

  _next() {
    this.props.navigator.push({
      title: 'Dialogue',
      component: Dialogue,
      passProps: {
        _readTemplate: this.props._readTemplate,
        _updateTemplate: this.props._updateTemplate
      }
    })
  }

  render() {

    return (
      <View style={styles.container}>
        <Modal
          animated={true}
          transparent={true}
          visible={this.state.showCam}>
          <Cam
            _setImage={this.state._setImage}
            _removeImage={this._removeImage}
            _toggleCam={this._toggleCam}
            pictureUri={this.state.pictureUri}/>
        </Modal>
        <Character
          num={0}
          _updateTemplate={this.props._updateTemplate}
          _readTemplate={this.props._readTemplate}
          _toggleCam={this._toggleCam} />
        <ContinueButton
          enabled={ (false) }
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
    padding: 15,
    marginTop: 65,
    flexDirection: 'column',
    backgroundColor: '#48BBEC'
  }
});

export default People;
