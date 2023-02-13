var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
//const users = require('./user');
var datas =require('./user');
app.get('/getUsers', function(req,res){
    fs.readFile(__dirname + "/" + "user.json",'utf8',function(err,data){
        console.log(data);
        res.end(data);
    });
});

app.get('/getUsers/:id', function(req,res){
    fs.readFile(__dirname + "/" + "user.json",'utf8',function(err,data){
        var users = JSON.parse(data);
        var user = users["user" + req.params.id];
        console.log(user);
        res.end(JSON.stringify(user));
    });
});


app.post('/addUser', function(req,res){
    fs.readFile(__dirname + "/" + "user.json",'utf8',function(err,data){
        data = JSON.parse(data);
        data["user5"] = user["user5"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

app.post('/addUsers', (req, res) => {
    fs.readFile(__dirname + "/" + "user.json",'utf8',function(err,data){
        console.log('add data');
        req.body.id = data.length +1;
        datas.push(req.body);
        res.send(datas);
    });
});

app.put('/editUser/:ids', function(req,res){
    fs.readFile(__dirname + "/" + "user.json",'utf8',function(err,data){
        data = JSON.parse(data);
        delete data["user" + req.params.ids]; 
        res.end(JSON.stringify(data));
    });
});

app.delete('/delUser/:index', function(req,res){
    fs.readFile(__dirname + "/" + "user.json",'utf8',function(err,data){
        data = JSON.parse(data);
        delete data["user" + req.params.index]; 
        res.end(JSON.stringify(data));
    });
});


var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Application Run At http://%s:%s",host,port)
});