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
        <View style={styles.chevronWrapper}>
          <Icon name='chevron-circle-left' style={styles.chevron} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingTop: 2,
    paddingBottom: 0,
    borderWidth: 0,
    borderRadius: 10,
    borderColor: '#FFFFFF'
  },
  chevronWrapper: {
    // marginTop: 2,
    // marginRight: 1,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '300',
    alignSelf: 'center'
  },
  chevron: {
    fontSize: 35,
    color: '#FFFFFF'
  }
})

export default BackButton;
