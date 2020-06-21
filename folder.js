
var mongoose = require('mongoose');
const Schema = require('mongoose');

var schema = mongoose.Schema({
user:{
    type: String
},
root:{
     type: String  
},
name:{
    type: String
}
});

var collectionName = 'folder'
module.exports = mongoose.model('folder',schema,collectionName);