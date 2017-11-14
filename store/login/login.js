const login_validate = require("../validate/login_validate.js");
const sql_curd = require('../module_mysql/sql_curd.js');
var con = sql_curd.con_curd;

// 查询数据库验证身份合法性
function query_validate(u_p, req,res) {
    con.queryparam("select * from user_tb where user=?", u_p.user, function(data) {
        // 如何合法返回u_p数据
        if (data && data[0] && data[0].user === u_p.user && data[0].password === u_p.password) {
            u_p.id = data[0].id;
            req.session.u_p = u_p;  
            res.cookie('resc',u_p,{maxAge:120000,httpOnly:false});          
            res.send(u_p);
        } else {
            u_p.flag = false;
            u_p.error = { query: "00000000" };
             res.send(u_p);//不合法也返回数据(不合法的u_p中装在有错误信息u_p.error)
        }
    });
}
/*如果用户名和密码验证不成功返回false
        如果用户名与密码验证成功返回
        u_p={
        	user:user,
        	password:password,
        	id:id
        }
        */
function login(req, res) {
    var u_p = {
        user: req.body.user,
        password: req.body.password,
        flag: true,
        error: null,
        id: null
    }
    u_p = login_validate(u_p);
    // 验证密码用户名合法性
    if (u_p.flag && !u_p.error) {
       query_validate(u_p, req,res);
    } else {
    	 console.log("session_loginu_p: "+JSON.stringify(req.session.u_p));
       res.send(u_p);
    }
}

function setCookie(req, res, u_p) {

}
module.exports = login;