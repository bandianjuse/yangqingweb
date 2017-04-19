/*用户数据模型*/

var query = require('../common/mysql.js');

module.exports = {
    getList: function (options, callback) {
        var name = options.name;
        var page = options.page;
        var limit = options.size;
        var sql = "select * from job where name like '%" + name + "%' ";

        query(sql, function (err, rows, fields) {
            if (rows) {
                var count = rows.length; //总记录数
                var total = count % limit ? parseInt(count / limit) + 1 : parseInt(count / limit); //总页数
                var sql2 = "select * from job where name like '%" + name + "%' order by id desc limit " + limit * (page - 1) + "," + limit;
                query(sql2, function (err, rows, fields) {
                    callback(rows, count);
                })
            } else {
                console.log(err)
            }

        });
    },
    add: function (options, callback) {
        var imagePath = "";
        if (options.imagePath != undefined) imagePath = options.imagePath;
        var sql =
            "insert into job(" +
            "name," +
            "imagePath," +
            "content" +
            ")" +
            "values(" +
            "'" + options.name + "'," +
            "'" + imagePath + "'," +
            "'" + options.content + "'" +
            ")";
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    edit: function (options, callback) {
        var imagePath = "";
        if (options.imagePath != undefined) imagePath = options.imagePath;
        var sql = "update job set name = '" + options.name + "',imagePath = '" + options.imagePath + "',content = '" + options.content + "'  where id = '" + options.id + "'";
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    remove: function (id, callback) {
        var sql = "delete from job where id = "+ id;
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    batchremove: function (ids, callback) {
        var sql = "delete from job where id in ("+ ids + ")";
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    details: function (ids, callback) {
        var sql = "select * from job where id in ("+ ids + ")";
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    }
};