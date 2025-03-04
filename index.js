import express from 'express';
import { connectDB } from './src/databases/index.js';
import { router } from './src/routes/index.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Mount the routes
app.use('/', router);

// db connection
connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
