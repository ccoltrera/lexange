'use strict';

import update from 'react-addons-update';

var template = {
  id: '0000000001',
  languages: {
    teacher: '',
    student: ''
  },
  people: [
    {
      desc: 'A friend',
      descTrans: '',
      name: '',
      pictureUri: ''
    },
    // {
    //   desc: 'Another friend',
    //   descTrans: 'ほかのともだち',
    //   name: 'えり',
    //   pictureUri: ''
    // },
  ],
  dialogue: [
    {
      person: 0,
      guide: 'Morning greeting',
      phrase: '',
      phraseTrans: '',
      audioUri: ''
    },
    // {
    //   person: 1,
    //   guide: 'Morning greeting',
    //   phrase: 'おはよう。',
    //   phraseTrans: 'Good morning [casual]',
    //   audioUri: ''
    // },
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
