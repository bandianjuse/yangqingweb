/*用户数据模型*/

var query = require('../common/mysql.js');

module.exports = {
    getList: function (options, callback) {
        var title = options.title;
        var categoryId = options.categoryId;
        var page = options.page;
        var limit = options.size;
        var sql = "select * from news where title like '%" + title + "%' and  categoryId = '" + categoryId + "' ";

        query(sql, function (err, rows, fields) {
            if (rows) {
                var count = rows.length; //总记录数
                var total = count % limit ? parseInt(count / limit) + 1 : parseInt(count / limit); //总页数
                var sql2 = "select * from news where title like '%" + title + "%'  and  categoryId = '" + categoryId + "' order by id desc limit " + limit * (page - 1) + "," + limit;
                query(sql2, function (err, rows, fields) {
                    callback(rows, count);
                })
            } else {
                console.log(err)
            }

        });
    },
    details: function (ids, callback) {
        var sql = "select * from news where id in ("+ ids + ")";
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    add: function (options, callback) {
        var imagePath = "";
        if (options.imagePath != undefined) imagePath = options.imagePath;
        var sql =
            "insert into news(" +
            "title," +
            "categoryId," +
            "imagePath," +
            "smallText," +
            "newsText" +
            ")" +
            "values(" +
            "'" + options.title + "'," +
            options.categoryId + "," +
            "'" + imagePath + "'," +
            "'" + options.smallText + "'," +
            "'" + options.newsText + "'" +
            ")";
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    edit: function (options, callback) {
        var imagePath = "";
        if (options.imagePath != undefined) imagePath = options.imagePath;
        var sql = "update news set title = '" + options.title + "',imagePath = '" + options.imagePath + "',smallText = '" + options.smallText + "',newsText = '" + options.newsText + "'  where id = '" + options.id + "'";
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    thumbUp: function (id, callback) {
        var sql = "update news set likeNum = likeNum + 1 where id = " + id;
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    browse: function (id, callback) {
        var sql = "update news set browseNum = browseNum + 1 where id = " + id;
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    remove: function (id, callback) {
        var sql = "delete from news where id = "+ id;
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    batchremove: function (ids, callback) {
        var sql = "delete from news where id in ("+ ids + ")";
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    }
};