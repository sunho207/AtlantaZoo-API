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

//   var animalID = req.params.animal_id;
//   // also have to check species??

//   connection.query('SELECT * FROM ANIMAL_DETAIL WHERE Name=${animalID}', function (error, results, fields) {
//     if (error) {
//       console.log(error)
//       res.status(400)
//     } else {
//       res.json(results)
//     }
//   })
// });


// router.post('/', function(req, res, next) {

//   var name = req.params.name;
//   // Update exhibit here too?
//   var exhibitID = req.params.exhibit_id;
//   var species = req.params.species;
//   var type = req.params.type;
//   var age = req.params.age;

//   connection.query('INSERT INTO ANIMAL (Name, Species, Age, Type) VALUES(${name}, ${species}, ${type}, ${age})', function (error, results, fields) {
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

// router.get('/care', function(req, res, next) {

//   //need name and species based on the google doc query

//   connection.query('SELECT * FROM ANIMAL_NOTE WHERE Name = $Name AND Species = $Species', function (error, results, fields) {
//     if (error) {
//       console.log(error)
//       res.status(400)
//     } else {
//       res.json(results)
//     }
//   })
// });

// router.post('/care', function(req, res, next) {

//   var userID = req.params.user_id;
//   var animalID = req.params.animal_id;
//   var note = req.params.note;
//   var date = req.params.date;

//   connection.query('INSERT INTO NOTE (Aname, Aspecies, Suser, Note, Date_time) VALUES(${userID}, ${animalID}, ${note}, ${date})', function (error, results, fields) {
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

// delete animal
// router.delte(...)
// DELETE * FROM ANIMAL WHERE Name = $Name AND Species = $Species


module.exports = router;
