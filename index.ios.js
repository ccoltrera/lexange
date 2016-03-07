'use strict';
import React, {
  AppRegistry,
  Component,
  NavigatorIOS,
  View,
  StyleSheet
} from 'react-native';

import update from 'react-addons-update';
import Router from 'react-native-simple-router';

import LandingScreen from './App/Components/LandingScreen';
import Languages from './App/Components/Languages';
import BackButton from './App/Components/BackButton';

var template = {
  languages: {
    teacher: '',
    student: ''
  },
  characters: [
    {
      desc: 'Person on the street',
      descTrans: '',
      name: '',
      photoUri: ''
    },
  ],
  dialogue: [
    {
      character: 0,
      guide: 'Morning greeting',
      trans: '',
      audioUri: ''
    }
  ]
}

class lexchange extends Component {
  constructor(props) {
    super(props);
    this.state = template;

    this._updateTemplate = this._updateTemplate.bind(this);
  }

  _updateTemplate(updateQuery) {
    template = update(template, updateQuery);
    // console.log(template)
  }

  _readTemplate() {
    return template;
  }

  render() {
    return (
      <Router
        headerStyle={styles.header}
        firstRoute={{
          component: LandingScreen,
          passProps: {
            _readTemplate: this._readTemplate,
            _updateTemplate: this._updateTemplate
          }
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
