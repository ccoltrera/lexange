'use strict';
import React, {
  AppRegistry,
  Component,
  Navigator,
  View,
  StyleSheet
} from 'react-native';

import Router from 'react-native-simple-router';
import BackButton from './App/Components/BackButton';

import LandingScreen from './App/Components/LandingScreen';

import Templates from './App/Components/Templates';

class lexchange extends Component {
  constructor(props) {
    super(props);
  }

  _configureScene() {
    var newConfig = Navigator.SceneConfigs.PushFromRight;
    newConfig.gestures.pop.edgeHitWidth = 50;
    return newConfig;
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
        configureScene={this._configureScene()}
        />
    );
    // return (
    //   <Router
    //     headerStyle={styles.header}
    //     firstRoute={{
    //       name: 'Templates',
    //       component: Templates,
    //       passProps: {
    //         tutorial: true
    //       },
    //     }}
    //     backButtonComponent={BackButton}
    //     titleStyle={styles.title}
    //     configureScene={this._configureScene()}
    //     />
    // );
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
