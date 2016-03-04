'use strict';
import React, {
  AppRegistry,
  Component,
  NavigatorIOS,
  View,
  StyleSheet
} from 'react-native';

import update from 'react-addons-update';

import Languages from './App/Components/Languages';
import Cam from './App/Components/Cam';

var template = {
  languages: {
    teacher: '',
    student: ''
  },
  characters: [
    {
      desc: 'Man on the street',
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
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Languages',
          component: Languages,
          passProps: {
            _readTemplate: this._readTemplate,
            _updateTemplate: this._updateTemplate
          }
        }} />
    );
  }
}

// class lexchange extends Component {
//   render() {
//     return (
//       <Cam />
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111'
  }
});

AppRegistry.registerComponent('lexchange', () => lexchange);
