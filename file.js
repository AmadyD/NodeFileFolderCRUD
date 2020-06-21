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
},
extension:{
    type:String
}
});

var collectionName = 'file'
module.exports = mongoose.model('file',schema,collectionName);