'use strict';
import React, {
  Component,
  View,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';

import SignupButton from './SignupButton';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var socialNets = [
      {name: 'Facebook', color: '#3b5998'},
      {name: 'Google', color: '#db3236'},

    ];

    var signupButtons = socialNets.map((socialNet) => {
      return(
        <SignupButton
          key={socialNet.name + 'button'}
          socialNet={socialNet}
        />
      )
    });

    return(
      <ScrollView
        showVerticalScrollIndicator={true}
        style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.signup}>
            To share, just make an account!
          </Text>
        </View>
        {signupButtons}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDF1',
  },
  row: {
    marginTop: 120,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  signup: {
    marginBottom: 30,
    fontSize: 20,
    fontWeight: '400'
  }
});

export default CreateAccount;
