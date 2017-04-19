/*登录验证控制器*/

var confing = require('../models/confing');

module.exports = {
    edit: function (req, res) {
        var params = req.body;
        confing.edit(params, function (results) {
            if (results) {
                res.json({code : 1});
            }
        })

    },
    details: function (req, res) {
        var id = req.query.id;
        confing.details(id, function (results) {
            if (results) {
                res.json({code : 1,data : results[0] });
            }
        })

    },
    getList: function (req, res) {
        var params = {
            size: req.query.size || 10,
            page: req.query.page || 1
        };
        confing.getList(params, function (results, total) {
            if (results) {
                res.json({ code: 1, data: results, total: total });
            }
        })

    }
};
