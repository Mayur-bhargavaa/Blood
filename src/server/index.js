const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const router = require('./Routes/router');

// Connect to MongoDB
mongoose.connect('mongodb+srv://DBmayur:Mayur%402608@cluster0.ytcpzbb.mongodb.net/BloodUsers', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Enable CORS
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

// Use the router
app.use(router);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
