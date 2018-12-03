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

// router.post('/', function(req, res, next) {

//   var name = req.params.name;
//   var exhibitID = req.params.exhibit_id;
//   var userID = req.params.user_id;
//   var date = req.params.date;

//   connection.query('INSERT INTO SHOWS (Name, Date_time) VALUES(${name}, ${date})', function (error, results, fields) {
//     if (error) {
//       console.log(error)
//       res.status(400)
//       response = {
//         'success': False
//       };
//       res.json(response)
//     } else {
//       response = {
//         'success': True
//       }; 
//       res.json(response)
//     }
//   })
// });

// router.post('/log', function(req, res, next) {

//   var userID = req.params.user_id;
//   var showID = req.params.show_id;
//   var date = req.params.date;

//   // connection.query('SELECT * FROM USERS WHERE Username=' + username + 'AND Password=' + password, function (error, results, fields) {

//   connection.query('INSERT INTO VISITS_SHOW (Vuser, Sname, Date_time) VALUES(${userID}, ${showID}, ${date})', function (error, results, fields) {
//     if (error) {
//       console.log(error)
//       res.status(400)
//       response = {
//         'success': False
//       };
//       res.json(response)
//     } else {
//       response = {
//         'success': True
//       }; 
//       res.json(response)
//     }
//   })
// });

// delete show
// router.delete(..)
// DELETE * FROM SHOW WHERE Name = $Name AND Date = $Date



module.exports = router;
