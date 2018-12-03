var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var exhibitsRouter = require('./routes/exhibits');
var exhibitRouter = require('./routes/exhibit');
var animalsRouter = require('./routes/animals');
var animalRouter = require('./routes/animal');
var showsRouter = require('./routes/shows');
var showRouter = require('./routes/show');
var staffRouter = require('./routes/staff');
var visitorsRouter = require('./routes/visitors');





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/exhibits', exhibitsRouter);
app.use('/exhibit', exhibitRouter);
app.use('/animals', animalsRouter);
app.use('/animal', animalRouter);
app.use('/shows', showsRouter);
app.use('/show', showRouter);
app.use('/staff', staffRouter);
app.use('/visitors', visitorsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
