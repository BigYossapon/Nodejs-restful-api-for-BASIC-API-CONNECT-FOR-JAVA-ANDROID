var mysql = require('mysql');
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

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "user_information"
});

con.connect(function(err){
    if (err) throw err;
    console.log("Connected!");

   
        app.get('/user/get', function (req, res) {
          // console.log('get data');
          // res.send(app.data);
          sql_select = "select * from user";
          con.query(sql_select, function(err,result){
              if (err) throw err;
              console.log(result);
              res.send(result);
            });
        });

        app.get('/user/get/:ID', function (req, res) {
          // console.log('get data');
          // res.send(app.data);
          req.params.ID;
          sql_select = "select * from user";
          con.query(sql_select, function(err,result){
              if (err) throw err;
              console.log(result);
              res.send(result);
            });
        });
         
        app.post('/user/add', function (req, res) {
            // console.log('add data');
            // req.body.id = app.data.length +1;
            // app.data.push(req.body);
            // res.send(app.data);
            const Name = req.body.Name;
            const Phone = req.body.Phone;
            const Mail = req.body.Mail;
            const Address = req.body.Address;

            sql_insert = 'insert into user (Name,Phone,Mail,Address) VALUES(?,?,?,?)';
            con.query(sql_insert,[Name,Phone,Mail,Address], function(err,result){
                if (err) throw err;
                console.log("Insert Complete");
                 res.send("Insert Complete");
            });
        });

     
         
        app.put('/user/edit', function (req, res) {
          // if(req.body.id)
          //   app.data[req.body.id-1] = req.body;
          // console.log("edit data!");
          // res.send(app.data);
          const Name = req.body.Name;
          const Phone = req.body.Phone;
          const Mail = req.body.Mail;
          const Address = req.body.Address;
          const ID = req.body.ID;
          sql_update = "update user set Name=?,Phone=?,Mail=?,Address=? where ID=?";
          con.query(sql_update,[Name,Phone,Mail,Address,ID],function(err,result){
              if (err) throw err;
              console.log("Update Complete!");
              res.send("Update Complete!");
          });
        });
         
        app.delete('/user/delete/:ID', function (req, res) {
          // if(req.body.id)
          //   app.data.splice(req.body.id-1,1);
          // console.log("delete data!");
          // res.send(app.data);
          const id = req.params.ID;
          sql_delete = "DELETE FROM user WHERE ID=?";
          con.query(sql_delete,[id] ,function(err,result){
        if (err) throw err;
        console.log("Delete Complete!");
        res.send("Delete Complete!");
    });

        });
    



    
});

var server = app.listen(3000, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Application Run At http://%s:%s",host,port)
});

