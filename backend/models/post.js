const mongoose = require('mongoose');

  const postSchema = mongoose.Schema({
    content: {type: String , required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true},
    type: {type: String, required: true}
  })

  module.exports = mongoose.model('Post' , postSchema);
