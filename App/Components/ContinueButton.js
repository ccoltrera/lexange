'use strict';
import React, {
  TouchableHighlight,
  Text,
  Component,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class ContinueButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    var buttonStyle = this.props.enabled ? (
        styles.button
      ) : (
        styles.unbutton
      )

    var textStyle = this.props.enabled ? (
        styles.buttonText
      ) : (
        styles.unbuttonText
      )

    var _next = this.props.enabled ? (
        this.props._next
      ) : (
        null
      )

    return (
      <TouchableHighlight
        style={buttonStyle}
        underlayColor='white'
        onPress={this.props._next}
        >
        <Text style={textStyle}>{this.props.label} <Icon name='caret-right' /></Text>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#111111',
    alignSelf: 'center'
  },
  unbutton: {
    marginTop: 10,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  unbuttonText: {
    fontSize: 18,
    color: 'rgba(10,10,10,0.2)',
    alignSelf: 'center'
  }
});

export default ContinueButton;
