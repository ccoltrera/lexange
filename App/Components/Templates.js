'use strict';
import React, {
  Component,
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import { ListView } from 'realm/react-native';
import realm from '../Utils/database';

import Icon from 'react-native-vector-icons/FontAwesome';

import templateFuncs from '../Utils/template';
import Languages from './Languages';

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

  render() {
    return(
      <ListView
        style={styles.list}
        dataSource={this.state.dataSource}
        renderSectionHeader={(sectionData, sectionID) => {
          return (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>{sectionID.toUpperCase()}</Text>
            </View>
          )
        }}
        renderRow={(rowData) => {
          return(
            <TouchableHighlight
              onPress={this._goLanguages.bind(null, rowData)}
              style={styles.row}
              underlayColor='#FCFCFC'
              >
              <View >
                <View style={styles.rowTextBlock}>
                  <Text style={styles.templateLabel}>{rowData['name']}</Text>
                  <Text style={styles.templateText}>People: {rowData['people'].length}</Text>
                  <Text style={styles.templateText}>Places: {rowData['places'].length}</Text>
                  <Text style={styles.templateText}>Items: {rowData['items'].length}</Text>
                </View>
                <Icon name='chevron-right' style={styles.chevron} />
              </View>
            </TouchableHighlight>
          )
        }}
      />
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
    fontSize: 12,
    color: 'rgba(22,159,173,1)'
    // color: '#FFF'
  },
  row: {
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 5,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderColor: '#CCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  rowTextBlock: {
    // marginRight:
  },
  templateLabel: {
    fontWeight: '700',
    fontFamily: 'System',
    fontSize: 16,
    color: 'rgba(22,159,173,1)'
  },
  templateText: {
    // marginLeft: 10,
    fontFamily: 'System',
    fontSize: 16,
  },
  chevron: {
    position: 'absolute',
    top: 25,
    right: 5,
    fontSize: 27,
    color: 'rgba(22,159,173,1)'
  }
})

export default Templates;
