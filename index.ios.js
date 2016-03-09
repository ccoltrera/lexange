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
        />
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#169FAD'
  }
});

AppRegistry.registerComponent('lexchange', () => lexchange);
