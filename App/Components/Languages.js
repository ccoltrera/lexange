'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import People from './People';
import ContinueButton from './ContinueButton';

import _handleChange from '../Utils/templateUtils';

class Languages extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();

    this.state = {
      teacher: this.template.languages.teacher,
      student: this.template.languages.student
    }

    this._next = this._next.bind(this);
    this._handleChangeTeacher = _handleChange.bind(this, 'teacher', ['languages', 'teacher']);
    this._handleChangeStudent = _handleChange.bind(this, 'student', ['languages', 'student']);
  }

  _next() {
    this.props.toRoute({
      name: 'People',
      component: People,
      passProps: {
        _readTemplate: this.props._readTemplate,
        _updateTemplate: this.props._updateTemplate
      }
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.labelText}>LANGUAGE YOU ARE TEACHING:</Text>
        <View style={styles.backBox}>
          <TextInput
            autoCorrect={false}
            returnKeyType='done'
            style={styles.textInput}
            value={this.state.teacher}
            onChange={this._handleChangeTeacher}
            placeholder='Your language'
            />
        </View>
        <Text style={styles.labelText}>LANGUAGE YOUR STUDENTS SPEAK:</Text>
        <View style={styles.backBox}>
          <TextInput
            autoCorrect={false}
            returnKeyType='done'
            style={styles.textInput}
            value={this.state.student}
            onChange={this._handleChangeStudent}
            placeholder="Student's language"
            />
        </View>
        <ContinueButton
          enabled={ /*(this.state.teacher && this.state.student)*/ true }
          label='People'
          _next={this._next}
        />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FDFDF1',
    paddingTop: 10
  },
  labelText: {
    fontFamily: 'helvetica',
    fontWeight: '100',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 16,
  },
  backBox: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 26,
    paddingRight: 26,
    borderWidth: 1,
    borderColor: '#C8C7CC'
  },
  textInput: {
    height: 30,
    paddingLeft: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
    color: '#000000'
  }
});

export default Languages;
