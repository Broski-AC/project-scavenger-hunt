
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questSchema = new Schema({
  description: { type: String, required: true },
  isDone: {type: Boolean, required: true}
  //date: { type: Date, required: true },
  //imageUrl: {type: String, required: false}
}, {
  timestamps: true,
});

const QuestEntry = mongoose.model('Quest Entry', questSchema);

module.exports = QuestEntry;