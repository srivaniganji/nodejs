const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server Running on Port NO: ${PORT}`);
  });
};

startServer();

mongoose
  .connect("mongodb://localhost:27017/FirstDB")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define User schema
const userSchema1 = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("user-logins", userSchema1);

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const newUser = await new User({ username, password });
  newUser.save();
  res.status(200).send("uploaded");
});
