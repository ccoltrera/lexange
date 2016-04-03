'use strict';

import update from 'react-addons-update';
import realm from '../Utils/database';

// var template = {
//   id: '0000000001',
//   languages: {
//     teacher: '日本語',
//     student: 'English'
//   },
//   people: [
//     {
//       guide: 'A friend',
//       desc: 'ともだち',
//       descTrans: 'A friend [casual]',
//       name: 'ひろ',
//       pictureUri:
//       '/Users/colincoltrera/Library/Developer/CoreSimulator/Devices/C51084B7-64BD-4E84-81DE-9BCFB4D7FCA4/data/Containers/Data/Application/E4C0BFF3-CF5C-46CC-A865-90837804B491/Documents/1cddf99cd257e9263f93387e5eb69560.jpg'
//     },
//     {
//       guide: 'Another friend',
//       desc: 'ほかのともだち',
//       descTrans: 'Another friend [casual]',
//       name: 'えり',
//       pictureUri: '/Users/colincoltrera/Library/Developer/CoreSimulator/Devices/C51084B7-64BD-4E84-81DE-9BCFB4D7FCA4/data/Containers/Data/Application/E4C0BFF3-CF5C-46CC-A865-90837804B491/Documents/tokyo-street-style-shibuya-leather-jacket.jpg'
//     },
//   ],
//   dialogue: [
//     {
//       person: 0,
//       guide: 'Morning greeting',
//       phrase: 'おはよう。',
//       phraseTrans: 'Good morning [casual]',
//       audioUri:
//       ''
//     },
//     {
//       person: 1,
//       guide: 'Morning greeting to friend',
//       phrase: 'おはよう、ひろ。',
//       phraseTrans: 'Good morning, Hiro [casual]',
//       audioUri: '0000000001-audio-1.m4a'
//     },
//     {
//       person: 0,
//       guide: 'Morning greeting',
//       phrase: 'げんき？',
//       phraseTrans: 'How are you? [casual]',
//       audioUri: '0000000001-audio-2.m4a'
//     },
//   ],
  // items: [
    // {
    //   guide: 'An umbrella',
    //   desc: 'かさ',
    //   descTrans: 'An umbrella',
    //   descAudioUri: '',
    //   pictureUri: '/Users/colincoltrera/Library/Developer/CoreSimulator/Devices/C51084B7-64BD-4E84-81DE-9BCFB4D7FCA4/data/Containers/Data/Application/E4C0BFF3-CF5C-46CC-A865-90837804B491/Documents/06b7ebd0756f52670448cd637194016f.jpg',
    // },
  // ],
  // places: [
    // {
    //   guide: 'A street',
    //   desc: 'とおり',
    //   descTrans: 'A street',
    //   descAudioUri: '',
    //   pictureUri: '/Users/colincoltrera/Library/Developer/CoreSimulator/Devices/C51084B7-64BD-4E84-81DE-9BCFB4D7FCA4/data/Containers/Data/Application/E4C0BFF3-CF5C-46CC-A865-90837804B491/Documents/tumblr_lysi3wLZah1r2cj3no1_500.jpg',
    // },
//   ]
// };

// var template = {
//   id: '0000000001',
//   languages: {
//     teacher: '',
//     student: ''
//   },
//   people: [
//     {
//       guide: '',
//       name: '',
//       desc: '',
//       descTrans: '',
//       pictureUri: '',
//       descAudioUri: '',
//       nameAudioUri: '',
//     },
//   ],
//   dialogue: [
//     {
//       person: 0,
//       guide: '',
//       phrase: '',
//       phraseTrans: '',
//       audioUri: ''
//     },
//   ],
//   items: [
//     {
//       guide: '',
//       desc: '',
//       descTrans: '',
//       descAudioUri: '',
//       pictureUri: '',
//     },
//   ],
//   places: [
//     {
//       guide: '',
//       desc: '',
//       descTrans: '',
//       descAudioUri: '',
//       pictureUri: '',
//     },
//   ]
// };

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

var template = constructUsableTemplate(databaseTemplate);


function _updateTemplate(updateQuery) {
  template = update(template, updateQuery);
}

function _readTemplate() {
  return template;
}

export default {
  _updateTemplate: _updateTemplate,
  _readTemplate: _readTemplate
};
