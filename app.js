import express from 'express';
import { createServer } from "http";
import { connectDB } from './src/databases/index.js';
import { router } from './src/routes/index.js';
import { initializeSocket } from './src/sockets/index.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Mount the routes
app.use('/', router);

// db connection
connectDB();

// Create an HTTP server
const server = createServer(app);

//socket connection
export const io = initializeSocket(server);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
