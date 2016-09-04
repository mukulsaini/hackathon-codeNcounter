var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');

var app = express();


// ConnectionString is for connection -> username : postgres, password -> root123, database -> happiness
// You have to change it according to your password and username
var connectionString =  'postgres://postgres:root123@localhost:5432/happiness';

var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
	//
  res.sendFile(path.join(__dirname, '../views', 'index.html'));

});


router.get('/search', function(req, res, next) {
	//
  res.sendFile(path.join(__dirname, '../views', 'search.html'));

});
router.get('/list', function(req, res, next) {
	//
  res.sendFile(path.join(__dirname, '../views', 'list.html'));

});
router.get('/discussion', function(req, res, next) {
	//
  res.sendFile(path.join(__dirname, '../views', 'discussion.html'));

});
router.get('/answer', function(req, res, next) {
	//
  res.sendFile(path.join(__dirname, '../views', 'answer.html'));

});
router.post('/view_user', function(req, res) {

var results =[];

  pg.connect(connectionString, function(err, client, done) {
     // Handle connection errors
     if(err) {
       done();
       console.log(err);
       return res.status(500).json({ success: false, data: err});
     }

var query = client.query("SELECT * FROM students where name='"+req.body.name1+"'");

     query.on('row', function(row) {
         results.push(row);
      });

     query.on('end', function() {
         done();
         //console.log(results);
         return res.json(results);
     });
 });
    return 0;


});
router.post('/view_user1', function(req, res) {

var results =[];

  pg.connect(connectionString, function(err, client, done) {
     if(err) {
       done();
       console.log(err);
       return res.status(500).json({ success: false, data: err});
     }

     var query = client.query("SELECT * FROM alumni where name='"+req.body.name1+"'");

     query.on('row', function(row) {
         results.push(row);
      });

     query.on('end', function() {
         done();
         return res.json(results);
     });
   });
      return 0;
   });

   router.post('/add_ques', function(req, res) {

     pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

         var query = client.query("INSERT INTO discussion values('"+req.body.username+"','"+req.body.question+"')");
      });
         return res.json({});
    });
    router.post('/add_ans', function(req, res) {

      pg.connect(connectionString, function(err, client, done) {
         if(err) {
           done();
           console.log(err);
           return res.status(500).json({ success: false, data: err});
         }

          var query = client.query("INSERT INTO answer values('"+req.body.username+"','"+req.body.answer+"','"+req.body.id+"')");
       });
          return res.json({});
     });
    router.post('/view_ques', function(req, res) {

    var results =[];

      pg.connect(connectionString, function(err, client, done) {
         if(err) {
           done();
           console.log(err);
           return res.status(500).json({ success: false, data: err});
         }


         var query = client.query("SELECT * FROM discussion");

         query.on('row', function(row) {
             results.push(row);
          });

         query.on('end', function() {
             done();
             //console.log(results);
             return res.json(results);
         });
       });
          return 0;
       });
       router.post('/view_ans', function(req, res) {

       var results =[];

         pg.connect(connectionString, function(err, client, done) {
            if(err) {
              done();
              console.log(err);
              return res.status(500).json({ success: false, data: err});
            }


            var query = client.query("SELECT * FROM answer where id='"+req.body.id+"'");

            query.on('row', function(row) {
                results.push(row);
             });

            query.on('end', function() {
                done();
                //console.log(results);
                return res.json(results);
            });
          });
             return 0;
          });
   router.post('/add_fav', function(req, res) {

     pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

         client.query("INSERT INTO favourites values('"+req.body.username+"','"+req.body.favusername+"')");

      });
         return 0;
    });

    router.post('/get_fav', function(req, res) {

    var results =[];

      pg.connect(connectionString, function(err, client, done) {
         if(err) {
           done();
           console.log(err);
           return res.status(500).json({ success: false, data: err});
         }

         var query = client.query("SELECT * FROM favourites where username='"+req.body.username+"'");

         query.on('row', function(row) {
             results.push(row);
          });

         query.on('end', function() {
             done();
             //console.log(results);
             return res.json(results);
         });
       });
          return 0;
       });
       router.post('/get_data', function(req, res) {

       var results =[];

         pg.connect(connectionString, function(err, client, done) {
            if(err) {
              done();
              console.log(err);
              return res.status(500).json({ success: false, data: err});
            }


            var query = client.query("SELECT * FROM alumni");

            query.on('row', function(row) {
                results.push(row);
             });

            query.on('end', function() {
                done();
                //console.log(results);
                return res.json(results);
            });
          });
             return 0;
          });


