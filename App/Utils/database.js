'use strict';

const Realm = require('realm');

const VocabTemplateSchema = {
  name: 'VocabTemplate',
  properties: {
    guide: {type: 'string'}
  }
};

const DialogueItemTemplateSchema = {
  name: 'DialogueItemTemplate',
  properties: {
    person: {type: 'int'},
    guide: {type: 'string'}
  }
};

const LessonTemplateSchema = {
  name: 'LessonTemplate',
  properties: {
    name: {type: 'string', default: 'testing'},
    level: {type: 'string'},
    lessonLength: {type: 'int'},
    people: {type: 'list', objectType: 'VocabTemplate'},
    dialogue: {type: 'list', objectType: 'DialogueItemTemplate'},
    items: {type: 'list', objectType: 'VocabTemplate', default: []},
    places: {type: 'list', objectType: 'VocabTemplate', default: []}
  }
};

let realm = new Realm({
  schema: [VocabTemplateSchema, DialogueItemTemplateSchema, LessonTemplateSchema]
});

var morningGreetingTemplate = {
  name: 'Greeting a Friend (Morning)',
  level: 'Elementary',
  lessonLength: 2,
  people: [
    {
      guide: 'A friend',
    },
  ],
  dialogue: [
    {
      person: 0,
      guide: 'Morning greeting',
    },
  ]
};

realm.write(()=> {
  if (realm.objects('LessonTemplate').length === 0) {
    realm.create('LessonTemplate', morningGreetingTemplate);
  }
});

export default realm;
