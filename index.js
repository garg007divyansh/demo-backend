const express = require('express');
const app = express();
const connectDB = require('./src/databases/connection');
const appRoutes = require('./src/routes');

// Middleware to parse JSON
app.use(express.json());

// Mount the routes
app.use('/', appRoutes);

// db connection
connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
