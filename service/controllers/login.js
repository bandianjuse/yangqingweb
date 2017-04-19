/*登录验证控制器*/

var user = require('../models/user');

module.exports = {
    loginCheck : function(req, res) {
        var  usrs = {
            user : req.body.user,
            password :  req.body.password
        };

        user.userLogin(usrs,function(results){
            if(results){
                if(results.length){
                    req.session.user = results[0];
                    res.json({code : 1});
                }else{
                    res.json({code : 0});
                }
            }
        })

    },
    loginValid : function(req, res) {
        if(req.session.user){
            res.json({code : 1});
        }else{
            res.json({code : 0});
        }
    },
    logout : function(req, res) {
        delete req.session.user;
        console.log(req.session.user)
        res.json({code : 1})
    },
    updateUser : function(req, res) {
        var initPassword = req.body.initPassword;
        var newPassword = req.body.newPassword;
        var query = {
            password : newPassword,
            userid : req.session.user.id
        };

        if(req.session.user.password == initPassword){
            user.updateUser(query,function(results){
                if(results){
                    res.json({code : 1})
                }
            })
        }else{
            res.json({code : 0})
        }

    }
};
