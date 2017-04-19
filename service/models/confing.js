/*用户数据模型*/

var query = require('../common/mysql.js');

module.exports = {
    edit: function (options, callback) {
        var sql = "update confing set content = '" + options.content + "' where id = '" + options.id + "'";
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    details: function (id, callback) {
        var sql = "select * from confing where id = "+ id;
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    getList: function (options, callback) {
        var page = options.page;
        var limit = options.size;
        var sql = "select * from confing";

        query(sql, function (err, rows, fields) {
            if (rows) {
                var count = rows.length; //总记录数
                var total = count % limit ? parseInt(count / limit) + 1 : parseInt(count / limit); //总页数
                var sql2 = "select * from confing  limit " + limit * (page - 1) + "," + limit;
                query(sql2, function (err, rows, fields) {
                    callback(rows, count);
                })
            } else {
                console.log(err)
            }

        });
    },
};