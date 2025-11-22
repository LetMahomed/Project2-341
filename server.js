const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const petsRoutes = require("./routes/pets");

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);
app.use('/pets', petsRoutes);


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
