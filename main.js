var http = require("http");
var express = require("express");
var request = require("request")
var fs = require("fs");
var bodyParser = require('body-parser');
var path =  require("path");
var app = express();
var file = 0;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(peticion , respuesta){
    fs.readFile("public/proxy.html", function(err, data){
        respuesta.send(data.toString());
    });
});
app.post("/" ,function(peticion, respuesta){
    
    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    }
    var options = {
        url     : peticion.body.url,
        method  : 'GET',
        jar     : true,
        headers : headers
    }
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.readFile("public/proxy.html", function(err, data){
                datos = data.toString();
                fs.appendFile("public/"+file.toString()+".html",body,function(err){});
                console.log(file);
                html = datos.replace("-__-", file.toString()+".html");
                file = file + 1;
                respuesta.send(html);
            });
        }
    });
});


var server = app.listen(8888, function(){
    console.log("servidor iniciado")
});
