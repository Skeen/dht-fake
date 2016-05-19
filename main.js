var express = require('express');
var bodyParser = require('body-parser')
var Triejs = require('triejs');

var app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');

    next();
}

app.use(bodyParser.urlencoded({extended:true}));
app.use(allowCrossDomain);

var trie = new Triejs({enableCache: false});

app.get('/get', function(req, res)
{
    var id = req.query.id;
    if(!id)
    {
        res.status(400);
        res.end("Error: Please provide an id!");
        return;
    }
    var result = trie.find(id);
    if(!result)
    {
        res.status(404);
        res.end("Error: No value found!");
        return;
    }
    res.send(result);
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
    var removed = trie.remove(id);
    trie.add(id, {key: id, value: JSON.parse(value)});
    if(removed)
    {
        res.send("Warning: Overriding value!");
        console.log("Warning: Overriding value: " + id);
    }
    res.end("Success");
    console.log("Wrote value for: " + id);
});

/*
app.get('/dump', function(req, res)
{
    res.end(JSON.stringify(dht));
    console.log("dumped dht");
});

app.get('/', function(req, res) {
    res.redirect('/dump');
});
*/

app.listen(3000, function ()
{
    console.log("Prefix-HashTable (trie) Server listening on port: 3000");
});
