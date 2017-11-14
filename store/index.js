const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const loginFilter = require('./nodeFliter/loginFileter.js');
// 引入路由配置文件
const route = require('./route/route.js');
const bodyParser = require('body-parser');
const urlencodeParser = bodyParser.urlencoded({extended:false})
const app = express();
// 设置接受的application/json
app.use(bodyParser.json({type: 'application/json'}))
// 设置静态文件目录
app.use(express.static('public'));
// 设置cookie
app.use(cookieParser());
// 设置session
app.use(session({
	secret:'12345',
	name:'myapp',
	cookie:{maxAge:120000},
	resave:true,
	saveUninitialized:true,
	rolling:true
}));
// app.use();
app.use(function(req,res,next) {
	loginFilter(req, res, next);
});
console.log(route);
// 获取路由
// var route_app = route.route_app;
// 加载host_store的路由
route.host_route(app,urlencodeParser);
route.login_route(app,urlencodeParser);
// 启动服务器
app.listen(8081, function(req, res) {

});