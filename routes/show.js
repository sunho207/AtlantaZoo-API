var express = require('express');
var router = express.Router();
var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'academic-mysql.cc.gatech.edu',
  user: 'cs4400_group40',
  password: 'yKJo0o4G',
  database: 'cs4400_group40'
})

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

router.post('/', function(req, res, next) {

  var name = req.body.name;
  var exhibit = req.body.exhibit;
  var username = req.body.username;
  var date = req.body.date;

  connection.query(`INSERT INTO SHOWS (Name, Date_time) VALUES(
      '${name}', '${date}')`, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(400)
      response = {
        'success': false
      };
      res.json(response)
    } else {
      connection.query(`INSERT INTO HOSTS (Suser, Sname, Date_time) VALUES(
          '${username}', '${name}', '${date}')`, function (error, results, fields) {
        if (error) {
          console.log(error)
          res.status(400)
          response = {
            'success': false
          };
          res.json(response)
        } else {
          connection.query(`INSERT INTO LOCATED_IN (Sname, Date_time, Ename) VALUES(
              '${name}', '${date}', '${exhibit}')`, function (error, results, fields) {
            if (error) {
              console.log(error)
              res.status(400)
              response = {
                'success': false
              };
              res.json(response)
            } else {
              response = {
                'success': true
              };
              res.json(response)
            }
          })
        }
      })
    }
  })
});

router.delete('/:name/:date', function(req, res, next) {
  var name = req.params.name;
  var date = req.params.date;
  connection.query(`DELETE FROM SHOWS WHERE Name='${name}' AND Date_time='${date}'`, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(400)
    } else {
      response = {
        'success': true
      };
      res.json(response)
    }
  })
});

router.post('/log', function(req, res, next) {

  var username = req.body.username;
  var name = req.body.name;
  var date = req.body.date;

  connection.query(`INSERT INTO VISITS_SHOW (Vuser, Sname, Date_time) VALUES(
        '${username}', '${name}', '${date}')
      `, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(400)
      response = {
        'success': false
      };
      res.json(response)
    } else {
      response = {
        'success': true
      }; 
      res.json(response)
    }
  })
});

module.exports = router;
