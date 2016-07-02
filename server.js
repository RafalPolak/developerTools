//express configuration
//#################SET-UP#################################
    var express  = require('express');
    var app      = express();   // create our app w/ express

//#################START-SERVER-JS-NODE###################
    app.listen(8080);
    console.log("App listening on port 8080");
//#################SINGLE-PAGE-APPLICATION-ENTRY##########
    app.get('*', function(req, res) {
        res.sendfile('index.html'); // load the single view file
    });