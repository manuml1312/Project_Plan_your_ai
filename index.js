const express = require("express");

const app = express();

app.get("/", (req, results) => {
  console.log('Working');
  var spawn = require("node:child_process").spawn;
  console.log('Working1');
  var pythonProcess = spawn('python',["/app/mongo_V1.py", '-projectid', 5]);
  console.log('Working2');
  pythonProcess.stdout.on('data', function (results){
    console.log('Working3');
  console.log(results.toString('utf8').replace(/[\n\r]/g, ''));  
  if(typeof callBack == 'function') { callBack(results); } else { return results; }                    
  });
  console.log('Working4');

  pythonProcess.stderr.on('data', function (data){
  console.log('Working5');
  console.log(data.toString('utf8').replace(/[\n\r]/g, ''));
  console.log('Working6');  
  if(typeof callBack == 'function') { callBack(results); } else { return results; }
 });
  console.log('Working7');
  res.send("This is my express app");
});

app.get("/me", (req, results) => {
  results.send("Hi I am Laith");
});

app.listen(5000, () => {
  console.log("listening");
});
