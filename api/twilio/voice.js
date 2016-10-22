var enums = require('./constants.enums'),
    questionPath = require('./constants/question-path'),
    twilio = require('twilio'),
    responseStore = require('./db/response-store');

// Main question loop
exports.question = function(req, res, db) {
    var currentIndex = req.params.index;
    var input = req.body.RecordingUrl || req.body.Digits;
    var twiml = new twilio.Twimlres();
    var previousNode;
    if (currentIndex) {
      previousNode = questionPath[currentIndex];
    }

    // helper to append a new "Say" verb with alice voice
    function say(text) {
        twiml.say(text, {
            voice: 'alice'
        });
    }

    // respond with the current TwiML content
    function respond() {
        // TODO we need a fallback verb here in case nothing gets collected.
        res.type('text/xml');
        res.send(twiml.toString());
    }

    var args = {
        id: req.body.CallSid,
        phone: req.body.From,
        node: previousNode,
        input: input,
        index: currentIndex
    };
    responseStore.handleCall(db, args, function(err, index, responseId) {
        if (err) {
            say('Terribly sorry, but an error has occurred. Goodbye.');
            return respond();
        }

        // If question is null, we're done!
        if (!index) {
            say('Thank you. Goodbye!');
            return respond();
        }

        var nextIndex;

        if (index === 0) { // first hit
            // Add a greeting if this is the first question
            say('Hello.');
        }

        var node = questionPath[index];
        var question = node.question;
        var action = '/questions/' + index;

        say(question.text);

        if (question.type === enums.questionTypes.INPUT) {
            say('Enter the number using the number keys on your telephone. Press pound to finish.');
            twiml.gather({
                action: action,
                timeout: question.timeout
            });
        } else if (question.type === enums.questionTypes.SWITCH) {
            for (var button in node.values) {
                say('Press ' + button + ' for ' + node.values[button].name + '.');
                twiml.gather({
                    action: action,
                    timeout: question.timeout,
                    numDigits: 1
                });
            }
        } else { // TEXT
            say('Please record your response after the beep. Press any key to finish.');
            twiml.record({
                action: action,
                timeout: question.timeout,
                // TODO uncomment when ready for transcription
                //transcribe: true,
                //transcribeCallback: '/voice/' + surveyres._id +
                //    '/transcribe/' + responseId,
                maxLength: question.maxLength
            });
        }

        // render TwiML res
        respond();
    });
};

// TODO update
// Transcripton callback - called by Twilio with transcript of recording
// Will update survey res outside the interview call flow
exports.transcription = function(req, res) {
    var resId = req.params.resId;
    var questionIndex = req.params.questionIndex;
    var transcript = req.body.TranscriptionText;

    Surveyres.findById(resId, function(err, surveyres) {
        if (err || !surveyres ||
            !surveyres.ress[questionIndex])
            return res.status(500).end();

        // Update appropriate answer field
        surveyres.ress[questionIndex].answer = transcript;
        surveyres.markModified('ress');
        surveyres.save(function(err, doc) {
            return res.status(err ? 500 : 200).end();
        });
    });
};
