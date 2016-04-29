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

import ContinueButton from './ContinueButton';
import ExampleLesson from './ExampleLesson';

class NewTeacher extends Component {
  constructor(props) {
    super(props);

    this._next = this._next.bind(this);
  }

  _next() {
    this.props.toRoute({
      name: 'Example Lesson',
      component: ExampleLesson,
      headerStyle: styles.headerShadow,
      passProps: {
        showTutorial: true,
        role: 'student'
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
                <Text style={styles.labelText}>
                  Lexchange helps you learn languages that don't have textbooks.
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
                  {/*<View style={styles.line}>
                  </View>
                  <View style={styles.unCircle}>
                    <Text style={styles.stepNumber}>3</Text>
                  </View>*/}
                </View>
                <View style={styles.third}>
                  <View style={[styles.descBlock, {marginTop: 8}]}>
                    <Text style={styles.sectionDesc}>Get <Text style={styles.sectionName}>lessons</Text> from teachers</Text>
                  </View>
                  <View style={styles.descBlock}>
                    <Text style={[styles.sectionDesc, {marginBottom: 25}]}>Use <Text style={styles.sectionName}>study mode</Text> to learn vocab and phrases</Text>
                  </View>
                  {/*<View style={styles.descBlock}>
                    <Text style={styles.sectionDesc}>Capture vocab <Text style={styles.sectionName}>on-the-go</Text></Text>
                  </View>*/}
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
          label="What's A Lesson?"
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
    left: 11
  },
  third: {
    flex: 3,
    marginLeft: 65,
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
    height: 25,
    width: 1,
    backgroundColor: 'rgba(22,159,173,0)',
    alignSelf: 'center',
    borderWidth: 0,
    borderColor: 'rgba(22,159,173,0)'
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
    marginBottom: 31.75
  },
  card: {
    marginTop: 5,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
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