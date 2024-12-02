const express = require('express');
const app = express();
const server = require('http').createServer(app);

const apiV1Router = express.Router();
app.use('/api/v1', apiV1Router);

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

apiV1Router.get('/asdf', (req, res) => {
  res.send('Hello World');
});

server.listen(3000, () => console.log('Server is running on http://localhost:3000'));