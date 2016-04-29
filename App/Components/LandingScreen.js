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
import Ionicons from 'react-native-vector-icons/Ionicons';

import NewTeacher from './NewTeacher';
import NewStudent from './NewStudent';

class LandingScreen extends Component {
  constructor(props) {
    super(props);

    this._newTeacher = this._newTeacher.bind(this);
    this._newStudent = this._newStudent.bind(this);
  }

  _newTeacher() {
    this.props.toRoute({
      name: 'Welcome',
      component: NewTeacher,
      headerStyle: styles.headerShadow
    });
  }

  _newStudent() {
    this.props.toRoute({
      name: 'Welcome',
      component: NewStudent,
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
            style={styles.bigButton}
            underlayColor='#C6DCDF'>
            <View>
                <Text style={styles.bBText}>Returning Users</Text>
                <Ionicons name='ios-people' style={[styles.bBIcon, {left: 188}]}/>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.row}>
          <TouchableHighlight
            style={styles.bigButton}
            onPress={this._newTeacher}
            underlayColor='#C6DCDF'>
            <View>
              <Text style={styles.bBText}>New Teachers</Text>
              <Ionicons name='clipboard' style={[styles.bBIcon, {left: 191}]}/>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.row}>
          <TouchableHighlight
            style={styles.bigButton}
            onPress={this._newStudent}
            underlayColor='#C6DCDF'>
            <View>
              <Text style={styles.bBText}>New Students</Text>
              <Ionicons name='university' style={[styles.bBIcon, {left: 187}]}/>
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
    shadowOpacity: 0.2,
  },
  logo: {
    height: (86 * 1.25),
    width: (216 * 1.25),
    marginTop: 50,
    marginBottom: 60
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bigButton: {
    // backgroundColor: '#FDFDF1',
    margin: 10,
    width: 130,
    padding: 2,
    borderWidth: 2,
    borderRadius: 22,
    borderColor: '#FDFDF1',
    width: 265,
    height: 60,
  },
  bBBlock: {
    flexDirection: 'column'
  },
  bBIcon: {
    position: 'absolute',
    left: 180,
    color: '#FDFDF1',
    fontSize: 40,
    margin: 5
  },
  bBText: {
    position: 'absolute',
    left: 10,
    color: '#FDFDF1',
    fontFamily: 'System',
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: '500',
    margin: 15,
  },
});

export default LandingScreen;
