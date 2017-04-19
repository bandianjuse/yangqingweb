/*登录验证控制器*/

var service = require('../models/service');

module.exports = {
    getList: function (req, res) {
        var params = {
            name: req.query.name || "",
            size: req.query.size || 10,
            page: req.query.page || 1
        };
        service.getList(params, function (results, total) {
            if (results) {
                res.json({ code: 1, data: results, total: total });
            }
        })

    },
    add: function (req, res) {
        var params = req.body;
        service.add(params, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    edit: function (req, res) {
        var params = req.body;
        service.edit(params, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    remove: function (req, res) {
        var id = req.query.id;
        service.remove(id, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    batchremove: function (req, res) {
        var ids = req.query.ids;
        service.batchremove(ids, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    }
};
