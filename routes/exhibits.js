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
  connection.query('SELECT * FROM EXHIBIT', function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(400)
    } else {
      res.json(results)
    }
  })
});

// router.get('/history', function(req, res, next) {

//   var name = req.params.name;
//   var numVisitsMin = req.params.number_of_visits_min;
//   var numVisitsMax = req.params.number_of_visits_max;
//   var date = req.params.date;
//   var sort = req.params.sort;

//   connection.query('SELECT * FROM EXHIBIT_HISTORY WHERE Name = ${name} AND Time = ${date} AND NumVisits BETWEEN ($numVisitsMin AND $numVisitsMax)', function (error, results, fields) {
//     if (error) {
//       console.log(error)
//       res.status(400)
//     } else {
//       res.json(results)
//     }
//   })
// });

module.exports = router;
