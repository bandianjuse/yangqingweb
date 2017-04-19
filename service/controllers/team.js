/*登录验证控制器*/

var team = require('../models/team');

module.exports = {
    getList: function (req, res) {
        var params = {
            name: req.query.name || "",
            size: req.query.size || 10,
            page: req.query.page || 1
        };
        team.getList(params, function (results, total) {
            if (results) {
                res.json({ code: 1, data: results, total: total });
            }
        })

    },
    add: function (req, res) {
        var params = req.body;
        team.add(params, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    edit: function (req, res) {
        var params = req.body;
        team.edit(params, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    remove: function (req, res) {
        var id = req.query.id;
        team.remove(id, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    batchremove: function (req, res) {
        var ids = req.query.ids;
        team.batchremove(ids, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    }
};
