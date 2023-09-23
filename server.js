const express = require('express');

// set up app use express
const app = express();

// set up ports
const PORT = process.env.port || 3001;

// setting up static to public folder
app.use(express.static('public'));

// sets up middle wear
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// routes to files
require('./routes/apiRoute')(app);
require('./routes/htmlRoute')(app);

// app listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
