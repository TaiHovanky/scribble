var express = require('express');
var app = express();
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');
//var bodyParser = require('body-parser');

//var $ = require('jquery');

//var options = {
  //  host: 'jquery.com',
  //  port: 80,
  //  path: '/'
//};

//bodyParser attempt
//var textParser = bodyParser.text();
//app.use(bodyParser());

var port = process.env.PORT || 3000;
//var writings;
app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');  //set the view engine to ejs

app.use('/', function(req, res, next){
    console.log('Request Url:' + req.url);
    next();
});

var html = ""
//var jotted = "";
app.get('/', function(req, res){  //when a get request is made, this runs the readFile method. readFile looks at the notebook.txt file and renders the index.html file. It uses the data output (from reading the file to fill in the spac)
    //res.on('data', function(data){      
    //html += data;
    fs.readFile(__dirname +'/notebook.txt', 'utf8', function(err, data){     
        //jotted = data;
        res.render('index', {jotted: data});
        //console.log(data);
        //console.log(jotted);
    });
    //}).on('end', function(){
    //    $(html).find('textarea').val(jotted);
    //});
    //console.log(jotted);
    //res.render('index', {jotted: jotted});
});

app.post('/', function(req, res){
    function processAllFields(req, res){
        var fields = [];
        var form = new formidable.IncomingForm();
            form.on('field', function(field, value){
                fields[field] = value;
            });

            form.on('field', function(name, value){
                res.writeHead(200, {'Content-Type': 'text/plain'});
                //var writings = util.inspect({fields: fields}, {'Content-Type': 'text/plain'}); don't need to use util.inspect!!!
                res.end(value);
                //JSON.stringify(writings) don't need to stringify!!!
                var x = value;
                fs.writeFile(__dirname + '/notebook.txt', x, function(err){});
            });
            form.parse(req);
        
    } 
    processAllFields(req, res);
    
    //bodyParser attempt
    //var scribblings = req.body.scribblings;
    //fs.writeFile(__dirname + '/notebook.txt', function(err){
    //});
    //res.send(req.body.scribblings);
    //res.redirect('localhost:3000');
});


app.listen(port);