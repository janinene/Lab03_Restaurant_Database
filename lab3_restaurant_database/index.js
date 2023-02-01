const express = require('express');
const mongoose = require('mongoose');
const restaurantRouter = require('./routes/restaurantRoutes.js');

const app = express();
app.use(express.json()); // Make sure it comes back as json

//TODO - Replace you Connection String here
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://janineusana:mongodbjanine@cluster0.37gpaqg.mongodb.net/Restaurant?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

app.use(restaurantRouter);

app.listen(3000, () => { console.log('Server is running...') });
