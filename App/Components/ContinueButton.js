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
      // <View style={styles.backup}>
        <TouchableHighlight
          style={buttonStyle}
          underlayColor='#028B99'
          onPress={_next}
          >
          <View style={styles.touchWrapper}>
            <Text style={textStyle}>{this.props.label} </Text>
            <View style={{marginLeft: 5, marginTop: 2}}>
              <Icon name='chevron-right' style={styles.chevron} />
            </View>
          </View>
        </TouchableHighlight>
      // </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 70,
    backgroundColor: 'rgba(22,159,173,1)',
    borderColor: 'rgba(22,159,173,0)',
    // borderWidth: 1,
    // borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'System',
    fontWeight: '700',
    alignSelf: 'center'
  },
  unbutton: {
    height: 70,
    backgroundColor: '#8DC4CA',
    borderColor: 'rgba(22,159,173,0)',
    // borderWidth: 1,
    // borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  unbuttonText: {
    fontSize: 20,
    color: '#FFFFFF',
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: '700'
  },
  backup: {
    margin: 15,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0)',
    // borderColor: '#FFFFFF',
    // borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  touchWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  chevron: {
    fontSize: 20,
    color: '#FFFFFF'
  }
});

export default ContinueButton;
