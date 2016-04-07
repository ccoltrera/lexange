'use strict';
import React, {
  StyleSheet,
  Text,
  View,
  Component,
  TextInput,
  TouchableHighlight,
  Modal,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';

import Cam from './Cam';
import Tutorial from './Tutorial';
// import Vocab from './Vocab';
import Dialogue from './Dialogue';
import ContinueButton from './ContinueButton';
import VocabForm from './VocabForm';

import SmartScrollView from 'react-native-smart-scroll-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Vocab extends Component {
  constructor(props) {
    super(props);

    this.template = this.props._readTemplate();
    this.state = {
      continue: false,
      showCam: false,
      _setImage: undefined
    };

    this._next = this._next.bind(this);
    this._toggleCam = this._toggleCam.bind(this);
    this._completenessCheck = this._completenessCheck.bind(this);

    this.teacherLang = decodeURIComponent(this.template.languages.teacher);
    this.studentLang = decodeURIComponent(this.template.languages.student);
  }

  _toggleCam(_setImage) {
    this.setState({
      _setImage: _setImage,
      showCam: !this.state.showCam
    });
  }

  _next() {
    if (this.props.type === 'people' && this.template.places.length > 0) {
      this.props.toRoute({
        name: 'Locations',
        component: Vocab,
        passProps: {
          type: 'places',
          showTutorial: this.props.showTutorial,
          _readTemplate: this.props._readTemplate,
          _updateTemplate: this.props._updateTemplate
        },
        headerStyle: styles.headerShadow
      });
    }

    else if ( (this.props.type === 'people' || this.props.type === 'places' ) && this.template.items.length > 0) {
      this.props.toRoute({
        name: 'Items',
        component: Vocab,
        passProps: {
          type: 'items',
          showTutorial: this.props.showTutorial,
          _readTemplate: this.props._readTemplate,
          _updateTemplate: this.props._updateTemplate
        },
        headerStyle: styles.headerShadow
      });
    }

    else {
      this.props.toRoute({
        name: 'Dialogue',
        component: Dialogue,
        passProps: {
          showTutorial: this.props.showTutorial,
          _readTemplate: this.props._readTemplate,
          _updateTemplate: this.props._updateTemplate
        },
        headerStyle: styles.headerShadow
      });
    }
  }

  _completenessCheck() {

    this.template = this.props._readTemplate();

    for (let i = 0; i < this.template[this.props.type].length; i++) {
      if (!this.template[this.props.type][i].pictureUri) {
        var nextUp = 'pictureUri' + i;
        // console.log(nextUp);
        this.setState({
          nextUp: nextUp,
          continue: false
        });
        return;
      }
      if (this.props.type === 'people' && !this.template[this.props.type][i].name) {
        var nextUp = 'name' + i;
        this.setState({
          nextUp: nextUp,
          continue: false
        });
        return;
      }
      if (!this.template[this.props.type][i].desc) {
        var nextUp = 'desc' + i;
        this.setState({
          nextUp: nextUp,
          continue: false
        });
        return;
      }
      if (!this.template[this.props.type][i].descTrans) {
        var nextUp = 'descTrans' + i;
        this.setState({
          nextUp: nextUp,
          continue: false
        });
        return;
      }
    }

    this.setState({
      nextUp: '',
      continue: true
    });
  }

  componentDidMount() {
    this._completenessCheck();
  }

  render() {
    var descriptor = '';

    switch (this.props.type) {
      case 'people':
        descriptor = 'Character';
        break;
      case 'items':
        descriptor = 'Item';
        break;
      case 'places':
        descriptor = 'Location';
        break;
    }

    var {height, width} = Dimensions.get('window');
    var height = height - 64;

    var vocab = [];
    for (let i = 0; i < this.template[this.props.type].length; i++) {
      vocab.push(
        <VocabForm
          key={'vocab' + i}
          num={i}
          type={this.props.type}
          nextUp={this.state.nextUp}
          _updateTemplate={this.props._updateTemplate}
          _readTemplate={this.props._readTemplate}
          _completenessCheck={this._completenessCheck}
          _toggleCam={this._toggleCam} />
      )
    }

    var tutorialText = (
      <View >
        {
          this.props.showTutorial ? (
            <Text style={[styles.tutorialText, {marginBottom:15}]}>
              Lexchange lessons are stories, and stories have characters.
            </Text>
          ) : (
            null
          )
        }
        <Text style={styles.tutorialText}>
          Complete {descriptor === 'Person' ? 'characters' : descriptor.toLowerCase() + 's'} with:
        </Text>
        <Text style={[styles.tutorialText, {marginLeft: 10}]}>
          1) a picture
        </Text>
        <Text style={[styles.tutorialText, {marginLeft: 10}]}>
          2) a name in {this.teacherLang}
        </Text>
        {(this.props.type === 'people') ? (<Text style={[styles.tutorialText, {marginLeft: 10}]}>
          3) a role in {this.teacherLang} (ex. a teacher, a friend)
        </Text>) : (null)}
        <Text style={[styles.tutorialText, {marginLeft: 10, marginBottom: 15}]}>
          4) a translation of the {(this.props.type === 'people') ? ('role') : ('name')} in {this.studentLang}
        </Text>
      </View>
    )

    return (
      <View style={styles.container}>
        <Modal
          animated={true}
          transparent={true}
          visible={this.state.showCam}>
          <Cam
            _setImage={this.state._setImage}
            _removeImage={this._removeImage}
            _toggleCam={this._toggleCam} />
        </Modal>
        <View style={{height: height}}>
          <KeyboardAwareScrollView
            style={styles.scrollView}>
            {vocab}
            <View style={styles.padder}></View>
          </KeyboardAwareScrollView>
        </View>
        <Tutorial
          header={this.props.type === 'people' ? 'Step 3: The Characters' : null}
          tutorialText={tutorialText}
          showTutorial={this.props.showTutorial} />
        <ContinueButton
          enabled={
            // this.state.continue
            true
          }
          label='Dialogue'
          _next={this._next}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C6DCDF',
  },
  scrollView: {
    paddingTop: 5,
    // marginBottom: 70,
  },
  padder: {
    height: 120
  },
  headerShadow: {
    backgroundColor: '#169FAD',
    marginLeft: -2,
    marginRight: -2,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  tutorialText: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '300',
    color: '#414141',
    fontFamily: 'System',
    backgroundColor: 'transparent'
  },
});

export default Vocab;
