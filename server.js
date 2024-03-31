const express = require('express');
const app = express();
const port = 3000; // You can change the port number as needed

// Middleware
app.use(express.json());

// Routes and API endpoints will be defined here

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});