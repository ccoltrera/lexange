'use strict';
import React, {
  Component,
  View,
  Text,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/Zocial';

class SignupButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.row}>
        <View style={[styles.socialButton,{backgroundColor: this.props.socialNet.color}]}>
          <View style={styles.iconBox}>
            <Icon name={this.props.socialNet.name.toLowerCase()} style={styles.socialIcon} />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.sBText}>Sign up with {this.props.socialNet.name}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  socialButton: {
    height: 40,
    width: 300,
    flexDirection: 'row',
    borderRadius: 5,
  },
  iconBox: {
    height: 40,
    width: 40,
    justifyContent: 'center'
  },
  socialIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10
  },
  textBox: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  sBText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8
  }
});

export default SignupButton;
