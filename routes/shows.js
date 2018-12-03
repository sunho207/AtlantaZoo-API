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

  var name = req.query.name;
  var exhibit = req.query.exhibit;
  var date = req.query.date;
  var sort_field = req.query.sort_field
  var sort_direction = req.query.sort_direction

  connection.query(`SELECT * FROM SHOW_SEARCH
        WHERE Name LIKE '${name ? name : '%'}'
        ${ date ? `AND Date='${date}'` : ''}
        AND Exhibit LIKE '${exhibit ? exhibit : '%'}'
        ${ sort_field && sort_direction ? `ORDER BY ${sort_field} ${sort_direction}` : ''}
      `, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(400)
    } else {
      console.log(results)
      res.json(results)
    }
  })
});


router.get('/history', function(req, res, next) {

  var username = req.query.username
  var name = req.query.name
  var date = req.query.date
  var exhibit = req.query.exhibit
  var sort_field = req.query.sort_field
  var sort_direction = req.query.sort_direction

  connection.query(`SELECT * FROM SHOW_HISTORY
        WHERE Username = '${username}'
        AND Name LIKE '${name ? name : '%'}'
        ${ date ? `AND Date='${date}'` : ''}
        AND Exhibit LIKE '${exhibit ? exhibit : '%'}'
        ${ sort_field && sort_direction ? `ORDER BY ${sort_field} ${sort_direction}` : ''}
      `, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(400)
    } else {
      console.log(results)
      res.json(results)
    }
  })
});

module.exports = router;
