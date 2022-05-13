const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const pa11y = require('pa11y')
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * GET /check endpoint
 */
app.get("/check", async function (req, res) {

  console.log('GET /check ...');

  // Check if url is submitted
  if (!req.query.url) {
    res.status(500).send({ error: 'No URL submitted' });
    return;
  }

  console.log('Fire up pa11y ...');
  const resultJson = await pa11y(req.query.url, {
    reporter: 'json',
  });
  // TODO: sanitize url?
  // console.log('Returning pa11y results ...', resultJson);
  res.send(resultJson);
})

/**
 * GET / index page (static HTML)
 */
app.get("/", (req, res) => res.type('html').send(html));

app.listen(port, () => console.log(`pa11y-express listening on port ${port}!`));

/**
 * Current url
 */
// https://render.com/docs/environment-variables
const appUrl = process.env.RENDER_EXTERNAL_URL || '';

/**
 * index page HTML
 */
const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from pa11y API endpoint!</title>
  </head>
  <body>
    <section>
      <h1>Hello from pa11y API endpoint!</h1>

      <p>Use API via GET: <pre>${appUrl}/check?url=https%3A%2F%2Fwww.w3.org%2FWAI%2Fdemos%2Fbad%2Fbefore%2Fhome.html</pre></p>

      <p><a href="${appUrl}/check?url=https%3A%2F%2Fwww.w3.org%2FWAI%2Fdemos%2Fbad%2Fbefore%2Fhome.html" target="_blank">Run example</a></p>

      <p>README: <a href="https://github.com/mandrasch/pa11y-express">https://github.com/mandrasch/pa11y-express</a></p>
    </section>
  </body>
</html>
`