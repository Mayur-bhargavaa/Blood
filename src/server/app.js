const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

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

// Define a user schema
const userSchema = new mongoose.Schema({
  name:String,
  email: String,
  password: String,
  cpassword: String,
});

// Create a user model
const User = mongoose.model('User', userSchema);
// product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

const Product = mongoose.model('Product', productSchema);
// Create the Express app
const app = express();

// Enable CORS
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

// Define the signup endpoint
app.post('/signup', async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  if (password !== cpassword) {
    return res.status(400).json({ error: 'Password and Confirm Password do not match' });
   
  }

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
      alert("Email already registered")
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedcPassword = await bcrypt.hash(cpassword, 10);
    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, cpassword:hashedcPassword });
    await newUser.save();

    res.json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error signing up' });
  }
});


app.post('/products', async (req, res) => {
  const { name,price,description } = req.body;
  try {
    // Create a new user
    const newUser = new Product({ name,price,description});
    await newUser.save();

    res.json({ message: 'Data stored' });
  } catch (error) {
    res.status(500).json({ error: 'Error to stored data' });
  }
});
// Define the login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored password hash
    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error finding user' });
  }
});
app.get('/users', (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving users' });
    });
});
app.get('/products', (req, res) => {
  Product.find()
    .then((product) => {
      res.json(product);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving products' });
    });
});
// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});