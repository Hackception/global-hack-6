var questionTypes = {
    INPUT: 'input',
    SWITCH: 'switch',
    TEXT: 'text',
};

var questions = {
    START: {
        text: 'Which question path?',
        type: questionTypes.SWITCH,
        timeout: 10,
        key: null
    },
    NAME: {
        text: 'What is your name?',
        type: questionTypes.TEXT,
        maxLength: 60,
        key: 'name'
    },
    FAVORITE_NUMBER: {
        text: 'What is your favorite number?',
        type: questionTypes.INPUT,
        timeout: 10,
        key: 'favoriteNumber'
    },
    LIKES_CATS: {
        text: 'Do you like cats?',
        type: questionTypes.SWITCH,
        timeout: 5,
        key: 'likesCats'
    },
    QUEST: {
        text: 'What is your quest?',
        type: questionTypes.TEXT,
        maxLength: 60,
        key: 'quest'
    },
    FAVORITE_COLOR: {
        text: 'What is your favorite color?',
        type: questionTypes.TEXT,
        maxLength: 60,
        key: 'favoriteColor'
    }
};
module.exports = {questionTypes, questions};
