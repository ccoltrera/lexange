'use strict';
import React, {
  Component,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from 'react-native';

import { ListView } from 'realm/react-native';
import realm from '../Utils/database';

import templateFuncs from '../Utils/template';
import Languages from './Languages';
import Tutorial from './Tutorial';
import ContinueButton from './ContinueButton';
import TemplateRow from './TemplateRow';

class Templates extends Component {
  constructor(props) {
    super(props);

    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    // If this is the tutorial, only the tutorial template is shown
    var lessonTemplates = this.props.tutorial ? (
      realm.objects('LessonTemplate').filtered('name = "Greeting a Friend (Morning)"')
    ) : (
      realm.objects('LessonTemplate')
    )

    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(this._sortIntoSections(lessonTemplates))
    };

    this._goLanguages = this._goLanguages.bind(this);
  }

  // Sorts the lesson templates by language level
  _sortIntoSections(lessonTemplates) {

    var lessonsInSections = {};

    for (let i=0; i<lessonTemplates.length; i++) {
      let lessonLevel = lessonTemplates[i]['level'];
      if (lessonsInSections[lessonLevel]) {
        lessonsInSections[lessonLevel].push(lessonTemplates[i])
      } else {
        lessonsInSections[lessonLevel] = [lessonTemplates[i]]
      }
    }

    return lessonsInSections
  }

  _goLanguages(rowData) {
    templateFuncs._setTemplate(rowData);

    this.props.toRoute({
      name: 'Languages',
      component: Languages,
      passProps: {
        showTutorial: this.props.tutorial,
        _readTemplate: templateFuncs._readTemplate,
        _updateTemplate: templateFuncs._updateTemplate
      },
      headerStyle: styles.headerShadow
    });
  }

  _filterPane() {

  }

  render() {
    var {height, width} = Dimensions.get('window');
    height = height - 64;

    var tutorialText = (
      <View >
        <Text style={styles.tutorialText}>
          Our templates give you outlines for stories and dialogues — you add pictures, phrases, and audio.{'\n'}
        </Text>
        <Text style={styles.tutorialText}>
          Later this screen will be full of templates. You can even make your own! For your first lesson, though, we chose a simple template.
        </Text>
      </View>
    )

    // Show tips card if this is the tutorial, otherwise don't
    var tutorialCard = this.props.tutorial ? (
      <Tutorial
          tutorialText={tutorialText}
          showTutorial={this.props.tutorial} />
    ) : (
      null
    )

    return(
      <View>
        <ListView
          style={[styles.list, {height: height}]}
          dataSource={this.state.dataSource}
          renderSectionHeader={(sectionData, sectionID) => {
            return (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>{sectionID.toUpperCase()}</Text>
              </View>
            )
          }}
          renderRow={(rowData, sectionID, rowID) => {
            // var rowText = this.state.

            return(
              <TemplateRow
                _goLanguages={this._goLanguages}
                rowData={rowData}
                sectionID={sectionID}
                rowID={rowID}
               />
            )
          }}
        />
        {tutorialCard}
        <ContinueButton
          enabled={
            this.props.tutorial ? false : true
          }
          label='Filter Templates'
          _next={this._filterPane}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  list: {
    backgroundColor: '#C6DCDF',
  },
  section: {
    // marginTop: 5,
    padding: 3,
    // backgroundColor: 'rgba(22,159,173,1)',
    // backgroundColor: '#C6DCDF',
    backgroundColor: '#FFF',
    borderColor: '#CCC',

    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  sectionLabel: {
    marginLeft: 2,
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 14,
    color: 'rgba(22,159,173,1)'
    // color: '#FFF'
  },

})

export default Templates;
