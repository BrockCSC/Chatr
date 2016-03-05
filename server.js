var express = require('express');
var jsxEngine = require('express-react-views').createEngine();

var app = express();

app.set('port', process.env.PORT || 3000);
app.set ('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', jsxEngine);

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(app.get('port'), function() {
  console.log('listening on port ' + app.get('port'));
});
