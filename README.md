# pa11y-express

Setup your own [pa11y](https://pa11y.org/) JSON API endpoint via [Express server (NodeJS)](https://expressjs.com).

## API usage

```
GET /check?url=<url-for-check>
```

## Host on render.com

Can be hosted as [render.com Web Service](https://render.com/docs/web-services), use following commands for setup:

  * Build Command: `npm install`
  * Start Command: `npm run start` (runs `node app.js`)

Create a new WebService on [render.com](https://render.com) and configure the project as seen here:

1. Select GitHub repository:
![Screenshot render.com Select a Github Repository](/_gh_screenshots/screenshot_render_001.png)

2. Configure build and start command:
![Screenshot render.com Configure build and start command](/_gh_screenshots/screenshot_render_002.png)

3. Done! Your project is deployed and has a public URL:
![Screenshot render.com Dashboard of project with public url](/_gh_screenshots/screenshot_render_003.png)

See https://render.com/docs/deploy-node-express-app for more information.


## Demo

⚠️ This is just a demo instance on a free plan. Please setup your own API endpoint! ⚠️

```
https://pa11y-express.onrender.com/check?url=https%3A%2F%2Fwww.w3.org%2FWAI%2Fdemos%2Fbad%2Fbefore%2Fhome.html
```

Use encodeURI() in JavaScript (or [urlencoder.io](https://www.urlencoder.io/)) to generate an encoded parameter.

### Response example (JSON)

[Demo request](https://pa11y-express.onrender.com/check?url=https%3A%2F%2Fwww.w3.org%2FWAI%2Fdemos%2Fbad%2Fbefore%2Fhome.html)

_(Runs on free plan on render, can be offline if limit is reached)_

```json
{
  "documentTitle": "Welcome to CityLights! [Inaccessible Home Page]",
  "pageUrl": "https://www.w3.org/WAI/demos/bad/before/home.html",
  "issues": [
    {
      "code": "WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2",
      "type": "error",
      "typeCode": 1,
      "message": "The html element should have a lang or xml:lang attribute which describes the language of the document.",
      "context": "<html><head>\n<title>Welcome to CityLi...</html>",
      "selector": "html",
      "runner": "htmlcs",
      "runnerExtras": {}
    },
    {
      "code": "WCAG2AA.Principle1.Guideline1_1.1_1_1.H37",
      "type": "error",
      "typeCode": 1,
      "message": "Img element missing an alt attribute. Use the alt attribute to specify a short text alternative.",
      "context": "<img src=\"./img/border_left_top.gif\" width=\"10px\" height=\"10px\">",
      "selector": "#page > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > img",
      "runner": "htmlcs",
      "runnerExtras": {}
    },
  ]
}
```
