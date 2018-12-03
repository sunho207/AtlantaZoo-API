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


// router.get('/', function(req, res, next) {

//   var name = req.params.name;
//   var exhibitID = req.params.exhibit_id;
//   var date = req.params.date;
//   var sort = req.params.sort;
//   //Add sort**

//   connection.query('SELECT * FROM SHOW_SEARCH WHERE Name LIKE ${name} AND Date LIKE ${date} AND Exhibit LIKE ${exhibitID}', function (error, results, fields) {
//     if (error) {
//       console.log(error)
//       res.status(400)
//     } else {
//       res.json(results)
//     }
//   })
// });


// router.get('/history', function(req, res, next) {

//   // I think inputs were off on the doc for this so this may need to be completely redone

//   connection.query('SELECT * FROM SHOW_HISTORY WHERE Username = $Username AND Name LIKE $Name AND Date LIKE $Date AND Exhibit LIKE $Exhibit', function (error, results, fields) {
//     if (error) {
//       console.log(error)
//       res.status(400)
//     } else {
//       res.json(results)
//     }
//   })
// });

module.exports = router;
