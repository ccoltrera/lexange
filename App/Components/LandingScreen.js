'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Text
} from 'react-native';

import FoundationIcon from 'react-native-vector-icons/Foundation';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import NewTeacher from './NewTeacher';

class LandingScreen extends Component {
  constructor(props) {
    super(props);

    this._newTeacher = this._newTeacher.bind(this);
  }

  _newTeacher() {
    this.props.toRoute({
      name: 'Welcome',
      component: NewTeacher,
      headerStyle: styles.headerShadow
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
            style={[styles.bigButton, {width: 270}]}
            underlayColor='#FDFDF1'>
            <View style={styles.bbBlock}>
              <View style={styles.row}>
                <View style={styles.bbIconWrapper}>
                  <FoundationIcon name='clipboard-pencil' style={styles.bBIcon}/>
                </View>
                <View style={styles.bbIconWrapper}>
                  <FAIcon name='graduation-cap' style={styles.bBIcon}/>
                </View>
              </View>
              <Text style={styles.bBText}>Returning User</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.row}>
          <TouchableHighlight
            style={styles.bigButton}
            onPress={this._newTeacher}
            underlayColor='#FDFDF1'>
            <View style={styles.bBBlock}>
              <View style={styles.bbIconWrapper}>
                <FoundationIcon name='clipboard-pencil' style={[styles.bBIcon, {marginLeft: 5}]}/>
              </View>
              <Text style={styles.bBText}>New Teacher</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.bigButton}
            underlayColor='#FDFDF1'>
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
    backgroundColor: '#169FAD',
  },
  headerShadow: {
    backgroundColor: '#169FAD',
    marginLeft: -2,
    marginRight: -2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  logo: {
    height: (86 * 1.25),
    width: (216 * 1.25),
    marginTop: 50,
    marginBottom: 70
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bigButton: {
    // backgroundColor: '#FDFDF1',
    margin: 5,
    padding: 15,
    borderWidth: 2,
    borderRadius: 26,
    borderColor: '#FDFDF1',
    // shadowColor: '#000000',
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 2,
    //   width: 0
    // }
  },
  bbIconWrapper: {
    alignSelf: 'center',
    height: 40,
    width: 60,
    marginBottom: 5
  },
  bBBlock: {
    flexDirection: 'column'
  },
  bBIcon: {
    alignSelf: 'center',
    color: '#FDFDF1',
    fontSize: 40
  },
  bBText: {
    color: '#FDFDF1',
    fontFamily: 'System',
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: '500',
  },
});

export default LandingScreen;
