// models/Response.js
const mongoose = require("mongoose");

// Define a schema for the answer object
const AnswerSchema = new mongoose.Schema({
  questionId: { type: Number, required: true }, // Add questionId to relate to your questions array
  answer: { type: mongoose.Schema.Types.Mixed, required: true }, // Allow any type for answer
});

// Define the main Response schema
const ResponseSchema = new mongoose.Schema(
  {
    answers: { type: [AnswerSchema], default: [] }, // Array of AnswerSchema, defaults to an empty array
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Export the Response model
module.exports = mongoose.model("Response", ResponseSchema);
