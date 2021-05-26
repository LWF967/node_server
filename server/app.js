var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');


var assert =require("http-assert");
var app = express();

//token全局配置
app.set('secret', 'i2u34y12oi3u4y8');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req,res,next) { // 拦截请求
  const token=String(req.headers.authorization)
  if(req.headers.authorization){
    next();
  }else{
      // console.log("url:"+req.originalUrl);
      if(req.originalUrl.indexOf('/v1/api')>-1 ||req.originalUrl.indexOf('/users/login')>-1 || req.originalUrl.indexOf('/users/logout')>-1 || req.originalUrl.indexOf('/list')>-1 || req.originalUrl.indexOf('/getDetails')>-1 || req.originalUrl.indexOf('/users/register')>-1 || req.originalUrl.indexOf('/users/userExist')>-1 || req.originalUrl.indexOf('/searchData')>-1){
          next();
      }else{
          res.json({
            status:'10001',
            msg:'当前未登录',
            result:''
          });
      }
  }
});

app.use('/v1/api',express.static('public/dist'));
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler错误处理函数
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

  console.log(err.message);

});



module.exports = app;
