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
  var name = req.query.name
  var number_of_animals_min = req.query.number_of_animals_min
  var number_of_animals_max = req.query.number_of_animals_max
  var size_min = req.query.size_min
  var size_max = req.query.size_max
  var water_feature = req.query.water_feature
  var sort_field = req.query.sort_field
  var sort_direction = req.query.sort_direction

  connection.query(`SELECT * FROM EXHIBIT_SEARCH WHERE Name LIKE '${name ? name : '%'}'
      ${ number_of_animals_min && number_of_animals_max ? `AND Number_of_animals BETWEEN ${number_of_animals_min} AND ${number_of_animals_max}` : ''}
      ${ size_min && size_max ? `AND Size BETWEEN ${size_min} AND ${size_max}` : ''}
      ${ water_feature ? `AND Water_feature = '${water_feature}'` : ''}
      ${ sort_field && sort_direction ? `ORDER BY ${sort_field} ${sort_direction}` : ''}
      `
    , function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(400)
    } else {
      res.json(results)
    }
  })
});

router.get('/history', function(req, res, next) {

  var username = req.query.username
  var name = req.query.name;
  var numVisitsMin = req.query.number_of_visits_min;
  var numVisitsMax = req.query.number_of_visits_max;
  var date = req.query.date;
  var sort_field = req.query.sort_field
  var sort_direction = req.query.sort_direction

  if (sort_field == 'number_of_visits') {
    sort_field = 'NumVisits'
  }

  connection.query(`
        SELECT * FROM EXHIBIT_HISTORY
        WHERE Username = '${username}'
        AND Name LIKE '${name ? name : '%'}'
        ${ date ? `AND Date='${date}'` : ''}
        ${ numVisitsMin && numVisitsMax ? `NumVisits BETWEEN ${numVisitsMin} AND ${numVisitsMax}` : ''}
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
