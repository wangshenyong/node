// 登录验证
// 身份验证成功返回对象
// {
//  user:
//  password:
//  id:
// }
// 失败返回
// {
//  flag:false
// }

//验证输入是否合法
function read_validate(u_p) {
    let regexp_user = new RegExp("[a-zA-Z]{6,20}");
    let regexp_password = new RegExp("[a-zA-Z0-9]{6,10}");
    if (u_p && regexp_user.test(u_p.user) && regexp_password.test(u_p.password)) {
        return u_p;
    } else {
        u_p.flag = false;
        u_p.error = { regexp: "00000000" };
        return u_p;
    }
}
//判断用户是否存在与密码是否相等
// function query_validate(u_p) {
//     con.queryparam("select * from user_tb where user=?", u_p.user, function(data) {
//         if (data && data.user === u_p.user && data.password === u_p.password) {
//             u_p.id = data.id;
//             console.log("con: "+u_p);
//         } else {
//             console.log("else: "+JSON.stringify(u_p));
//             u_p.flag = false;
//             u_p.error = { query: "00000000" };
//              console.log("elseh: "+JSON.stringify(u_p));
//         }
//     });
// }
// 验证合法
function validate_login(u_p) {
    // 正则验证
    u_p = read_validate(u_p);
    return u_p;
}
module.exports = validate_login;