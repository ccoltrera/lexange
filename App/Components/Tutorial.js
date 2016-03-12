'use strict';
import React, {
  Component,
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  Dimensions,
  LayoutAnimation,
  TouchableWithoutFeedback
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class Tutorial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstTutorial: this.props.showTutorial,
      showThisTutorial: false,

    }

    this._toggleTutorial = this._toggleTutorial.bind(this);
  }

  _toggleTutorial() {

    var stateUpdate = this.state.firstTutorial ? (
      {firstTutorial: false}
    ) : (
      {showThisTutorial: !this.state.showThisTutorial}
    )

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState(stateUpdate)
  }

  render() {
    var {height, width} = Dimensions.get('window');
    var height = height - 134;

    var tutorialShowTop;

    var tutorial = this.state.firstTutorial ? (
      <View style={[styles.tutorialModal, {width: width, height: height} ]}>
        <View style={styles.tutorialPopup}>
          {this.props.tutorialText}
          <TouchableHighlight
            style={[styles.closeTutButton, {marginBottom: 5}]}
            onPress={this._toggleTutorial}
            underlayColor='#FFFFFF'
            >
            <View style={{flexDirection: 'row'}}>
              <Icon name='times-circle-o' style={styles.closeTutIcon} />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    ) : (
      <TouchableWithoutFeedback
          onPress={this._toggleTutorial}>
        <View
          style={[styles.tutorialTab,
            {
              top: this.state.showThisTutorial ? ( null ) : ( height - 40 ),
              bottom: this.state.showThisTutorial ? ( 40 ) : (null),
              left: 15,
              width: width - 30,
              flexDirection: 'column',
            }
          ]} >
          <View>
            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
              <Text style={styles.tabText}>TIPS </Text>
              <Icon
                style={styles.chevron}
                name={this.state.showThisTutorial ? 'chevron-down' : 'chevron-up' } />
            </View>
          {this.props.tutorialText}
          </View>
        </View>
      </TouchableWithoutFeedback>
    )

    return tutorial;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  tutorialModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  tutorialPopup: {
    margin: 15,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderRadius: 10,
    borderColor: '#C8C7CC'
  },
  closeTutButton: {
    alignSelf: 'flex-end',
    borderRadius: 15,
    marginTop: -5,
    marginRight: -3
  },
  closeTutIcon: {
    color: '#606060',
    fontSize: 30,
    borderRadius: 15,
    marginBottom: -25,
    marginRight: -14.5
  },
  tutorialTab: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C8C7CC',
    paddingTop: 7.5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 40,
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  tabText: {
    fontSize: 20,
    color: '#169FAD',
    fontWeight: '700'
  },
  chevron: {
    fontSize: 22,
    color: '#169FAD',
    marginBottom: 15,
  }
});

export default Tutorial;
