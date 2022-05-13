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
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      <h1>Hello from pa11y API endpoint!</h1>

      <p>Use API via GET: <pre>${appUrl}/check?url=https%3A%2F%2Fwww.a11yproject.com%2F</pre></p>

      <p>Source: <a href="https://github.com/mandrasch/pa11y-express">https://github.com/mandrasch/pa11y-express</a></p>
    </section>
  </body>
</html>
`