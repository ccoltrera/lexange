'use strict';

import update from 'react-addons-update';

var template = {
  languages: {
    teacher: '日本語',
    student: 'English'
  },
  people: [
    {
      desc: 'A Friend',
      descTrans: 'ともだち',
      name: 'えりこ',
      pictureUri: ''
    },
    {
      desc: 'Another Friend',
      descTrans: 'ほかのともだち',
      name: 'ひろ',
      pictureUri: ''
    },
  ],
  dialogue: [
    {
      person: 0,
      guide: 'Morning greeting',
      diaTrans: 'おはよう。',
      audioUri: ''
    },
    {
      person: 1,
      guide: 'Morning greeting',
      diaTrans: 'おはよう。',
      audioUri: ''
    }
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
