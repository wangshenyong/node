const host_route = require('./host_route.js');
const login_route = require("./login_route.js");
const util = require('util');
// 全部路由配置
function route_app(){
	var route = {
		// host的路由
		host_route:host_route,
		// 登录路由
		login_route:login_route
	};
	return route;
}

module.exports = route_app();