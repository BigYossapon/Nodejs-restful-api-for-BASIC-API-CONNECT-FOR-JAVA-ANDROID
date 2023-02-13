var fs = require ('fs');
fs.readdirSync('snippets').forEach(function(file) {
  if ( file[0] == '.' ) return;
  var routeName = file.substr(0, file.indexOf('.'));
  require('./snippets/' + routeName)(app);
});