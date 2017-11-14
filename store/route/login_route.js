const login = require("../login/login.js");
// 登录页路由配置
function login_route(app, urlencodeParser) {
	/*如果用户名和密码验证不成功返回false
        如果用户名与密码验证成功返回
        u_p={
        	user:user,
        	password:password,
        	id:id
        }*/
    app.post("/store/login.do",urlencodeParser, function(req, res) {
        req.session.u_p={sdf:"sdfsdf"};
        console.log("cookie: "+JSON.stringify(req.session.cookie));
        console.log("session_u_p: "+req.session.u_p);
        console.log("session_password: "+req.session.password);
        login(req,res);
        console.log("ddd");
    });
}
module.exports = login_route;