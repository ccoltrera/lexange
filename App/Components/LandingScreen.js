'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Text
} from 'react-native';

import Languages from './Languages';
import ContinueButton from './ContinueButton';

import FoundationIcon from 'react-native-vector-icons/Foundation';
import FAIcon from 'react-native-vector-icons/FontAwesome';

class LandingScreen extends Component {
  constructor(props) {
    super(props);

    this._newTeacher = this._newTeacher.bind(this);
  }

  _newTeacher() {
    this.props.toRoute({
      name: 'Languages',
      component: Languages,
      passProps: {
        _readTemplate: this.props._readTemplate,
        _updateTemplate: this.props._updateTemplate
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Image style={styles.logo} source={require('../../Images/lexchange-logo.png')} />
        </View>
        <View style={styles.row}>
          <TouchableHighlight
            style={[styles.bigButton, {width: 237}]}
            underlayColor='#FFFFFF'>
            <View style={styles.bbBlock}>
              <View style={styles.row}>
                <View style={styles.bbIconWrapper}>
                  <FoundationIcon name='clipboard-pencil' style={styles.bBIcon}/>
                </View>
                <View style={styles.bbIconWrapper}>
                  <FAIcon name='graduation-cap' style={styles.bBIcon}/>
                </View>
              </View>
              <Text style={styles.bBText}>Returning Users</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.row}>
          <TouchableHighlight
            style={styles.bigButton}
            onPress={this._newTeacher}
            underlayColor='#FFFFFF'>
            <View style={styles.bBBlock}>
              <View style={styles.bbIconWrapper}>
                <FoundationIcon name='clipboard-pencil' style={styles.bBIcon}/>
              </View>
              <Text style={styles.bBText}>New Teacher</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.bigButton}
            underlayColor='#FFFFFF'>
            <View style={styles.bBBlock}>
              <View style={styles.bbIconWrapper}>
                <FAIcon name='graduation-cap' style={styles.bBIcon}/>
              </View>
              <Text style={styles.bBText}>New Student</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#169FAD',
  },
  logo: {
    height: (86 * 1.25),
    width: (216 * 1.25),
    marginTop: 80,
    marginBottom: 70
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bigButton: {
    backgroundColor: '#FDFDF1',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FFFFFF'
  },
  bbIconWrapper: {
    alignSelf: 'center',
    height: 40,
    width: 60,
    marginBottom: 10
  },
  bBBlock: {
    flexDirection: 'column'
  },
  bBIcon: {
    alignSelf: 'center',
    color: '#169FAD',
    fontSize: 40
  },
  bBText: {
    color: '#169FAD',
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '500',
  },
  longButton: {
    marginTop: 60,
    marginBottom: 40,
    backgroundColor: '#FDFDF1',
    height: 40,
    width: 237,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
  },
  lbBlock: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  lBText: {
    color: '#169FAD',
    fontWeight: '500',
    fontSize: 18,
    alignSelf: 'center',
    marginLeft: 10
  },
  lBIcon: {
    marginRight: 3,
    color: '#169FAD',
    fontSize: 22,
    marginTop: 3,
  }
})

export default LandingScreen;
