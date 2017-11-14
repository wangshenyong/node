const mysql = require('mysql');
// mysql连接配置
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tables'
});
// connection.connect();

function con_curd() {

    var curd = {
    	// 查询数据
        query: function(sql, goback) {
            connection.query(sql, function(err, result) {
                if (err) {
                    console.log("error: " + sql);
                    console.log("error: "+ err.message);
                    return null;
                } else {
                    goback(result);
                }
            });
        },
        //带参数的数据查询
        queryparam: function(sql, params, goback) {
            connection.query(sql, params, function(err, result) {
               console.log("queryparam");
                if(err) {
                    console.log("err: "+ sql);
                    console.log("error: " + err.message);
                    return null;
                } else {
                    console.log("result: "+result);
                    if (typeof(goback) == "function") { goback(result); }
                }

            })
        },
        // 数据插入
        insert: function(sql, sql_params, goback) {
            connection.query(sql, sql_params, function(err, result) {
                if (err) {
                    console.log("error: " + sql);
                    console.log("message: " + err.message);
                    return;
                } else {
                	console.log(typeof(goback))
                    if (typeof(goback) == "function") { goback(result); }
                }
            })
        },
        // 数据更新
        update: function(sql, sql_params, goback) {
            connection.query(sql, sql_params, function(err, result) {
                if (err) {
                    console.log("err: " + sql);
                    console.log("error: "+err.message);
                    return;
                } else {
                   if (typeof(goback) == "function") { goback(result); }
                }
            })
        },
        // 数据删除
        deleted: function(sql, sql_params, goback) {
            connection.query(sql, sql_params, function(err, result) {
                if (err) {
                    console.log("error: " + sql);
                    console.log("error.message: "+ err.message);
                    return;
                } else {
                   if (typeof(goback) == "function") { goback(result); }
                }
            });
        },
       // 断开连接
        destory: function() {
            connection.end();
        },
        // 连接数据库
        connect: function() {
            connection.connect();
            console.log("connection .....");
        }
    };
    return curd;
}
exports.con_curd = con_curd();