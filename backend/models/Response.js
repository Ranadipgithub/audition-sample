const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  questionId: { type: Number, required: true },
  answer: { type: mongoose.Schema.Types.Mixed, required: true },
});

const ResponseSchema = new mongoose.Schema(
  {
    answers: { type: [AnswerSchema], default: [] }, // Array of AnswerSchema, defaults to an empty array
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Response", ResponseSchema);
