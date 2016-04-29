'use strict';

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
      pictureUri: 'Lucas.jpg'
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

export default exampleLesson;
