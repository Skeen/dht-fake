var express = require('express');
var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

var dht = {};

app.get('/get', function(req, res)
{
    var id = req.query.id;
    if(!id)
    {
        res.status(400);
        res.end("Error: Please provide an id!");
        return;
    }

    var value = dht[id];
    if(!value)
    {
        res.status(404);
        res.end("Error: No value found!");
        return;
    }
    res.send(value);
    console.log("Replied with value for: " + id);
});

app.post('/put', function(req, res)
{
    var id = req.query.id;
    if(!id)
    {
        res.status(400);
        res.end("Error: Please provide an id!");
        return;
    }

    var value = req.body.value;
    if(!value)
    {
        res.status(400);
        res.end("Error: Please provide a value!");
        return;
    }

    if(dht[id])
    {
        res.send("Warning: Overriding value!");
        console.log("Warning: Overriding value: " + id);
    }
 
    dht[id] = value;
    res.end("Success");
    console.log("Wrote value for: " + id);
});

app.listen(3000, function ()
{
  console.log('Example app listening on port 3000!');
});
