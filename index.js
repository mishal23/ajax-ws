var express = require('express');
var path = require('path');

var app = express();

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function(req, res){
    console.log("Server listening on port 3000");
});
