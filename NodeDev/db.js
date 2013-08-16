/**
 * Created with JetBrains WebStorm.
 * User: zhf
 * Date: 13-2-17
 * Time: 下午9:02
 * To change this template use File | Settings | File Templates.
 */

var mongodb = require('mongodb');
var server = new mongodb.Server('localhost',27017,{auto_reconnect:true});
var db = new mongodb.Db('mydb',server,{safe:true});
var userDao = {};

//添加新用户
userDao.addUser = function(userName,pwd,res){
    db.open(function(err,db){
            console.log("open");
            if(!err){
                db.collection('na',{safe:true},function(err,collection){
                    console.log("collection");
                    collection.find({username:userName}).toArray(function(err,docs){
                        console.log('find');
                        if(docs.length == 0){
                            collection.insert({username:userName,pwd:pwd},{safe:true},function(err,result){
                                console.log('insert');
                                console.log(result);
                                db.close();
                                res.send({msg:'注册成功!',tag:'y'});
                            });
                        }else{
                            db.close();
                            res.send({msg:'用户名已存在!',tag:'n'});
                        }
                    });

                });
            }else{
                console.log("open失败");
            }
        }
    );
};

//用户登陆
userDao.login = function(userName,pwd,req,res){
    db.open(function(err,db){
            console.log("open");
            if(!err){
                db.collection('na',{safe:true},function(err,collection){
                    console.log("collection");
                    collection.find({username:userName}).toArray(function(err,docs){
                        console.log('find');
                        if(docs.length == 0){
                            res.send({msg:'用户名不存在!',tag:'n'});
                            db.close();
                        }else{
                           var dbUseName = docs[0].username;
                           var dbPWD = docs[0].pwd;
                           if(dbUseName!=userName||dbPWD!=pwd){
                               res.send({msg:'用户名或密码不正确!',tag:'n'});
                               db.close();
                           }
                            if(dbUseName==userName&&dbPWD==pwd){

                                req.session.username = userName;
                                req.session.pwd = pwd;

                                res.send({msg:'登陆成功!',tag:'y'});
                                db.close();
                            }
                        }
                    });

                });
            }else{
                console.log("open失败");
            }
        }
    );
};

//更新用户位置信息
userDao.savePosition = function(time,lng,lat,username){
    db.open(function(err,db){
            console.log("open");
            if(!err){
                db.collection('na',{safe:true},function(err,collection){
                        collection.find({username:username,time:time}).toArray(function(err,docs){
                            console.log('find');
                            if(docs.length == 0){
                                console.log("collection");
                                var posi = lng + "," + lat;
                                var r = {username:username,tag:'position',time:time,posi:posi};
                                collection.insert(r,{safe:true},function(err,result){
                                    console.log('更新位置信息');
                                });
                                db.close();
                            }else{
                                db.close();
                            }
                        });
                });
            }else{
                console.log("open失败");
            }
        }
    );
};

module.exports = userDao;