const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  image: String,
});

const User = mongoose.model('User', UserSchema, 'user');
const newUser = new User({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'hashedpassword',
    image: 'profile.jpg',
  });
  
  newUser.save()
    .then(user => {
      console.log('User saved:', user);
    })
    .catch(error => {
      console.error('Error saving user:', error);
    });

module.exports = {
  User: User,  
};
