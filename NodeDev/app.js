
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  ,urlrouter = require('urlrouter');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set("view options",{"layout":false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var user = require('./routes/user');

var router = urlrouter(function (app) {
    app.get('/', routes.index);
    app.get('/help', routes.help);
    app.get('/driver', routes.driver);
    app.get('/login', routes.login);
    app.get('/around', routes.around);
    app.get('/bus', routes.bus);
    app.get('/register', routes.register);
    app.get('/navigator', routes.navigator);
    app.get('/test', routes.test);

    app.get('/regis', user.register);
    app.get('/log', user.login);
    app.get('/logout', user.logout);

    app.get('/getUserName', user.getUserName);
    app.get('/savePosition', user.savePosition);

});
app.use(router);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
