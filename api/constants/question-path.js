var enums = require('./enums');

module.exports = [{ // 0
    question: enums.questions.START,
    values: {
      '1': {
        name: 'stuff',
        store: null,
        next: 1
      },
      '2': {
        name: 'monty python',
        store: null,
        next: 4
      }
    }
}, { // 1
    question: enums.questions.NAME,
    next: 2
}, { // 2
    question: enums.questions.FAVORITE_NUMBER,
    next: 3
}, { // 3
    question: enums.questions.LIKES_CATS,
    values: {
      '1': {
        name: 'yes',
        store: true,
        next: null
      },
      '2': {
        name: 'no',
        store: false,
        next: null
      }
    },
    next: null
}, { // 4
    question: enums.questions.NAME,
    next: 5
}, { // 5
    question: enums.questions.QUEST,
    next: 6
}, { // 6
    question: enums.questions.FAVORITE_COLOR,
    next: null
}];
