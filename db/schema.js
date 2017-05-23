// Load mongoose package
var mongoose = require('mongoose');
// Connect to MongoDB and create/use database called todoAppTest
mongoose.connect('mongodb://sample:sample@localhost/dsinzmean');
//var db = Mongoose.createConnection('mongodb://sample:sample@localhost/dsinzmean');

// Create a schema
var OrderSchema = new mongoose.Schema({
  name: String,
  email:String,
  phno:Number,
  status:String,
  msg:String,
  service:String,
  updated_at: { type: Date, default: Date.now },
});
// Create a model based on the schema
exports.Order = mongoose.model('Order', OrderSchema);

var UserSchema = new mongoose.Schema({
  username: String,
  password:String,
  updated_at: { type: Date, default: Date.now },
});
// Create a model based on the schema
exports.User = mongoose.model('user_table', UserSchema);
