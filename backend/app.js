import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './src/graphql/schema.js'; // Import GraphQL schema
import { graphqlUploadExpress } from 'graphql-upload';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Enable file uploads for GraphQL
app.use(graphqlUploadExpress());

// Allow all origins for now to simplify frontend setup
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Set up the GraphQL server
app.use(
  '/graphql',
  graphqlHTTP({
    schema, // GraphQL schema imported from the project
    graphiql: process.env.NODE_ENV !== 'production', // Enable GraphiQL in development
  })
);

// Error handling middleware to ensure consistent error responses
app.use((err, req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.status(err.status || 500).json({ error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`GraphQL server is running on http://localhost:${port}/graphql`);
});

export default app;
