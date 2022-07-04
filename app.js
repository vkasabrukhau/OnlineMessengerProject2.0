//var createError = require('http-errors');

let express = require('express');
let app = express();
let logger = require('morgan');
const config = require("./config");
const fs = require("fs");
const path = require('path');
const favicon = require('serve-favicon');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const mongoStore = require('connect-mongo');

// router connections
let indexRouter = require('./routes/homeRouter');
let userRouter = require('./routes/userRouter');
let chatRouter = require('./routes/chatRouter')



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', './layouts/main-layout');

const logStream = fs.createWriteStream(path.join(__dirname, 'logs.log'), {flags: 'a'}); 

app.use(logger(config.get("log_format", {stream: logStream})));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayout)

app.use(logger(config.get("log_format")));
app.use(express.urlencoded({extended: true}));

const sessionMiddleware = session({
    secret: 'webChat2734',
    store: mongoStore.create({
      mongoUrl: config.get('database')})
})

app.use(sessionMiddleware)

app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/chat', chatRouter)

app.get("/test", function(req, res){
  res.end("Test");
})

app.use(function(req, res){
  res.status(404);
  res.render("error404", {status: 404, layout: './layouts/error-layout'});
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {status: err.status || 500, layout: './layouts/error-layout'});
});

module.exports = {app, sessionMiddleware}

























/*
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');




// view engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);*/
