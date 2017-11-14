const sql_curd = require('../module_mysql/sql_curd.js');
const login_validate = require("../validate/login_validate.js");
var con = sql_curd.con_curd;
// 检验用户是否登录
function session_validate(req) {
    var u_p = req.session.u_p;
    if (u_p) {
        if (u_p.flag) { //正则判断
            u_p = login_validate(u_p);
            if (u_p.flag) {
                return u_p;
            } else {
                u_p.error = { session_validate: "0000000" };
                u_p.flag = false;
                return u_p;
            }
        } else { //如果u_p本身不合法
            return u_p;
        }
    } else { //如果u_p不存在
    	var u_p = {
    		flag:false,
    		error:"u_p存在"
    	}
        return u_p;
    }
}
//判断cookie是否过期
function cookie_validate(req,res) {
    var cookie_flag = req.session.cookie;
    var u_p = req.session.u_p;
    if (cookie_flag) {
        // res.cookie('resc','kkk:kkkk;kkkd:fff',{expires:new Date(Date.now()+60000),httpOnly:true});
        return u_p;
    } else {
        u_p.flag = false;
        u_p.error = { "cookie": "cookie error" };
        return u_p;
    }
}
// 验证用户是否需要重新登录
function session_cookie(req,res) {
	var u_p = {};
	u_p = session_validate(req);
	if(u_p && !u_p.flag) {
		return u_p;
	} 

	u_p = cookie_validate(req,res);
	if(u_p && !u_p.flag) {
		return u_p;
	} 

	return u_p;
}
module.exports = session_cookie;