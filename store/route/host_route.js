const host_table = require("../host/host_table.js");
var store_host = function store_host(app, urlencodeParser) {
	// 查询
    app.post('/store/vip/store.do', urlencodeParser, function(req, res) {
        host_table.store(req, res);
    });
    // 更新表格
    app.post('/store/vip/gethost.do', urlencodeParser, function(req, res) {
        host_table.gethost(req, res);
    });
    // 插入数据
    app.post('/store/vip/insert_host.do', urlencodeParser, function(req, res) {
        host_table.insert_table(req, res);
    });
    // 删除数据
    app.post('/store/vip/deleted.do', urlencodeParser, function(req, res) {
        host_table.deleted_table(req, res);
    });
}
module.exports = store_host;