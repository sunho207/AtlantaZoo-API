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

router.get('/', function(req, res, next) {
  var exhibit = req.query.name;

  connection.query(`SELECT * FROM EXHIBIT WHERE NAME='${exhibit}'`, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(400)
    } else {
      res.json(results[0])
    }
  })
});

router.post('/log', function(req, res, next) {

  var username = req.body.username;
  var name = req.body.name;
  var date = req.body.date;
  var sort_field = req.query.sort_field
  var sort_direction = req.query.sort_direction

  connection.query(`INSERT INTO VISITS_EXHIBIT (Vuser, Ename, Date_time) VALUES(
        '${username}', '${name}', '${date}')
        ${ sort_field && sort_direction ? `ORDER BY ${sort_field} ${sort_direction}` : ''}
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
