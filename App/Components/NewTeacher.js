'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
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
        _readTemplate: templateFuncs._readTemplate,
        _updateTemplate: templateFuncs._updateTemplate
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.labelText}>Make your first lesson in just a few steps!</Text>
        <View style={styles.one}>
          {/*<View style={styles.third}>
            <View style={styles.left}>
              <Text style={styles.leftText}></Text>
            </View>
          </View>*/}
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
              <Text style={styles.sectionName}>Languages</Text>
            </View>
            <View style={styles.descBlock}>
              <Text style={styles.sectionDesc}>Enrich the lesson with </Text>
              <Text style={styles.sectionName}>People</Text>
            </View>
            <View style={styles.descBlock}>
              <Text style={styles.sectionDesc}>Write and record the </Text>
              <Text style={styles.sectionName}>Dialogue</Text>
            </View>
            <View style={styles.descBlock}>
              <Text style={styles.sectionDesc}>Be proud of what you </Text>
              <Text style={styles.sectionName}>Finished</Text>
              <Text style={styles.sectionDesc}>!</Text>
            </View>
          </View>
        </View>
        <ContinueButton
          enabled={
            // (this.state.teacher && this.state.student)
            true
          }
          label='Start Making Your Lesson'
          _next={this._goLanguages}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FDFDF1',
  },
  one: {
    flexDirection: 'row',
    marginBottom: -60
  },
  third: {
    flex: 3,
    flexDirection: 'column',
  },
  left: {

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
    height: 32,
    width: 32,
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(22,159,173,1)',
    // borderWidth: 10,
    borderRadius: 15,
    alignSelf: 'center'
  },
  unCircle: {
    height: 36,
    width: 36,
    backgroundColor: 'rgba(22,159,173,1)',
    // borderColor: '',
    // borderWidth: 10,
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
    borderWidth: 1,
    borderColor: 'rgba(22,159,173,1)'
  },
  labelText: {
    fontFamily: 'helvetica',
    fontWeight: '100',
    // color: '#169FAD',
    fontSize: 16,
    fontWeight: '200',
    alignSelf: 'center',
    margin: 30
  },
  sectionName: {
    alignSelf: 'flex-start',
    fontWeight: '700',
    fontSize: 16
  },
  sectionDesc: {
    alignSelf: 'flex-start',
    fontSize: 16
  },
  descBlock: {
    flexDirection: 'row',
    marginBottom: 87
  }
});

export default NewTeacher;
