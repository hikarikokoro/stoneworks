const express = require('express');
const email = require('./email');

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/nature-expedition";
app.use(express.static(distDir));

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