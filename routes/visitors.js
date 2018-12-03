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

  var sort_field = req.query.sort_field
  var sort_direction = req.query.sort_direction

  connection.query(`SELECT * FROM VIEW_VISITORS
        ${ sort_field && sort_direction ? `ORDER BY ${sort_field} ${sort_direction}` : ''}
      `, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(400)
    } else {
      res.json(results)
    }
  })
});

module.exports = router;
