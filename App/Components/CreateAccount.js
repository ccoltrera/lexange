'use strict';
import React, {
  Component,
  View,
  StyleSheet,
  Text,
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

    console.log(signupButtons)

    return(
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.signup}>
            To share, just make an account!
          </Text>
        </View>
        {signupButtons}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FDFDF1',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  signup: {
    marginBottom: 30,
    fontSize: 18,
    fontWeight: '100'
  }
});

export default CreateAccount;
