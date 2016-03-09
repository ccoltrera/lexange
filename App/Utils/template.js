'use strict';

import update from 'react-addons-update';

var template = {
  languages: {
    teacher: '日本語',
    student: ''
  },
  people: [
    {
      desc: 'A Friend',
      descTrans: 'ともだち',
      name: 'えりこ',
      pictureUri: ''
    },
  ],
  dialogue: [
    {
      person: 0,
      guide: 'Morning greeting',
      diaTrans: 'おはようございます。',
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
