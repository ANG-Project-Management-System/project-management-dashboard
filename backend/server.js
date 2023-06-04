const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// MongoDB Connection
mongoose.connect('mongodb://localhost/mern-stack', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});
t