const express = require('express');
const email = require('./email');

const app = express();
const port = 3000 || process.env.PORT;
const _app_folder = 'dist/nature-expedition';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ---- SERVE STATIC FILES ---- //
app.server.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

// ---- SERVE APLICATION PATHS ---- //
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});

app.get('/', (req, res) => {
  res.json({message: 'alive'});
  //res.sendFile('src/index.html');
})

app.post('/api/email/order-confirmation', async (req, res, next) => {
  try {
    res.json(await email.sendEmail(req.body));
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});


  return;
});

app.listen(port, () => {
  console.log(`Example API listening at http://localhost:${port}`)
});