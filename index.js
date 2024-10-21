// crop-disease-backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Disease = require('./models/Disease'); // Import the Disease model

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas connection string
const uri = "mongodb+srv://kiranagv:<db_password>@cluster121.mbyui.mongodb.net/crop-disease-db?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch(err => {
  console.error('MongoDB connection error', err);
});

// Route to create a new disease entry
app.post('/diseases', async (req, res) => {
  try {
    const newDisease = new Disease(req.body);
    await newDisease.save();
    res.status(201).send(newDisease);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to get all diseases
app.get('/diseases', async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.status(200).send(diseases);
  } catch (error) {
    res.status(500).send(error);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
