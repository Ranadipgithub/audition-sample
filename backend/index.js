const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const Response = require("./models/Response");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.post("/submit", async (req, res) => {
  try {
    const response = new Response(req.body);
    await response.save();
    res
      .status(201)
      .json({ message: "Response submitted successfully", data: response });
  } catch (error) {
    console.error("Error saving response:", error);
    res.status(500).json({ message: "Error saving response", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
