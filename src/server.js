const express = require('express');
const csvRouter = require('./routes/companyRoutes');
const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/csv', csvRouter);

app.get('/ping', (req, res) => {
  res.status(200).json({
    message: 'pong',
  });
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});