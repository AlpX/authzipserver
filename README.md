# remoterm
Simple Https Zip file server with simple Authentication. Serves the requested file inside 'files' folder if credentials in the url is correct.
--
Alp Burak Pehlivan

# How to use:
git clone https://github.com/AlpX/authzipserver.git

Server:
=======
/fileserver.js:
Change the following variables for self.
var authuser= 'username';
var authpass= 'yourpassword';
-----
Set the latest version for download in latestversion.txt file.
If the version no in the request url is the same file will not be sent.

*You should create your own ssl certs and use them instead of dummy ones I created.

run:
nodejs fileserver.js
send get req to: (you can use browser)
https://localhost:3000/test.zip?user=user1,pass=veryhardpassword,vers=1.0
test with latest version info. it will not download
https://localhost:3000/test.zip?user=user1,pass=veryhardpassword,vers=2.1


Contribution and License Agreement

If you contribute code to this project, you are implicitly allowing your code to be distributed under the MIT license. You are also implicitly verifying that all code is your original work.

License

Copyright (c) 2016, Alp Burak Pehlivan (MIT License)