/*登录验证控制器*/

var works = require('../models/works');

module.exports = {
    getList: function (req, res) {
        var params = {
            name: req.query.name || "",
            size: req.query.size || 10,
            categoryId: req.query.categoryId || -1,
            page: req.query.page || 1
        };
        works.getList(params, function (results, total) {
            if (results) {
                res.json({ code: 1, data: results, total: total });
            }
        })

    },
    query: function (req, res) {
        var params = {
            size: req.query.size || 10,
            categoryId: req.query.categoryId || -1,
            page: req.query.page || 1
        };
        works.query(params, function (results, total) {
            if (results) {
                res.json({ code: 1, data: results , total : total });
            }
        })

    },
    add: function (req, res) {
        var params = req.body;
        works.add(params, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    edit: function (req, res) {
        var params = req.body;
        works.edit(params, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    thumbUp: function (req, res) {
        var id = req.query.id;
        works.thumbUp(id, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    browse: function (req, res) {
        var id = req.query.id;
        works.browse(id, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    remove: function (req, res) {
        var id = req.query.id;
        works.remove(id, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    batchremove: function (req, res) {
        var ids = req.query.ids;
        works.batchremove(ids, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    details: function (req, res) {
        var ids = req.query.ids;
        works.details(ids, function (results) {
            if (results) {
                res.json({code : 1,data :results });
            }
        })

    }
};
