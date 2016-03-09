'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';

import Languages from './Languages';
import ContinueButton from './ContinueButton';

class NewTeacher extends Component {
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
        <ContinueButton
          enabled={
            // (this.state.teacher && this.state.student)
            true
          }
          label='Make Your First Lesson!'
          _next={this._next}
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
    paddingTop: 10
  },
});

export default NewTeacher;
