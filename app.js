var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');
// var indexRouter = require('./routes/signup');
var usersRouter = require('./routes/users');
const { requireAuth } = require('./middleware/authMiddleware');
testAPIRouter = require('./routes/testAPI');
authRoutesRouter = require('./routes/authRoutes');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(cors({credentials: true, origin: true}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// databse connection
const dbURI = "mongodb+srv://Redwan:TestTest@nomas-todo.dbsp9.mongodb.net/Nomas-Todo";
mongoose.connect(dbURI)
	.then((result) => app.listen(8000))
	.catch((err) => console.log(err));

// app.use('/', indexRouter);
app.use('/', authRoutesRouter);
// app.get('/dashboard', requireAuth, (req, res) => res.send('something worked?')) //Change to use
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
