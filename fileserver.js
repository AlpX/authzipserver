#!/usr/bin/env node

/* fileserver.js
 * zip server
 * Https Zip file server with Authentication
 * by Alp Burak Pehlivan  / mail@alpx.io 
 * Copyright (c) 2016
 * https://github.com/AlpX/remoterm
 */

// example use: 
// set the latest version for download in latestversion.txt file
// change authuser and authpass for yourself.
// https://localhost:3000/test.zip?user=user1,pass=veryhardpassword,vers=1.0
// test with latest version info. it will not download
// https://localhost:3000/test.zip?user=user1,pass=veryhardpassword,vers=2.1



var fs = require('fs'),
    https = require('https');

var authuser='user1';
var authpass='veryhardpassword';

process.title = 'fileserverhttps';

// Connection to clients

// you should create your own self-signed ssl cert
var options = {
  key: fs.readFileSync('./server.key', 'utf8'),
  cert: fs.readFileSync('./server.crt', 'utf8'),
  passphrase: 'remowebterm',
  requestCert: false
};

https.createServer(options, function (req, res) {
  var argsok=false;

  console.log(req.url)
  var split1 = req.url.split("?");
  if(split1.length === 2)
  {
    var split2 = split1[1].split(",");
    if(split2.length === 3)
    {
      var split3 = split2[0].split("="); // user
      if(split3.length === 2)
      {
        var split4 = split2[1].split("="); // pass
        if(split4.length === 2)
        {
          var split5 = split2[2].split("="); // version
          if(split5.length === 2)
          {
            argsok=true;
          }
        }
      }
    }
  }

  var username='';
  var password='';
  var version='';
  var latestversion='';

  if(argsok)
  {
    if(split3[0]== 'user')
    {
      if(split4[0]=='pass')
      {
        if(split5[0]=='vers')
        {
          username=split3[1];
          password=split4[1];
          version=split5[1];
          console.log('username : ' + username);
          console.log('password : ' + password);
          console.log('version : ' + version);

          fs.readFile('./latestversion.txt', 'utf8', function (err, latestver) {
            latestversion=latestver;
            console.log('latest version : ' + latestversion);

            // authentication check
            if(username==authuser && password==authpass)
            {
              if(latestversion==version)
              {
                      res.writeHead(418, {"Content-Type": "text/html"});
                      res.end('no new update');  
              }
              else
              {
                var path = './files' + split1[0];
                console.log(path)

                // Check if resource exists and serve 404 page if it doesn't.
                fs.exists(path, function (exists) {
                  if (!exists) {
                      res.writeHead(404, {"Content-Type": "text/html"});
                      res.end('not found');  
                  }
                  else
                  {
                    fs.readFile(path, function (err, zipdata) {
                      if(zipdata== undefined)
                      {
                        res.writeHead(404, {"Content-Type": "text/html"});
                        res.end('not found');  
                      }
                      else
                      {
                        res.setHeader('Content-Type', 'application/zip')
                        res.setHeader('Content-Disposition', 'attachment; filename=file.zip');
                        res.setHeader('Content-Length', zipdata.length);
                        res.end(zipdata, 'binary');
                      }
                    });
                  }
                });
              }
            }
            else
            {
              res.writeHead(401);
              res.end('Unauthorized');  
            }
  
          });
        }
      }
    }
  }

})
.listen(3000);