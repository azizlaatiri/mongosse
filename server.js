const express = require('express');
const mongoose = require('mongoose');
const { User } = require('./models/user');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())
    app.listen(3006, () => {
      console.log(`Server is running`);
    });
    mongoose.connect('mongodb://localhost:27017/backend', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
        .then(() => {
          console.log('Connected to MongoDB');
        })    
        .catch((error) => {
            console.error('MongoDB connection error:', error);
          }); 
         
          app.get('/api/users', async (req, res) => {
            try {
              const users = await User.find();
          
              if (!users || users.length === 0) {
                return res.status(404).json({ message: 'No users found' });
              }
          
              const userInformation = users.map(user => ({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              }));
          
              res.json(userInformation);
            } catch (error) {
              console.error('Error:', error);
              res.status(500).json({ message: `Internal Server Error: ${error.message}` });
            }
          });

          app.post('/api/users', async (req, res) => {
  try {
    const { firstName, lastName, email, password, image } = req.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      image,
    });

    await newUser.save()

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
});
app.put('/api/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
  
      const { firstName, lastName, email, password, image } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(userId, {
        firstName,
        lastName,
        email,
        password,
        image,
      }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User updated successfully', user: updatedUser });
    }catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: `Internal Server Error: ${error.message}` });
      }
  });
  app.delete('/api/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
  
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User removed successfully', user: deletedUser });
    } catch (error) {
      console.error('Error removing user:', error);
      res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
  });