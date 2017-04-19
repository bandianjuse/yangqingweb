/*登录验证控制器*/

var category = require('../models/category');

module.exports = {
    getList: function (req, res) {
        var params = {
            name: req.query.name || "",
            size: req.query.size || 10,
            parentId: req.query.parentId || -1,
            page: req.query.page || 1
        };
        category.getList(params, function (results, total) {
            if (results) {
                res.json({ code: 1, data: results, total: total });
            }
        })

    },
    add: function (req, res) {
        var params = req.body;
        category.add(params, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    edit: function (req, res) {
        var params = req.body;
        category.edit(params, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    remove: function (req, res) {
        var id = req.query.id;
        category.remove(id, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    }
};
