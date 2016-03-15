'use strict';
import React, {
  AppRegistry,
  Component,
  NavigatorIOS,
  View,
  StyleSheet
} from 'react-native';

import Router from 'react-native-simple-router';

import LandingScreen from './App/Components/LandingScreen';
import Languages from './App/Components/Languages';
import BackButton from './App/Components/BackButton';

import Dialogue from './App/Components/Dialogue';

import templateFuncs from './App/Utils/template';

class lexchange extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router
        headerStyle={styles.header}
        firstRoute={{
          component: LandingScreen
        }}
        backButtonComponent={BackButton}
        titleStyle={{fontSize: 20}}
        />
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#169FAD',
    marginLeft: -2,
    marginRight: -2
  }
});

AppRegistry.registerComponent('lexchange', () => lexchange);
