var enums = require('../constants/enums');

exports.handleCall = function(args, cb) {
    var id = args.id;
    var phone = args.phone;
    var input = args.input;
    var node = args.node;

    // ask again if something breaks
    function askAgain() {
        cb(null, args.index, null);
    }

    var responseId;
    var callRef = global.db.ref('calls/' + id);

    callRef.once('value', function(data) {
        if (!data.val()) {
            data = {
                phone: phone,
                responses: []
            };
            callRef.set(data);
        } else {
            // got something, check if we should save
            var key = node.question.key;
            if (key) {
                var responsesRef = callRef.child('responses/' + key);
                var response = {};
                if (node.question.type === enums.questionTypes.INPUT) {
                    response.answer = input;
                } else if (node.question.type === enums.questionTypes.SWITCH) {
                    var value = node.values[input];
                    if (!value) { // doesn't map up
                        return askAgain();
                    }
                    response.answer = value.store;
                } else { // TEXT
                    response.answer = null; // we'll populate this later
                    response.url = input; // store url of recording, just in case
                }
                response.question = node.question.text;
                responseId = responsesRef.set(response).key;
            }
        }

        var index;
        if (!node) {
          index = 0;
        } else if (node.question.type === enums.questionTypes.SWITCH) {
            var value = node.values[input];
            if (!value) { // doesn't map up
                return askAgain();
            }
            index = value.next; // if we're here, this is populated
        } else {
            index = node.next;
        }
        cb(null, index, responseId);
    }, function(error) {
        cb(error, null, null);
    });
}
