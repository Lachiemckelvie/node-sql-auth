const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoints
app.use('/users', require('./Controllers/UserController'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});