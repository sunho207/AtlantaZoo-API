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
  var username = req.params.username;
  var password = req.params.password;

  // connection.query('SELECT * FROM USERS WHERE Username=' + username + 'AND Password=' + password, function (error, results, fields) {

  connection.query('SELECT * FROM USERS', function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(400)
    } else {
      // const result = [{
      //   "username" : res[0].Username,
      //   "email" : res[0].Email,
      //   "role" : res[0].Role
      // }];
      res.json(res)
    }
  })
});

// router.post('/', function(req, res, next) {

//   var username = req.params.username;
//   var email = req.params.email;
//   var password = req.params.password;
//   var role = req.params.role;

//   // connection.query('SELECT * FROM USERS WHERE Username=' + username + 'AND Password=' + password, function (error, results, fields) {

//   connection.query('INSERT INTO USERS (Username, Email, Password, Role) VALUES(${username}, ${email}, ${password}, ${role})', function (error, results, fields) {
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

// Maybe we should delete all users using this instead of having a delete for visitor/staff
// router.delete(...)

module.exports = router;
