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
  var ageMin = req.query.age_min;
  var ageMax = req.query.age_max;
  var species = req.query.species;
  var exhibit = req.query.exhibit;
  var type = req.query.type;
  var sort_field = req.query.sort_field
  var sort_direction = req.query.sort_direction

  connection.query(`SELECT * FROM ANIMAL_SEARCH WHERE
        Name LIKE '${name ? name : '%'}'
        AND Species LIKE '${species ? species : '%'}'
        ${ageMin && ageMax ? `AND Age BETWEEN ${ageMin} AND ${ageMax}` : ''}
        AND Exhibit LIKE '${exhibit ? exhibit : '%'}'
        ${type ? `AND Type='${type}'` : ''}
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