router.get('/updateDetail', function(req, res, next) {
	//
  res.sendFile(path.join(__dirname, '../views', 'updateDetail.html'));

});

router.post('/userData', function(req, res) {

var results =[];

  pg.connect(connectionString, function(err, client, done) {
     // Handle connection errors
     if(err) {
       done();
       console.log(err);
       return res.status(500).json({ success: false, data: err});
     }
console.log(req.body);
  //    client.query("INSERT INTO students values('sd', 'sda', 'cse', '97832', 'sda@efwk', 'about', 'dfsajk')");
  if (req.body.isAlumni == 'true') {
    var query = client.query("SELECT * FROM alumni where name='"+req.body.name+"';");

  }else {
    console.log("SELECT * FROM students where name='"+req.body.name+"';");
    var query = client.query("SELECT * FROM students where name='"+req.body.name+"';");

  }

     query.on('row', function(row) {
         results.push(row);
      });

     query.on('end', function() {
         done();
         //console.log(results);
         return res.json(results);
     });
 });
  //  return 0;


});


router.post('/userDataUpdate', function(req, res) {


  pg.connect(connectionString, function(err, client, done) {
     // Handle connection errors
     if(err) {
       done();
       console.log(err);
       return res.status(500).json({ success: false, data: err});
     }
     console.log(req.body);
  //    client.query("INSERT INTO students values('sd', 'sda', 'cse', '97832', 'sda@efwk', 'about', 'dfsajk')");
  if (req.body.isAlumni == 'true') {

    var query = client.query("UPDATE alumni set companyname ='"+req.body.companyname+"',  email ='"+req.body.email+"', phoneno ='"+req.body.phoneno+"', about ='"+req.body.about+"',timings ='"+req.body.timings+"',jobopenings ='"+req.body.jobopenings+"' where name = '"+req.body.name+"';");
  }else {
    console.log("UPDATE students set year ='"+req.body.year+"', branch='"+req.body.branch+"', email ='"+req.body.email+"', phoneno ='"+req.body.phoneno+"', about ='"+req.body.about+"',timings ='"+req.body.timings+"' where name = '"+req.body.name+"';");
    var query = client.query("UPDATE students set year ='"+req.body.year+"', branch='"+req.body.branch+"', email ='"+req.body.email+"', phoneno ='"+req.body.phoneno+"', about ='"+req.body.about+"',timings ='"+req.body.timings+"' where name = '"+req.body.name+"';");
  }
  return res.json({name : "mukul"});


 });
 //return res.json({name : "mukul"});


});


router.post('/register', function(req, res) {

var results =[];
  pg.connect(connectionString, function(err, client, done) {
     // Handle connection errors
     if(err) {
       done();
       console.log(err);
       return res.status(500).json({ success: false, data: err});
     }
    // console.log(req.body);
      client.query("INSERT INTO users values('"+req.body.name+"', '"+req.body.password+"', '"+req.body.isAlumni+"')");
      if (req.body.isAlumni) {
        var query = client.query("INSERT INTO alumni(name) values('"+req.body.name+"')");
      }else {
        var query = client.query("INSERT INTO students(name) values('"+req.body.name+"')");
      }



 });
 req.body.username = req.body.name;
 results.push(req.body);
return res.json(results);


});

router.post('/login', function(req, res) {
    var results = [];
    pg.connect(connectionString, function(err, client, done) {
       if(err) {
         done();
         console.log(err);
         return res.status(500).json({ success: false, data: err});
       }
       var query = client.query("SELECT * FROM users where username = '"+req.body.name+"' and password = '"+req.body.password+"';");

       query.on('row', function(row) {
           results.push(row);
       });

      query.on('end', function() {
           done();
           return res.json(results);
       });
   });
});




module.exports = router;
