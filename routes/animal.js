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
  var species = req.query.species;

  connection.query(`SELECT * FROM ANIMAL_DETAIL
    WHERE Name='${name ? name : '%'}'
    AND Species='${species ? species : '%'}'`, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(400)
    } else {
      res.json(results[0])
    }
  })
});


router.post('/', function(req, res, next) {

  var name = req.body.name;
  var exhibit = req.body.exhibit;
  var species = req.body.species;
  var type = req.body.type;
  var age = req.body.age;

  connection.query(`INSERT INTO ANIMAL (Name, Species, Age, Type) VALUES(
        '${name}', '${species}', '${age}', '${type}')
      `, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(400)
      response = {
        'success': false
      };
      res.json(response)
    } else {
      connection.query(`INSERT INTO LIVES_IN (Aname, Aspecies, Ename) VALUES(
            '${name}', '${species}', '${exhibit}')
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
    }
  })
});

router.delete('/:species/:name', function(req, res, next) {
  var species = req.params.species;
  var name = req.params.name;
  connection.query(`DELETE FROM ANIMAL WHERE Name='${name}' AND Species='${species}'`, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(400)
    } else {
      response = {
        'success': true
      };
      res.json(response)
    }
  })
});

router.get('/care', function(req, res, next) {

  var name = req.query.name
  var species = req.query.species;
  var sort_field = req.query.sort_field
  var sort_direction = req.query.sort_direction

  if (sort_field == 'staff') {
    sort_field = 'Staff_Member'
  }

  connection.query(`SELECT * FROM ANIMAL_NOTE
        WHERE Name LIKE '${name ? name : '%'}'
        AND Species LIKE '${species ? species : '%'}'
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

router.post('/care', function(req, res, next) {

  var username = req.body.username;
  var name = req.body.name;
  var species = req.body.species;
  var note = req.body.note;
  var date = req.body.date;

  connection.query(`INSERT INTO NOTE (Aname, Aspecies, Suser, Note, Date_time) VALUES(
      '${name}', '${species}', '${username}', '${note}', '${date}')`, function (error, results, fields) {
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
