'use strict';

var express = require('express');
var mysql = require('mysql');
var app = express();


var connection = mysql.createConnection({
  host     : '52.206.125.129',
  user     : 'mysqluser',
  password : 'quincy1234',
  database : 'dactilium'
});

app.get('/', function (req, res) {
  //res.send('Hello World!');

  connection.connect();

  connection.query('select * from user', function(err, rows, fields) {

    res.send(JSON.stringify(rows));
    res.send(JSON.stringify(fields));
  });

  connection.end();

});

app.get('/create_user', function(req, res){

  //let first_name =  req.parm('first_name');
  //let last_name =  req.parm('last_name');
  //let password =  req.parm('password');
  //let email =  req.parm('email');

  let first_name = 'frank';
  let last_name = 'back';
  let password = 'asdf';
  let email = 'asdf.asdf@company.com'

  let sql = "call create_user(@outvar,?,?,?,?)";
  let params = [first_name, last_name, email, password];
  sql = mysql.format(sql, params);
  console.log('the stored procedure call is ' + sql);

  connection.connect();
  connection.query("SET @outvar = NULL");
  connection.query(sql, function(err,rows,fields){
    console.log('error is => ' + err);
  });
  connection.query("SELECT @outvar as outvar" , function(err,response){
    if(err) console.log(err);
    console.log(response);
  })
  connection.end();

});

app.post('/delete_user', function(req, res){

});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
