'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Dimensions
} from 'react-native';

import Templates from './Templates';
import ContinueButton from './ContinueButton';
import Finished from './Finished';

import template from '../Utils/template';
var exampleLesson = template.exampleLesson;

class NewTeacher extends Component {
  constructor(props) {
    super(props);

    this._next = this._next.bind(this);
  }

  _next() {
    this.props.toRoute({
      name: 'Example Lesson',
      component: Finished,
      headerStyle: styles.headerShadow,
      passProps: {
        exampleLesson: exampleLesson,
        showTutorial: true
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentArea}>
          <ScrollView
            style={styles.scrollView}
            showVerticalScrollIndicator={true}>
            <View style={styles.card}>
              <View style={styles.labelBlock}>
                {/*<Text style={[styles.labelText, {marginBottom: 10}]}>
                  The best language lessons show language in context — as stories.
                </Text>*/}
                <Text style={styles.labelText}>
                  With just a few steps, you can teach your language in context — as stories.
                </Text>
              </View>
              <View style={styles.one}>
                <View style={styles.path}>
                  <View style={styles.unCircle}>
                    <Text style={styles.stepNumber}>1</Text>
                  </View>
                  <View style={styles.line}>
                  </View>
                  <View style={styles.unCircle}>
                    <Text style={styles.stepNumber}>2</Text>
                  </View>
                  <View style={styles.line}>
                  </View>
                  <View style={styles.unCircle}>
                    <Text style={styles.stepNumber}>3</Text>
                  </View>
                  <View style={styles.line}>
                  </View>
                  <View style={styles.unCircle}>
                    <Text style={styles.stepNumber}>4</Text>
                  </View>
                  <View style={styles.line}>
                  </View>
                  <View style={styles.unCircle}>
                    <Text style={styles.stepNumber}>5</Text>
                  </View>
                </View>
                <View style={styles.third}>
                  <View style={[styles.descBlock, {marginTop: 8}]}>
                    <Text style={styles.sectionDesc}>Choose a <Text style={styles.sectionName}>template</Text></Text>
                  </View>
                  <View style={styles.descBlock}>
                    <Text style={styles.sectionDesc}>Tell us the <Text style={styles.sectionName}>languages</Text></Text>
                  </View>
                  <View style={styles.descBlock}>
                    <Text style={styles.sectionDesc}>Add <Text style={styles.sectionName}>characters</Text>, <Text style={styles.sectionName}>places</Text>, and <Text style={styles.sectionName}>items</Text></Text>
                  </View>
                  <View style={styles.descBlock}>
                    <Text style={styles.sectionDesc}>Give the characters <Text style={styles.sectionName}>dialogue</Text></Text>
                  </View>
                  <View style={styles.descBlock}>
                    <Text style={styles.sectionDesc}>Share what you <Text style={styles.sectionName}>finished</Text>!</Text>
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.labelText}>Skip Tutorial</Text>
          </ScrollView>
        </View>
        <ContinueButton
          enabled={
            // (this.state.teacher && this.state.student)
            true
          }
          label="See What You'll Be Making"
          _next={this._next}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerShadow: {
    backgroundColor: '#169FAD',
    marginLeft: -2,
    marginRight: -2,
    // shadowColor: '#000000',
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 2,
    //   width: 0,
    // },
  },
  container: {
    flex: 1,
    backgroundColor: '#C6DCDF',
  },
  contentArea: {
    height: Dimensions.get('window').height - 134,
    justifyContent: 'center'
  },
  scrollView: {
    paddingTop: 15,
    paddingBottom: 40
  },
  one: {
    marginBottom: -60
  },
  path: {
    position: 'absolute',
    top: 0,
    left: 21
  },
  third: {
    flex: 3,
    marginLeft: 75,
    flexDirection: 'column',
  },
  unCircle: {
    height: 36,
    width: 36,
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(22,159,173,1)',
    borderWidth: 5,
    borderRadius: 18,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  line: {
    margin: -5,
    height: 50,
    width: 5,
    backgroundColor: 'rgba(22,159,173,1)',
    alignSelf: 'center',
    borderWidth: 0,
    borderColor: 'rgba(22,159,173,1)'
  },
  labelBlock: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
  },
  labelText: {
    marginLeft: 5,
    marginRight: 5,
    fontFamily: 'System',
    fontWeight: '700',
    color: 'rgba(22,159,173,1)',
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 5,
    textAlign: 'center',
  },
  sectionName: {
    alignSelf: 'flex-start',
    fontWeight: '700',
    fontFamily: 'System',
    fontSize: 16,
    color: 'rgba(22,159,173,1)'
  },
  sectionDesc: {
    alignSelf: 'flex-start',
    fontFamily: 'System',
    fontWeight: '300',
    color: '#414141',
    fontSize: 16
  },
  descBlock: {
    marginBottom: 56.75
  },
  card: {
    marginTop: 5,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 15,
    paddingBottom: 35,
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
  stepNumber: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: 'System',
    fontWeight: '700',
    color: 'rgba(22,159,173,1)',
    fontSize: 16,
  }
});

export default NewTeacher;
