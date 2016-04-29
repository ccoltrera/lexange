'use strict';

import update from 'react-addons-update';
import realm from './database';

var lessonTemplates = realm.objects('LessonTemplate');

var databaseTemplate = lessonTemplates[0];

// Takes a template from the database, makes a copy and adds in elements not stored in the database
function constructUsableTemplate(databaseTemplate) {
  var usableTemplate = {
    languages: {
      teacher: '',
      student: ''
    },
    people: [],
    dialogue: [],
    items: [],
    places: []
  };

  // Take in each category, and construct that aspect of the usableTemplate
  function constructEachPart(partName, template) {
    for (let i=0; i<databaseTemplate[partName].length; i++) {
      template[partName][i] = {};

      template[partName][i]['guide'] = databaseTemplate[partName][i]['guide'];

      if (partName === 'people' || partName === 'items' || partName === 'places') {
        template[partName][i]['desc'] = '';
        template[partName][i]['descTrans'] = '';
        template[partName][i]['pictureUri'] = '';
        template[partName][i]['descAudioUri'] = '';
      }

      if (partName === 'people') {
        template[partName][i]['name'] = '';
        template[partName][i]['nameAudioUri'] = '';
      }

      if (partName === 'dialogue') {
        template[partName][i]['person'] = databaseTemplate[partName][i]['person'];
        template[partName][i]['phrase'] = '';
        template[partName][i]['phraseTrans'] = '';
        template[partName][i]['audioUri'] = '';
      }

    }
  }

  var partNames = ['people', 'dialogue', 'items', 'places'];

  for (let i=0; i < partNames.length; i++) {
    var partName = partNames[i];
    constructEachPart(partName, usableTemplate)
  }

  return usableTemplate;

}

var template;

function _setTemplate(databaseTemplate) {
  template = constructUsableTemplate(databaseTemplate);
}


function _updateTemplate(updateQuery) {
  template = update(template, updateQuery);
}

function _readTemplate() {
  return template;
}

export default {
  _updateTemplate: _updateTemplate,
  _readTemplate: _readTemplate,
  _setTemplate: _setTemplate,
};
