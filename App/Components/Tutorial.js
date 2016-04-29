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
import Overlay from 'react-native-overlay';

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
    var modalHeight = height - 64;
    var tabWidth = width //- 50;

    var cardPosition = this.props.low ? (
      this.state.showThisTutorial ? (
        {
          position: 'absolute',
          bottom: -25
        }
      ) : (
        {
          position: 'absolute',
          top: modalHeight - 47,
        }
      )
    ) : (
      this.state.showThisTutorial ? (
        {
          position: 'absolute',
          bottom: 40
        }
      ) : (
        {
          position: 'absolute',
          top: modalHeight - 117,
          backgroundColor: 'rgba(255,255,255,0.7)',
          borderColor: 'rgba(22,159,173,0.5)',
          shadowOpacity: 0
        }
      )
    )


    var cardStyles = this.state.firstTutorial ? (
      [styles.tutorialTab, {
        paddingTop: 15,
        alignSelf: 'center',
        width: tabWidth,
        paddingBottom: 12,
      }]
    ) : (
      [styles.tutorialTab, {
        // paddingTop: 10,
        // left: 25,
        width: tabWidth,
        paddingBottom: 40,
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
          height: 2,
          width: 0,
        },
      }, cardPosition]
    )

    var header = this.props.header ? (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', width: width}}>
        <Text style={styles.tabText}>{this.props.header} </Text>
        <Icon
          style={styles.chevron}
          name={this.state.showThisTutorial || this.state.firstTutorial ? 'times' : 'info-circle' } />
      </View>
    ): (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', width: width}}>
        <Text style={styles.tabText}>TIPS </Text>
        <Icon
          style={styles.chevron}
          name={this.state.showThisTutorial || this.state.firstTutorial ? 'times' : 'info-circle' } />
      </View>
    )

    var tutorialCard = (
        <View style={cardStyles} >
          {/* <View style={styles.cardColor}></View> */}
          {header}
          {this.props.tutorialText}
        </View>
    );

    var tutorial = this.state.firstTutorial ? (
      <Overlay isVisible={true}>
        <TouchableHighlight
          onPress={this._toggleTutorial}
          underlayColor='transparent'
          style={[styles.tutorialModal, {width: width, height: modalHeight} ]}>
          {tutorialCard}
        </TouchableHighlight>
      </Overlay>
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
  tutorialModal: {
    position: 'absolute',
    top: 64,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 80
  },
  tutorialTab: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: 'rgba(22,159,173,0.8)',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    // borderRadius: 20,
    flexDirection: 'column',
  },
  tabText: {
    fontSize: 20,
    color: '#169FAD',
    fontFamily: 'System',
    fontWeight: '700',
    backgroundColor: 'transparent',
    marginBottom: 15
  },
  cardColor: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(240,183,103,0.25)',
    borderRadius: 20
  },
  chevron: {
    position: 'absolute',
    right: 20,
    fontSize: 22,
    color: '#169FAD',
    backgroundColor: 'transparent'
  }
});

export default Tutorial;
