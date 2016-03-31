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
      <View style={styles.container}>
        <Text style={styles.signup}>
          Great Job! To make more lessons, just make an account.
        </Text>
        {signupButtons}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C6DCDF',
    justifyContent: 'center'
  },
  signup: {
    marginTop: -60,
    marginLeft: 18,
    marginRight: 18,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center'
  }
});

export default CreateAccount;
