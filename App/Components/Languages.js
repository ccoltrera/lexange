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
import Tutorial from './Tutorial';

class Languages extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();

    this.state = {
      continue: false,
      teacher: decodeURIComponent(this.template.languages.teacher),
      student: decodeURIComponent(this.template.languages.student)
    }

    this._next = this._next.bind(this);
    this._completenessCheck = this._completenessCheck.bind(this);
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

  _completenessCheck() {

    this.template = this.props._readTemplate();

    if (!this.template.languages.teacher) {
      var nextUp = 'teacher';
      this.setState({
        nextUp: nextUp,
        continue: false
      });
      return;
    }
    if (!this.template.languages.student) {
      var nextUp = 'student';
      this.setState({
        nextUp: nextUp,
        continue: false
      });
      return;
    }

    this.setState({
      nextUp: '',
      continue: true
    });
  }

  componentDidMount() {
    this._completenessCheck();
  }

  render() {
    var tutorialText = (
      <View >
        <Text style={styles.tutorialText}>
          This will be used for prompts, and to help you and your students organize lessons.
        </Text>
      </View>
    )

    var nextStyle = {};
    var nextBorder = {borderWidth: 2, borderColor: '#F02B1F'}

    switch(this.state.nextUp) {
      case 'teacher':
        nextStyle.teacher = nextBorder;
        break;
      case 'student':
        nextStyle.student = nextBorder;
        break;
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentArea}>
          <View style={styles.card}>
            <Text style={styles.labelText}>{'Language you are teaching'}</Text>
            <TextInput
              autoCorrect={false}
              returnKeyType='done'
              style={[styles.textInput, nextStyle.teacher]}
              value={this.state.teacher}
              onChange={this._handleChangeTeacher}
              placeholder='Your language'
              />

            <Text style={styles.labelText}>{'Language your students speak'}</Text>
            <TextInput
              autoCorrect={false}
              returnKeyType='done'
              style={[styles.textInput, nextStyle.student]}
              value={this.state.student}
              onChange={this._handleChangeStudent}
              placeholder="Student's language"
              />
          </View>
        </ScrollView>
        <Tutorial
          header='Step 2: The Languages'
          tutorialText={tutorialText}
          showTutorial={this.props.showTutorial} />
        <ContinueButton
          enabled={
            // this.state.continue
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
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  container: {
    flex: 1,
    backgroundColor: '#C6DCDF',
  },
  contentArea: {
    height: Dimensions.get('window').height - 134,
    // justifyContent: 'center'
  },
  labelText: {
    fontFamily: 'System',
    fontWeight: 'bold',
    color: 'rgba(22,159,173,1)',
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
    shadowOpacity: 0.2,
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
    color: '#414141',
  },
  tutorialText: {
    marginBottom: 15,
    fontSize: 16,
    fontWeight: '300',
    backgroundColor: 'transparent',
    fontFamily: 'System'
  },
});

export default Languages;
