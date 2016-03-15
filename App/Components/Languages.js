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
      name: 'Characters',
      component: People,
      passProps: {
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
        <View style={{height: Dimensions.get('window').height - 134}}>
          <ScrollView
            style={styles.scrollView}
            showVerticalScrollIndicator={true}>
            <View style={styles.card}>
              <Text style={styles.labelText}>{'Language you are teaching:'}</Text>
              <TextInput
                autoCorrect={false}
                returnKeyType='done'
                style={styles.textInput}
                value={this.state.teacher}
                onChange={this._handleChangeTeacher}
                placeholder='Your language'
                />
              </View>
            <View style={styles.card}>
              <Text style={styles.labelText}>{'Language your students speak:'}</Text>
              <TextInput
                autoCorrect={false}
                returnKeyType='done'
                style={styles.textInput}
                value={this.state.student}
                onChange={this._handleChangeStudent}
                placeholder="Student's language"
                />
            </View>
          </ScrollView>
        </View>
        <ContinueButton
          enabled={
            // (this.state.teacher && this.state.student)
            true
          }
          label='Next'
          _next={this._next}
        />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDF1',

  },
  scrollView: {
    paddingTop: 15,
    paddingBottom: 40,
  },
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
  labelText: {
    fontFamily: 'System',
    fontWeight: '300',
    fontSize: 18,
    marginBottom: 10,
  },
  card: {
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
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
    borderColor: '#C8C7CC',
    borderRadius: 18,
    fontFamily: 'System',
    color: '#000000'
  }
});

export default Languages;
