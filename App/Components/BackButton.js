'use strict';

import React, {
  Text,
  StyleSheet,
  Component,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class BackButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={{marginTop: 3, marginRight: 2,marginLeft: 4}}>
          <Icon name='chevron-left' style={styles.chevron} />
        </View>
        <Text style={styles.buttonText}>
          Back
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '300',
    alignSelf: 'center'
  },
  chevron: {
    fontSize: 18,
    color: '#FFFFFF'
  }
})

export default BackButton;
