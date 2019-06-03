const express = require('express');
const mongoose = require('mongoose');

const app = express();

if (process.env.ENV === 'Test'){
  console.log('Thi is a test');
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test')
}else{
  console.log('This is for real');
  const db = mongoose.connect('mongodb://localhost/bookAPI');
}

const bodyParser = require('body-parser');

// const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book= require('./models/bookModel.js');
const bookRouter = require('./routes/bookRouter')(Book);
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


  app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.server= app.listen(port, () => {
  console.log(`Running on port  + ${port}`);
});

module.exports = app;