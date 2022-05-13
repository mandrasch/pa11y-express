const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const pa11y = require('pa11y')
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', async function (req, res) {

  console.log('serverMiddleware: Launching pa11y check ...', req.query, req.body);

  if (!req.body.url) {
    res.status(500).send('No URL submitted');
  }
  // TODO: check if url was given
  // TODO: sanitize?
  const resultJson = await pa11y(req.body.url, {
    reporter: 'json',
  });

  console.log('serverMiddleware: Returning pa11y results ...', resultJson);

  res.send(resultJson);

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
