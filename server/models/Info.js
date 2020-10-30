const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  username: { type: String },
  headerImg: { type: String },
  name: { type: String },
  token: { type: String },
  friend: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Info' }],
  newFriend: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Info' }],
})

module.exports = mongoose.model('Info', schema)
