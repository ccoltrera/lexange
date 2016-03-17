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
    var modalHeight = height - 134;
    var tabWidth = width - 50;

    var cardPosition = this.state.showThisTutorial ? (
      { position: 'absolute',
        bottom: 40
      }
    ) : (
      {
        position: 'absolute',
        top: modalHeight - 40
      }
    )


    var cardStyles = this.state.firstTutorial ? (
      [styles.tutorialTab, {
        alignSelf: 'center',
        width: tabWidth,
        paddingBottom: 25,
      }]
    ) : (
      [styles.tutorialTab, cardPosition, {
        left: 25,
        width: tabWidth,
        paddingBottom: 40,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
          height: 2,
          width: 0,
        },
      }]
    )

    var tutorialCard = (
        <View style={cardStyles} >
          <View style={{flexDirection: 'row', justifyContent: 'center', alignSelf: 'center'}}>
            <Text style={styles.tabText}>TIPS </Text>
            <Icon
              style={styles.chevron}
              name={this.state.showThisTutorial || this.state.firstTutorial ? 'chevron-down' : 'chevron-up' } />
          </View>
          {this.props.tutorialText}
        </View>
    );

    var tutorial = this.state.firstTutorial ? (
      <TouchableHighlight
        onPress={this._toggleTutorial}
        underlayColor='transparent'
        style={[styles.tutorialModal, {width: width, height: modalHeight} ]}>
        {tutorialCard}
      </TouchableHighlight>
    ) : (
      <TouchableWithoutFeedback
          onPress={this._toggleTutorial}>
        {tutorialCard}
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
  tutorialTab: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C8C7CC',
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30,
    flexDirection: 'column',
  },
  tabText: {
    fontSize: 20,
    color: '#169FAD',
    fontFamily: 'System',
    fontWeight: '700'
  },
  chevron: {
    fontSize: 22,
    color: '#169FAD',
    marginTop: -0.5,
    marginBottom: 15,
  }
});

export default Tutorial;
