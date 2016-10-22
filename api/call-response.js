exports.handleCall = function(db, args, cb) {
  var id = args.id;
  var phone = args.phone;
  var input = args.input;

  var question = 0;

  var call = db.ref("call-queue/" + id);
  call.once("value", function(data) {
    if (!data) {
      // TODO set fields we care about
      data = {
        phone: phone,
        responses:[]
      };
    }
    else {
      // got something
      data.push(args.input); // TODO
    }
    // save state
    ref.set(data);

    cb(data.responses.length++); // TODO
  }, function(error) {
    console.log("The read failed: " + error);
  })

}
