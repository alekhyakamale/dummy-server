const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));

app.get('/', function(req, res) {
    res.send('Silverlight Replace Backend Mock, version 0.0.1\n\n' + new Date());
});

app.get('/ping', function(req, res) {
    res.send('success\n\n' + new Date());
});

app.get('/api/autocomplete', function(req, res) {
    console.log('GET:' + '/api/recipes');
    const response = JSON.parse(fs.readFileSync('responses/Result.json'));
    console.log('Response: \n' + JSON.stringify(response)); 
    res.send(response);
});

// app.get('/api/responses', function(req, res) {
//     console.log('GET:' + '/api/responses');
//     const response = JSON.parse(fs.readFileSync('responses/ResponsesWithoutFilter.json'));
//     console.log('Response: \n' + JSON.stringify(response)); 
//     res.send(response);
// });

app.post('/api/responses', function(req, res) {
    console.log('POST:' + '/api/responses');
    console.log(req.body)
    if(req.body.filters.length>0){
        const response = JSON.parse(fs.readFileSync('responses/ResponsesWithFilter.json'));
        res.send(response);
    }else{
        if(req.body.query === "computer")
    {
        const response = JSON.parse(fs.readFileSync('responses/ResponsesWithoutAutocorrect.json'));
        res.send(response);
    }
    else{
        const response = JSON.parse(fs.readFileSync('responses/ResponsesWithoutFilter.json'));
        res.send(response);
    }
    }
    
});

const server = app.listen(20403, () => {
    const host = server.address().address;
    const port = server.address().port;
    const headers = {"Access-Control-Allow-Origin": "*"};
    console.log('Silverlight Replace Backend Mock listening at http://%s:%s', host, port, headers);
});
