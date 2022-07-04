const { router } = require("../app.js");
const User = require("../models/user.js")

exports.registerPage = function(req, res){
    res.render("register", {title: "Web-chat", user: req.session.user || null});
}

exports.addUser = function(req, res){
    User.findOne({login: req.body.userName}, function(err, doc){
        if(!doc){
            let user = new User({login: req.body.userName, password: req.body.password});
            user.save(function(err, docs){
                if(err){
                    if(err.errors.login){
                        res.render("register", {errSelector: "userName", title: "Web-chat", userName: req.body.userName, password: req.body.password});
                    }
                    else if(err.errors.password){
                        res.render("register", {errSelector: "password", title: "Web-chat", userName: req.body.userName, password: req.body.password});
                    }
                    return console.error(err);
                } 
                user.done();
                res.send(`User ${user.login} has been registered`);
            })
        } else{
            res.render("register", {
                errMess: "A user with this name has already been registered",
                errSelector: "userName", title: "Web-chat",
                password: req.body.password, login: req.body.userName, 
                user: req.session.user || null
            })
        }
    })
}

exports.authorization = function(req, res){
    res.render("authorization", {title: "Web-chat", user: req.session.user || null});
}

exports.login = function(req, res){
    User.findOne({
        login: req.body.userName, password: req.body.password
    }, function(err, doc){
        if(!doc){
            res.render("authorization", {
                errMessage: "Incorrect password or username",
                title: "Web-chat",
                userName: req.body.userName,
                password: req.body.password
            })
        }
        else{
            req.session.user = {id: doc._id, name: doc.login}
            res.render("post-registration", {
                title: 'Web-chat',
                user: req.session.user || null
            })
        }
    })
}

exports.logout = function(req, res){
    delete req.session.user;
    res.redirect("/")
}