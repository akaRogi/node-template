/*
 * @Author: rogi
 * @Date: 2022-07-20 08:53:36
 * @LastEditTime: 2022-07-20 09:06:41
 * @LastEditors: rogi
 * @Description: 描述
 */
const createError : any = require('http-errors');
const express : any = require('express');
const path : any = require('path');
const cookieParser : any = require('cookie-parser');
const logger : any = require('morgan');
const multer : any = require('multer');
const routerMap = require('./api/index');
const authority = require('./middleware/authority');
const verifyValue = require('./middleware/verifyValue');
const config = require('./utils/config');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('case sensitive routing', true);

// 跨域开启
app.all("*",function(req, res, next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","*");
  res.header("custom-header","*");
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  res.header("Access-Control-Expose-Headers","Access-Control-Allow-Origin");
  next();
});

app.use(multer({ dest: config.tmp }).any());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(authority);
app.use(verifyValue);

routerMap.forEach(el => {
  app.use(`/api/${el.routerClass}`, el.router);
});

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
