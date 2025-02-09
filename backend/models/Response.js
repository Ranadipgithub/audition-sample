const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  questionId: { type: Number, required: true },
  answer: { type: mongoose.Schema.Types.Mixed, required: true },
});

const ResponseSchema = new mongoose.Schema(
  {
    answers: { type: [AnswerSchema], default: [] }, 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Response", ResponseSchema);
