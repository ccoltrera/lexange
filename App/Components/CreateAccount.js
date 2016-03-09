'use strict';
import React, {
  Component,
  View,
  StyleSheet,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.container}>
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

export default CreateAccount;
