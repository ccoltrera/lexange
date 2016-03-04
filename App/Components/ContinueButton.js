'use strict';
import React, {
  TouchableHighlight,
  Text,
  Component,
  StyleSheet,
  View
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
      <View style={styles.backup}>
        <TouchableHighlight
          style={buttonStyle}
          underlayColor='white'
          onPress={_next}
          >
          <Text style={textStyle}>{this.props.label} <Icon name='caret-right' /></Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: 'rgba(22,159,173,1)',
    borderColor: 'rgba(22,159,173,0)',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    alignSelf: 'center'
  },
  unbutton: {
    height: 40,
    backgroundColor: 'rgba(22,159,173,0.4)',
    borderColor: 'rgba(22,159,173,0)',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  unbuttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    alignSelf: 'center'
  },
  backup: {
    margin: 26,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default ContinueButton;
