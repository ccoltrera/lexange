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

import Languages from './Languages';
import People from './People';
import Dialogue from './Dialogue';
import Finished from './Finished';
import ContinueButton from './ContinueButton';

import templateFuncs from '../Utils/template';

class NewTeacher extends Component {
  constructor(props) {
    super(props);

    this._goLanguages = this._goLanguages.bind(this);
  }

  _goLanguages() {
    this.props.toRoute({
      name: 'Languages',
      component: Languages,
      passProps: {
        showTutorial: true,
        _readTemplate: templateFuncs._readTemplate,
        _updateTemplate: templateFuncs._updateTemplate
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
              <View style={styles.labelBlock}>
                <Text style={styles.labelText}>With Lexchange's simple templates, </Text>
                <Text style={styles.labelText}>make rich lessons in just a few steps!</Text>
              </View>
              <View style={styles.one}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <TouchableHighlight
                    style={styles.outerCircle}
                    underlayColor='#169FAD'
                    onPress={this._goLanguages}>
                    <View style={styles.innerCircle}></View>
                  </TouchableHighlight>
                  <View style={styles.line}>
                  </View>
                  <View style={styles.unCircle}>
                  </View>
                  <View style={styles.line}>
                  </View>
                  <View style={styles.unCircle}>
                  </View>
                  <View style={styles.line}>
                  </View>
                  <View style={styles.unCircle}>
                  </View>
                </View>
                <View style={styles.third}>
                  <View style={[styles.descBlock, {marginTop: 14, marginBottom: 94}]}>
                    <Text style={styles.sectionDesc}>Tell us the </Text>
                    <Text style={styles.sectionName}>languages</Text>
                  </View>
                  <View style={styles.descBlock}>
                    <Text style={styles.sectionDesc}>Enrich the lesson with </Text>
                    <Text style={styles.sectionName}>characters</Text>
                  </View>
                  <View style={styles.descBlock}>
                    <Text style={styles.sectionDesc}>Give the characters </Text>
                    <Text style={styles.sectionName}>dialogue</Text>
                  </View>
                  <View style={styles.descBlock}>
                    <Text style={styles.sectionDesc}>Share what you </Text>
                    <Text style={styles.sectionName}>finished</Text>
                    <Text style={styles.sectionDesc}>!</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <ContinueButton
          enabled={
            // (this.state.teacher && this.state.student)
            true
          }
          label='Make Your First Lesson'
          _next={this._goLanguages}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDF1',

  },
  scrollView: {
    paddingTop: 15,
    paddingBottom: 40
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
  one: {
    flexDirection: 'row',
    marginBottom: -60
  },
  third: {
    flex: 3,
    marginLeft: -10,
    flexDirection: 'column',
  },
  outerCircle: {
    height: 50,
    width: 50,
    backgroundColor: 'rgba(22,159,173,1)',
    // borderColor: '',
    // borderWidth: 10,
    borderRadius: 25,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  innerCircle: {
    height: 40,
    width: 40,
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(22,159,173,1)',
    // borderWidth: 10,
    borderRadius: 20,
    alignSelf: 'center'
  },
  unCircle: {
    height: 36,
    width: 36,
    backgroundColor: '#FFFFFF',
    // backgroundColor: 'rgba(22,159,173,1)',
    borderColor: 'rgba(22,159,173,1)',
    borderWidth: 5,
    borderRadius: 18,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  line: {
    margin: -5,
    height: 80,
    width: 5,
    backgroundColor: 'rgba(22,159,173,1)',
    alignSelf: 'center',
    borderWidth: 0,
    borderColor: 'rgba(22,159,173,1)'
  },
  labelBlock: {

    marginTop: 10,
    marginLeft: -5,
    marginRight: -5,
    marginBottom: 10,
  },
  labelText: {
    fontFamily: 'helvetica',
    fontWeight: '700',
    color: 'rgba(22,159,173,1)',
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 5
  },
  sectionName: {
    alignSelf: 'flex-start',
    fontWeight: '700',
    fontSize: 16,
    color: 'rgba(22,159,173,1)'
  },
  sectionDesc: {
    alignSelf: 'flex-start',
    fontWeight: '300',
    fontSize: 16
  },
  descBlock: {
    flexDirection: 'row',
    marginBottom: 87
  },
  card: {
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  }
});

export default NewTeacher;
