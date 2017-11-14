const sql_curd = require('../module_mysql/sql_curd.js');
var con = sql_curd.con_curd;
// 查询数据库
function store(req, res) {
    var fenye = req.body;
    let tempa = [];
    tempa.push(fenye.dpage*fenye.dpagecols);
    tempa.push(fenye.rows);
    con.queryparam("select * from host_tb limit ?,?",tempa, function(data) {
       var tempData = {
        data:data,
        fenye:fenye
       }
        console.log(tempData);
        res.send(tempData);
    });
}
// 数据更新
function gethost(req, res) {
    console.log(req.body);
    var temparray = [];
    for (var value in req.body) {
        temparray.push(req.body[value]);
    }
    temparray[6] = req.body.id;
    temparray = temparray.slice(1);
    con.update("update host_tb set host=?,ip=?,insertdate=?,scancode=?,scanflag=? where id=?", temparray);
    con.query("select * from host_tb", function(data) {
        res.send(data);
    });
}
// 插入数据
function insert_table(req, res) {
    console.log(req.body);
    let temparray = [];
    for (var key in req.body) {
        temparray.push(req.body[key]);
    }
    con.insert("insert into host_tb(host,ip,insertdate,scancode,scanflag) values(?,?,?,?,?)", temparray);
    con.query("select * from host_tb", function(data) {
        res.send(data);
    });
}
// 删除数据行
function deleted_table(req, res) {
    let id = req.body.id;
    let temp = [id];
    con.insert("delete from host_tb where id=?", [id]);
    con.query("select * from host_tb", function(data) {
        res.send(data);
    });
}
module.exports = {
    store: store,
    gethost: gethost,
    insert_table: insert_table,
    deleted_table: deleted_table
}