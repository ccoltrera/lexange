'use strict';

import update from 'react-addons-update';
import realm from './database';

var exampleLesson = {
  id: '0000000001',
  languages: {
    teacher: 'Portuguese (Brazilian)',
    student: 'English'
  },
  people: [
    {
      guide: 'A student',
      desc: 'Um aluno',
      descTrans: 'A student [male]',
      name: 'Lucas',
      pictureUri: 'Lucas.png'
    },
    {
      guide: 'A teacher',
      desc: 'Uma professora',
      descTrans: 'A teacher [female]',
      name: 'Camila',
      pictureUri: 'Camila.png'
    },
  ],
  dialogue: [
    {
      person: 0,
      guide: 'Morning greeting to teacher',
      phrase: 'Bom dia, professora!',
      phraseTrans: 'Good morning, teacher!',
      audioUri:
      'tutorial-lucas.m4a'
    },
    {
      person: 1,
      guide: 'Morning greeting to student',
      phrase: 'Bom dia, Lucas.',
      phraseTrans: 'Good morning, Lucas',
      audioUri: 'tutorial-camila.m4a'
    },
    // {
    //   person: 0,
    //   guide: 'Morning greeting',
    //   phrase: 'げんき？',
    //   phraseTrans: 'How are you? [casual]',
    //   audioUri: '0000000001-audio-2.m4a'
    // },
  ],
  items: [
    // {
    //   guide: 'An umbrella',
    //   desc: 'かさ',
    //   descTrans: 'An umbrella',
    //   descAudioUri: '',
    //   pictureUri: '/Users/colincoltrera/Library/Developer/CoreSimulator/Devices/C51084B7-64BD-4E84-81DE-9BCFB4D7FCA4/data/Containers/Data/Application/E4C0BFF3-CF5C-46CC-A865-90837804B491/Documents/06b7ebd0756f52670448cd637194016f.jpg',
    // },
  ],
  places: [
    // {
    //   guide: 'A street',
    //   desc: 'とおり',
    //   descTrans: 'A street',
    //   descAudioUri: '',
    //   pictureUri: '/Users/colincoltrera/Library/Developer/CoreSimulator/Devices/C51084B7-64BD-4E84-81DE-9BCFB4D7FCA4/data/Containers/Data/Application/E4C0BFF3-CF5C-46CC-A865-90837804B491/Documents/tumblr_lysi3wLZah1r2cj3no1_500.jpg',
    // },
  ]
};

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
  exampleLesson: exampleLesson
};
