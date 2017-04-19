/*用户数据模型*/

var query = require('../common/mysql.js');

module.exports = {
    getList: function (options, callback) {
        var name = options.name;
        var parentId = options.parentId;
        var page = options.page;
        var limit = options.size;
        var sql = "select * from category where name like '%" + name + "%' ";
        if(parentId != -1){
            sql +=  "and  parentId = '" + parentId + "'";
        }

        query(sql, function (err, rows, fields) {
            if (rows) {
                var count = rows.length; //总记录数
                var total = count % limit ? parseInt(count / limit) + 1 : parseInt(count / limit); //总页数
                var sql2 = "select * from category where name like '%" + name + "%' order by id desc limit " + limit * (page - 1) + "," + limit;
                if(parentId != -1){
                    sql2 = "select * from category where name like '%" + name + "%'  and  parentId = '" + parentId + "' order by id desc limit " + limit * (page - 1) + "," + limit;

                }
                query(sql2, function (err, rows, fields) {
                    callback(rows, count);
                })
            } else {
                console.log(err)
            }

        });
    },
    add: function (options, callback) {
        var parentId = 0;
        if (options.parentId != undefined) parentId = options.parentId;
        var sql =
            "insert into category(" +
            "name," +
            "parentId" +
            ")" +
            "values(" +
            "'" + options.name + "'," +
            "'" + parentId + "'" +
            ")";
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    edit: function (options, callback) {
        var sql = "update category set name = '" + options.name + "'  where id = '" + options.id + "'";
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    remove: function (id, callback) {
        var sql = "delete from category where id = "+ id;
        var sql2 = "delete from category where parentId = "+ id;
        query(sql2, function (err, rows, fields) {
            query(sql, function (err, rows, fields) {
                callback(rows);
            })
        })
    }
};