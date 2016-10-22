var enums = require('./constants.enums');

exports.handleCall = function(db, args, cb) {
    var id = args.id;
    var phone = args.phone;
    var input = args.input;
    var node = args.node;

    // ask again if something breaks
    function askAgain() {
        cb.call(null, args.index, null);
    }

    var responseId;
    var call = db.ref('calls/' + id);
    call.once('value', function(data) {
        if (!data) {
            data = {
                phone: phone,
                responses: []
            };
            call.push(data);
        } else {
            // got something, check if we should save
            var key = node.question.key;
            if (key) {
                var responsesRef = call.child('responses');
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
                responseId = responsesRef.push(response).key;
            }
        }

        var index;
        if (node.question.type === enums.questionTypes.SWITCH) {
            index = node.values[input].next; // if we're here, this is populated
        } else {
            index = node.next;
        }
        cb(null, index, responseId);
    }, function(error) {
        cb(error, null, null);
    });
}
