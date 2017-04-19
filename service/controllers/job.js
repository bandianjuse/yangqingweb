/*登录验证控制器*/

var job = require('../models/job');

module.exports = {
    getList: function (req, res) {
        var params = {
            name: req.query.name || "",
            size: req.query.size || 10,
            page: req.query.page || 1
        };
        job.getList(params, function (results, total) {
            if (results) {
                res.json({ code: 1, data: results, total: total });
            }
        })

    },
    add: function (req, res) {
        var params = req.body;
        job.add(params, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    edit: function (req, res) {
        var params = req.body;
        job.edit(params, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    remove: function (req, res) {
        var id = req.query.id;
        job.remove(id, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    batchremove: function (req, res) {
        var ids = req.query.ids;
        job.batchremove(ids, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    details: function (req, res) {
        var ids = req.query.ids;
        job.details(ids, function (results) {
            if (results) {
                res.json({code : 1 , data :results });
            }
        })

    }
};
