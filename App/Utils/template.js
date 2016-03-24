'use strict';

import update from 'react-addons-update';

var template = {
  id: '0000000001',
  languages: {
    teacher: '日本語',
    student: 'English'
  },
  people: [
    {
      guide: 'A friend',
      desc: 'ともだち',
      descTrans: 'A friend [casual]',
      name: 'ひろ',
      pictureUri: '/Users/colincoltrera/Library/Developer/CoreSimulator/Devices/C51084B7-64BD-4E84-81DE-9BCFB4D7FCA4/data/Containers/Data/Application/924F27C9-6CE1-4017-A8D6-B25191AEB0C8/Documents/1cddf99cd257e9263f93387e5eb69560.jpg'
    },
    {
      guide: 'Another friend',
      desc: 'ほかのともだち',
      descTrans: 'Another friend [casual]',
      name: 'えり',
      pictureUri: '/Users/colincoltrera/Library/Developer/CoreSimulator/Devices/C51084B7-64BD-4E84-81DE-9BCFB4D7FCA4/data/Containers/Data/Application/924F27C9-6CE1-4017-A8D6-B25191AEB0C8/Documents/tokyo-street-style-shibuya-leather-jacket.jpg'
    },
  ],
  dialogue: [
    {
      person: 0,
      guide: 'Morning greeting',
      phrase: 'おはよう。',
      phraseTrans: 'Good morning [casual]',
      audioUri: '0000000001-audio-0.m4a'
    },
    {
      person: 1,
      guide: 'Morning greeting to friend',
      phrase: 'おはよう、ひろ。',
      phraseTrans: 'Good morning, Hiro [casual]',
      audioUri: '0000000001-audio-1.m4a'
    },
    {
      person: 0,
      guide: 'Morning greeting',
      phrase: 'げんき？',
      phraseTrans: 'How are you? [casual]',
      audioUri: '0000000001-audio-2.m4a'
    },
  ],
  items: [
    {
      guide: 'Umbrella',
      desc: 'かさ',
      descTrans: 'Umbrella',
      descAudioUri: '',
      pictureUri: '/Users/colincoltrera/Library/Developer/CoreSimulator/Devices/C51084B7-64BD-4E84-81DE-9BCFB4D7FCA4/data/Containers/Data/Application/924F27C9-6CE1-4017-A8D6-B25191AEB0C8/Documents/06b7ebd0756f52670448cd637194016f.jpg',
    },
  ],
  places: [
    {
      guide: 'Street',
      desc: 'とおり',
      descTrans: 'Street',
      descAudioUri: '',
      pictureUri: '/Users/colincoltrera/Library/Developer/CoreSimulator/Devices/C51084B7-64BD-4E84-81DE-9BCFB4D7FCA4/data/Containers/Data/Application/924F27C9-6CE1-4017-A8D6-B25191AEB0C8/Documents/tumblr_lysi3wLZah1r2cj3no1_500.jpg',
    },
  ]
};

// var template = {
//   id: '0000000001',
//   languages: {
//     teacher: '',
//     student: ''
//   },
//   people: [
//     {
//       guide: 'A friend',
//       desc: '',
//       descTrans: '',
//       descAudioUri: '',
//       name: '',
//       nameAudioUri: '',
//       pictureUri: ''
//     },
//   ],
//   dialogue: [
//     {
//       person: 0,
//       guide: 'Morning greeting',
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
