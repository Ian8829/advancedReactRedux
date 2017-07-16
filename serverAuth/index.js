// Main starting point
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(`Server is listening on: ${port}`);
