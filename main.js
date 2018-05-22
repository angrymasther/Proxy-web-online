
var http = require("http")
var request = require("request")
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}
var options = {
    url     : 'https://google.es',
    method  : 'GET',
    jar     : true,
    headers : headers
}
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        http.createServer(function(req, res){
        	res.writeHead(200, {"Content-Type":"text/html"})
        	res.end(body)

        }).listen(8888)
    }
});