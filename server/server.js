import express from 'express';
import dotenv from 'dotenv';
import { applyMiddleware, applyRoutes } from './utils/index.js';
import routes from './routes/index.js';
import bodyParser from 'body-parser'
import cors from 'cors'
import connectDB from './config/db.js';

dotenv.config();

const app = express();

// Connect to the database
connectDB().then(() => {
  
});

applyMiddleware(app, [
  bodyParser.urlencoded({ extended: true }),
  express.urlencoded({ extended: true }),
  express.json(),
  cors()
]);

applyRoutes(app, routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
