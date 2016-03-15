'use strict';
import React, {
  AppRegistry,
  Component,
  NavigatorIOS,
  View,
  StyleSheet
} from 'react-native';

import Router from 'react-native-simple-router';
import BackButton from './App/Components/BackButton';

import LandingScreen from './App/Components/LandingScreen';

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
        titleStyle={styles.title}
        />
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#169FAD',
    marginLeft: -2,
    marginRight: -2
  },
  title: {
    fontSize: 20,
    fontFamily: 'System'
  }
});

AppRegistry.registerComponent('lexchange', () => lexchange);
