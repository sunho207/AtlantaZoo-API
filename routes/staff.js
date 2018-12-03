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
  connection.query('SELECT * FROM VIEW_STAFF', function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(400)
    } else {
      res.json(results)
    }
  })
});

// router.get('/shows', function(req, res, next) {

//   var userID = req.params.user_id;

//   connection.query('SELECT * FROM STAFF_SHOWHIST WHERE Username = ${userID}', function (error, results, fields) {
//     if (error) {
//       console.log(error)
//       res.status(400)
//     } else {
//       res.json(results)
//     }
//   })
// });

module.exports = router;
