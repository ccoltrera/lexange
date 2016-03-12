'use strict';

import update from 'react-addons-update';

var template = {
  languages: {
    teacher: '日本語',
    student: 'English'
  },
  people: [
    {
      desc: 'A friend',
      descTrans: 'ともだち',
      name: 'ひろ',
      pictureUri: ''
    },
  ],
  dialogue: [
    {
      person: 0,
      guide: 'Good morning',
      phrase: 'おはよう',
      phraseTrans: 'Good morning [casual]',
      audioUri: ''
    },
  ],
  items: []
};

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
