var db = require('../db');

//用户注册
exports.register = function(req, res){

    var userName = req.param("userName");
    var pwd = req.param("pwd");

    db.addUser(userName,pwd,res);
};

//用户登陆
exports.login = function(req, res){

    var userName = req.param("userName");
    var pwd = req.param("pwd");
    console.log("userName::"+userName);
    db.login(userName,pwd,req,res);

}

//用户注销
exports.logout = function(req, res){
    req.session.username = "";
    req.session.pwd = "";
    console.log(req.session.username+":"+req.session.pwd);
    if(req.session.username==""&&req.session.pwd==""){
        res.send({tag:"y"});
    }
}

//获取用户名
exports.getUserName = function(req, res){
    var username = req.session.username;
    if(username==null||username==""){
        res.send({tag:"n"});
    }else{
        res.send({username:username,tag:"y"});
    }
}

//获取用户名
exports.savePosition = function(req, res){
    var lng = req.param("lng");
    var lat = req.param("lat");
    var time = req.param("time");
    db.savePosition(time,lng,lat,req.session.username);
}

