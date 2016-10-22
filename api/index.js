/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
    name: 'Maritz'
  });
};

exports.post_name = function(req, res) {
  var name = req.body.name;
  res.json({
    name: name
  });
}
