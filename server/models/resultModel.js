const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    username: {type: String},
    result: {type: Array},
    points: {type: Number, default: 0}
});
  
  const ResultModel = mongoose.model('Result', resultSchema);
  
  module.exports = ResultModel;