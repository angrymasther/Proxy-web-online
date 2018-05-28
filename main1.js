var http = require("http");
var express = require("express");
var request = require("request")
var fs = require("fs");
var bodyParser = require('body-parser');
var path =  require("path");
var app = express();
var file = 0;
var url = "";

app.use(express.static(path.join(__dirname, 'public')));
fs.unlink("/public/pages/*",  function(err){});
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(peticion , respuesta){
    if(peticion.query.url == null){
        fs.readFile("public/proxy.html", function(err, data){
        respuesta.send(data.toString());
        });    
    }
    else{
        fs.readFile("public/proxy.html", function(err,  data){
            var headers = {
                'User-Agent':       'Super Agent/0.0.1',
                'Content-Type':     'application/x-www-form-urlencoded'
            }
            var options = {
                url     : peticion.query.url,
                method  : 'GET',
                jar     : true,
                headers : headers
            }
            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    fs.readFile("public/proxy.html", function(err, data){
                        if(body.indexOf("target=\"_blank\"") != -1){
                            body = body.replace(/target=\"_blank\"/g, " ");
                        }
                        else{

                        }
                        datos = data.toString();

                        fs.appendFile("public/pages/"+file.toString()+".html",body,function(err){});
                        console.log(file);
                        
                        if(datos.indexOf("-__-") == -1){
                            html = datos.replace(url , file.toString()+".html");
                        }
                        else{
                            html = datos.replace("-__-", "pages/"+file.toString()+".html");
                        }

                        url = peticion.body.url;
                        file = file + 1;
                        respuesta.send(html);
                    });
                }
                else{
                    console.log(error);
                }
            });
        });
        }
    
});
app.listen(8888 , function(){
    console.log("Servidor en marcha!")
});