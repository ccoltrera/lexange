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
    this.props.navigator.push({
      title: 'People',
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
        <Text>Language You Are Teaching:</Text>
        <TextInput
          autoCorrect={false}
          returnKeyType='done'
          style={styles.textInput}
          value={this.state.teacher}
          onChange={this._handleChangeTeacher}
          placeholder='Your language'
          />
        <Text>Language Your Students Speak:</Text>
        <TextInput
          autoCorrect={false}
          returnKeyType='done'
          style={styles.textInput}
          value={this.state.student}
          onChange={this._handleChangeStudent}
          placeholder="Student's language"
          />
        <ContinueButton
          enabled={ (this.state.teacher && this.state.student) }
          label='Dialogue'
          _next={this._next}
        />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 65,
    flexDirection: 'column',
    backgroundColor: '#48BBEC'
  },
  textInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    color: '#FFFFFF'
  },
  button: {
    height: 40,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center'
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'column'
  },
});

export default Languages;
