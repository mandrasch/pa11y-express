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
    return;
  }
  // TODO: check if url was given
  // TODO: sanitize?
  const resultJson = await pa11y(req.body.url, {
    reporter: 'json',
  });

  console.log('serverMiddleware: Returning pa11y results ...', resultJson);

  res.send(resultJson);

})

app.get("/", (req, res) => res.type('html').send(html));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
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
      Hello from Render!
    </section>
  </body>
</html>
`