const spawn = require("child_process").spawn;
const express = require('express')

const questions = JSON.stringify('Hello World machine learning dynamic learning advanced neural nets techs')

const pythonprocess = spawn('python',["./exp.py",questions]);

//var resultdata = '';
//Constants
const PORT = 8080
const HOST = '0.0.0.0';

const app = express();

var resultdata = '';

pythonprocess.stdout.on('data',(data) => {
    //console.log(JSON.parse(data))
    resultdata = JSON.parse(data);
    console.log(resultdata);
    //app.get('/',(req,res) => {
      //  res.send(resultdata);
    //});
});

app.get('/',(req,res) => {
    res.send(resultdata);
});

app.listen(PORT,HOST);
console.log(`Running on http://${HOST}:${PORT}`);

