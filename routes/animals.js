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

//   var exhibitID = req.params.exhibit_id;
//   var name = req.params.name;
//   var ageMin = req.params.age_min;
//   var ageMax = req.params.age_max;
//   var species = req.params.species;
//   var type = req.params.type;
//   var sort = req.params.sort;

//   //have to sort?

//   connection.query('SELECT * FROM ANIMAL_SEARCH WHERE Name LIKE ${name} AND Species LIKE ${species} AND Age BETWEEN (${ageMin} AND ${ageMax}) AND Exhibit LIKE ${exhibitID}', function (error, results, fields) {
//     if (error) {
//       console.log(error)
//       res.status(400)
//     } else {
//       res.json(results)
//     }
//   })
// });

module.exports = router;
