'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Vocab from './Vocab';
import ContinueButton from './ContinueButton';

import _handleChange from '../Utils/templateUtils';

class Languages extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();

    this.state = {
      teacher: decodeURIComponent(this.template.languages.teacher),
      student: decodeURIComponent(this.template.languages.student)
    }

    this._next = this._next.bind(this);
    this._handleChangeTeacher = _handleChange.bind(this, 'teacher', ['languages', 'teacher']);
    this._handleChangeStudent = _handleChange.bind(this, 'student', ['languages', 'student']);
  }

  _next() {
    this.props.toRoute({
      name: 'Characters',
      component: Vocab,
      passProps: {
        type: 'people',
        showTutorial: this.props.showTutorial,
        _readTemplate: this.props._readTemplate,
        _updateTemplate: this.props._updateTemplate
      },
      headerStyle: styles.headerShadow
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.contentArea}>
          <View style={styles.card}>
            <Text style={styles.labelText}>{'Language you are teaching'}</Text>
            <TextInput
              autoCorrect={false}
              returnKeyType='done'
              style={styles.textInput}
              value={this.state.teacher}
              onChange={this._handleChangeTeacher}
              placeholder='Your language'
              />

            <Text style={styles.labelText}>{'Language your students speak'}</Text>
            <TextInput
              autoCorrect={false}
              returnKeyType='done'
              style={styles.textInput}
              value={this.state.student}
              onChange={this._handleChangeStudent}
              placeholder="Student's language"
              />
          </View>
        </View>
        <ContinueButton
          enabled={
            // (this.state.teacher && this.state.student)
            true
          }
          label='Characters'
          _next={this._next}
        />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  headerShadow: {
    backgroundColor: '#169FAD',
    marginLeft: -2,
    marginRight: -2,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  container: {
    flex: 1,
    backgroundColor: '#FDFDF1',
  },
  contentArea: {
    height: Dimensions.get('window').height - 134,
    // justifyContent: 'center'
  },
  labelText: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 18,
    marginTop: 18,
    marginBottom: 15,
    // alignSelf: 'center'
  },
  card: {
    margin: 15,
    marginTop: 20,
    padding: 15,
    paddingTop: 0,
    paddingBottom: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  textInput: {
    height: 40,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 12,
    fontFamily: 'System',
    color: '#000000'
  }
});

export default Languages;
