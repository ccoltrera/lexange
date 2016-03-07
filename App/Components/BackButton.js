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
          <Icon name='chevron-left' style={styles.chevron} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 4.5,
    paddingLeft: 17,
    paddingRight: 20,
    paddingTop: 6,
    paddingBottom: 5,
    borderWidth: 1.5,
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
    fontSize: 16,
    color: '#FFFFFF'
  }
})

export default BackButton;
