'use strict';

import update from 'react-addons-update';

var template = {
  languages: {
    teacher: '',
    student: ''
  },
  characters: [
    {
      desc: 'Friend',
      descTrans: '',
      name: '',
      pictureUri: ''
    },
  ],
  dialogue: [
    {
      character: 0,
      guide: 'Morning greeting',
      diaTrans: '',
      audioUri: ''
    },
  ]
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
