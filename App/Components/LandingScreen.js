'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import Languages from './Languages';
import ContinueButton from './ContinueButton';

class LandingScreen extends Component {
  constructor(props) {
    super(props);

    this._next = this._next.bind(this);
  }

  _next() {
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
          <Image source={require('../../Images/lexchange-logo.png')} />
        </View>
        <ContinueButton
          enabled={true}
          label='Make Your First Lesson'
          _next={this._next}
          style={styles.continueButton}
          />
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    flexDirection: 'column',
    backgroundColor: '#169FAD',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  continueButton: {
    backgroundColor: 'white'
  }
})

export default LandingScreen;
