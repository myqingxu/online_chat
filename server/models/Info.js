const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  username: { type: String },
  headerImg: { type: String },
  name: { type: String },
  token: { type: String }
})

module.exports = mongoose.model('Info', schema)
