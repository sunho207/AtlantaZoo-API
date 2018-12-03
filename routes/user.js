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
  var email = req.query.email;
  var password = req.query.password;

  connection.query(`SELECT * FROM USERS WHERE Email='${email}' AND Password='${password}'`, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(400)
      response = {
        'success': false
      };
      res.json(response)
    } else {
      if (results[0]) {
        res.json({
          username: results[0].Username,
          email: results[0].Email,
          role: results[0].Role
        })
      } else {
        res.status(400)
        response = {
          'success': false
        };
        res.json(response)
      }
    }
  })
});

router.post('/', function(req, res, next) {

  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var role = req.body.role;

  connection.query(`INSERT INTO USERS (Username, Email, Password, Role) VALUES('${username}', '${email}', '${password}', '${role}')`, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(400)
      response = {
        'success': false
      };
      res.json(response)
    } else {
      if (role == 'staff') {
        connection.query(`INSERT INTO STAFF (Username) VALUES('${username}')`, function (error, results, fields) {
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
      } else {
        connection.query(`INSERT INTO VISITOR (Username) VALUES('${username}')`, function (error, results, fields) {
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
    }
  })
});

router.delete('/visitor/:username', function(req, res, next) {
  var username = req.params.username;
  connection.query(`DELETE FROM VISITOR WHERE Username='${username}'`, function (error, results, fields) {
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

router.delete('/staff/:username', function(req, res, next) {
  var username = req.params.username;
  connection.query(`DELETE FROM STAFF WHERE Username='${username}'`, function (error, results, fields) {
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

module.exports = router;
