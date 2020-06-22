//npm dotenv > .env파일 내부에 DB설정 보유
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mariRouter = require('./routes/mari/mari');
const collectionRouter = require('./routes/collection/collection');
const heartsRouter = require('./routes/collection/heart');

// Connect To MongoDB Server
const port = process.env.PORT || 4500;
//Node.js의 Native Promise 사용
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    //connected to mongodb server
    console.log("Connected to mongod server");
});

// var bootstrap = require('bottstrap');

var app = express();
//history모드 사용
app.use(require('connect-history-api-fallback')());

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS 설정
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/mari', mariRouter);
app.use('/api/collection', collectionRouter);

// 거인의 심장 정보 DB 테스트
app.use('/api/hearts', heartsRouter);

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