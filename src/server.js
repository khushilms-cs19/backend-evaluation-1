const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/ping', (req, res) => {
  res.status(200).json({
    message: 'pong',
  });
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});