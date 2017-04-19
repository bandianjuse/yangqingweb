/*登录验证控制器*/

var news = require('../models/news');

module.exports = {
    getList: function (req, res) {
        var params = {
            title: req.query.title || "",
            size: req.query.size || 10,
            categoryId: req.query.categoryId || 1,
            page: req.query.page || 1
        };
        news.getList(params, function (results, total) {
            if (results) {
                res.json({ code: 1, data: results, total: total });
            }
        })

    },
    details: function (req, res) {
        var ids = req.query.ids;

        news.details(ids, function (results) {
            if (results) {
                res.json({code : 1,data: results});
            }
        })

    },
    add: function (req, res) {
        var params = req.body;
        news.add(params, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    edit: function (req, res) {
        var params = req.body;
        news.edit(params, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    thumbUp: function (req, res) {
        var id = req.query.id;
        news.thumbUp(id, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    browse: function (req, res) {
        var id = req.query.id;
        news.browse(id, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    remove: function (req, res) {
        var id = req.query.id;
        news.remove(id, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    batchremove: function (req, res) {
        var ids = req.query.ids;
        news.batchremove(ids, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    }
};
