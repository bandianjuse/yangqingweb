/*用户数据模型*/

var query = require('../common/mysql.js');

module.exports = {
    getList: function (options, callback) {
        var name = options.name;
        var categoryId = options.categoryId;
        var page = options.page;
        var limit = options.size;
        var sql = "select * from works where name like '%" + name + "%' ";
        if(categoryId != -1){
            sql +=  "and  categoryId like  '%" + categoryId + "%'";
        }

        query(sql, function (err, rows, fields) {
            if (rows) {
                var count = rows.length; //总记录数
                var total = count % limit ? parseInt(count / limit) + 1 : parseInt(count / limit); //总页数
                var sql2 = "select * from works where name like '%" + name + "%' order by id desc limit " + limit * (page - 1) + "," + limit;
                if(categoryId != -1){
                    sql2 = "select * from works where name like '%" + name + "%'  and  categoryId like '%" + categoryId + "%' order by id desc limit " + limit * (page - 1) + "," + limit;

                }
                query(sql2, function (err, rows, fields) {
                    callback(rows, count);
                })
            } else {
                console.log(err)
            }

        });
    },
    query: function (options, callback) {
        var categoryId = options.categoryId;
        var page = options.page;
        var limit = options.size;
        var sql = "select * from category where parentId = " + categoryId;
        var sql2 = "select * from works where categoryId like '%" + categoryId + "%' ";
        query(sql, function (err, rows, fields) {
            if (rows) {
                for(var i=0;i<rows.length;i++){
                    var id = rows[i].id;
                    sql2 += "or categoryId like '%" + id + "%' "
                }
                if(categoryId == -1){
                    sql2 = "select * from works ";
                }
                query(sql2, function (err, rows, fields) {
                    if (rows) {
                        var count = rows.length; //总记录数
                        var total = count % limit ? parseInt(count / limit) + 1 : parseInt(count / limit); //总页数
                        var sql3 = sql2 + " order by id desc limit " + limit * (page - 1) + "," + limit;
                        query(sql3, function (err, rows, fields) {
                            callback(rows, count);

                        })
                    } else {
                        console.log(err)
                    }

                });
            }
        })
    },
    add: function (options, callback) {
        var imagePath = "";
        if (options.imagePath != undefined) imagePath = options.imagePath;
        var sql =
            "insert into works(" +
            "name," +
            "categoryId," +
            "imagePath," +
            "customer," +
            "smallText," +
            "content" +
            ")" +
            "values(" +
            "'" + options.name + "'," +
            "'" + options.categoryId + "'," +
            "'" + imagePath + "'," +
            "'" + options.customer + "'," +
            "'" + options.smallText + "'," +
            "'" + options.content + "'" +
            ")";
        console.log(sql)
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    edit: function (options, callback) {
        var imagePath = "";
        if (options.imagePath != undefined) imagePath = options.imagePath;
        var sql = "update works set name = '" + options.name + "',imagePath = '" + options.imagePath + "',categoryId = '" + options.categoryId + "',customer = '" + options.customer + "',smallText = '" + options.smallText + "',content = '" + options.content + "'  where id = '" + options.id + "'";
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    thumbUp: function (id, callback) {
        var sql = "update works set likeNum = likeNum + 1 where id = " + id;
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    browse: function (id, callback) {
        var sql = "update works set browseNum = browseNum + 1 where id = " + id;
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    remove: function (id, callback) {
        var sql = "delete from works where id = "+ id;
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    batchremove: function (ids, callback) {
        var sql = "delete from works where id in ("+ ids + ")";
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    },
    details: function (ids, callback) {
        var sql = "select * from works where id in ("+ ids + ")";
        console.log(sql)
        query(sql, function (err, rows, fields) {
            callback(rows);
        })
    }
};