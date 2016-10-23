/*
The MIT License (MIT)

Copyright (c) 2015 Twilio Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var enums = require('../constants/enums'),
    questionPath = require('../constants/question-path'),
    twilio = require('twilio'),
    responseStore = require('../db/response-store'),
    weight = require('./weights');

// Main question loop
exports.question = function(req, res) {
    var currentIndex = req.params.index;
    var input = req.body.RecordingUrl || req.body.Digits;
    var twiml = new twilio.TwimlResponse();
    var previousNode;
    if (currentIndex) {
        previousNode = questionPath[currentIndex];
    }
        say('Thank you. Goodbye!');
        twiml.redirect('/api/questions/finish');
        return respond();
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
    responseStore.handleCall(args, function(err, index, responseId) {
        if (err) {
            say('Terribly sorry, but an error has occurred. Goodbye.');
            return respond();
        }

        // If question is null, we're done!
        if (index === null) {
            say('Thank you. Goodbye!');
            twiml.redirect('/api/questions/finish');
            return respond();
        }

        twiml.pause({
          length: 3
        });

        var nextIndex;

        if (index === 0) { // first hit
            // Add a greeting if this is the first question
            say('Hello.');
        }

        var node = questionPath[index];
        var question = node.question;
        var action = '/api/questions/' + index;

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
            }
            twiml.gather({
                action: action,
                timeout: question.timeout,
                numDigits: 1
            });
        } else { // TEXT
            say('Please record your response after the beep. Press any key to finish.');
            twiml.record({
                action: action,
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

exports.listQuestions = function(req, res) {
  res.json(questionPath);
}

exports.finishUp = function(req, res) {
  weight.calculateWeight(req.body.CallSid);

  var twiml = new twilio.TwimlResponse();
  twiml.hangup();
  res.type('text/xml');
  res.send(twiml.toString());
}

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
