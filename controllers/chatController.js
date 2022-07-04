exports.chat = function(req, res){
    if(!req.session.user){
        return (res.redirect("/users/authorization"));
    }
    res.render('chat', {name: 'Web-chat', user: req.session.user || null})
}