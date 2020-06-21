// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';

// import folder from './folders';

var express = require('express')
var cors = require('cors')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Folder = require('./folder');
var File = require('./file.js');

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://82.165.116.238:27017/myNas');
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('mongoDb database connection established succesfully');
});




/*

         CRUD des répertoires

*/
app.get('/folder',function(req,res){
    var userName = req.query.userName;
    var rootFolder = req.query.root;
        Folder.find({user: userName,root:'/'+rootFolder})
           .then(folders => res.json(folders))
           .catch(err => res.status(404).json({ success: false }));
        });


app.post('/createFolder',function(req,res){
    var userName = req.query.userName;
    var rootFolder = req.query.root;
    var folderName = req.query.folderName;
    if(rootFolder ==='') rootFolder='/';

    var folder = new Folder({user:userName,root:rootFolder,name:folderName});

    folder.save(function (err, fold) {
        if (err) return console.error(err);
        res.sendStatus(200).end('OK');
      });

});

app.put('/updateFolder',function(req,res){
    var userName = req.query.userName;
    var rootFolder = req.query.root;
    var folderName = req.query.folderName;
    var newName = req.query.newName;

    Folder.update({user:userName,root:rootFolder,name:folderName},
        {$set:{name:newName}},{multi:true}).then(res.sendStatus(200).end('OK'))
        .catch(err => res.status(404).json({ success: false }));
});

app.delete('/deleteFolder',function(req,res){
    var userName = req.query.userName;
    var rootFolder = req.query.root;
    var folderName = req.query.folderName;
    Folder.remove({user:userName,root:"/"+rootFolder,name:folderName}).then(res.sendStatus(200).end('OK'))
    .catch(err => res.status(404).json({ success: false }));
});



/*
   
        CRUD des fichiers
*/

app.get('/file',function(req,res){
    var userName = req.query.userName;
    var rootFolder = req.query.root;
        File.find({user: userName,root:'/'+rootFolder})
           .then(files => res.json(files))
           .catch(err => res.status(404).json({ success: false }));
        });


app.post('/createFile',function(req,res){
    var userName = req.query.userName;
    var rootFolder = req.query.root;
    var fileName = req.query.fileName;
    var fileExtension = req.query.fileExtension;

    if(rootFolder ==='') rootFolder='/';

    var file = new File({user:userName,root:rootFolder,name:fileName,extension:fileExtension});

    file.save(function (err, file) {
        if (err) return console.error(err);
        res.sendStatus(200).end('OK');
      });

});

app.delete('/deleteFile',function(req,res){
    var userName = req.query.userName;
    var rootFolder = req.query.root;
    var fileName = req.query.fileName;
    File.remove({user:userName,root:"/"+rootFolder,name:fileName}).then(res.sendStatus(200).end('OK'))
    .catch(err => res.status(404).json({ success: false }));
});


// app.use('/',router);

app.listen(4000,()=> console.log("Express server running on port 4000"));
