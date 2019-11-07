const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const regRouter = require('./routes/reg');
const loginRouter = require('./routes/login');
const uploadRouter = require('./routes/upload');
// const changeRouter = require('./routes/change');
// const listRouter = require('./routes/list');

const shopRouter = require('./routes/shop');

const app = express(); // 中间件函数

// view engine setup 视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev')); // 日志
app.use(express.json()); // json
app.use(express.urlencoded({
  extended: false
})); // 表单验证
app.use(cookieParser()); // 后端session
app.use(express.static(path.join(__dirname, 'public'))); // 静态文件路径

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 200
}));

// 中间件路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reg', regRouter);
app.use('/login', loginRouter);
app.use('/upload', uploadRouter);
// app.use('/change', changeRouter);
// app.use('/', listRouter);

app.use('/shop', shopRouter);


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