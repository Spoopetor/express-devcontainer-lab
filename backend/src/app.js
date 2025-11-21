import express from "express";

import morgan from "morgan";

let categories = ['successQuotes', 'perseveranceQuotes', 'happinessQuotes'];

let successQuotes = [
  {
    'quote': 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    'author': 'Winston S. Churchill'
  },
  {
    'quote': 'The way to get started is to quit talking and begin doing.',
    'author': 'Walt Disney'
  }
];

let perseveranceQuotes = [
  {
    'quote': 'It’s not that I’m so smart, it’s just that I stay with problems longer.',
    'author': 'Albert Einstein'
  },
  {
    'quote': 'Perseverance is failing 19 times and succeeding the 20th.',
    'author': 'Julie Andrews'
  }
];

let happinessQuotes = [
  {
    'quote': 'Happiness is not something ready made. It comes from your own actions.',
    'author': 'Dalai Lama'
  },
  {
    'quote': 'For every minute you are angry you lose sixty seconds of happiness.',
    'author': 'Ralph Waldo Emerson'
  }
];

const app = express();
app.use(morgan('dev'));
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ ok: true, msg: "Hello from Express inside a Dev Container!", "names": "Andy & Shreya" });
});

app.get("/health", (req, res) => {
  res.status(200).send("healthy");
});

app.get("/api/time", (req, res) => {
  res.json({"timezone": "UTC", "currentTime": new Date().toLocaleTimeString()});
})

app.get('/hello/name/:first/:last', function (req, res) {
  let firstName = req.params.first;
  let lastName = req.params.last;

  res.type('text');
  res.send(`Hello ${firstName} ${lastName}!`);
});

app.get('/math/circle/:r', function (req, res) {
  let radius;
  try {
    radius = parseFloat(req.params.r);
  } catch (error) {
    res.status(400).json({ "error": "Invalid radius. Please provide a numeric value."});
    return;
  }
  if (isNaN(radius)) {
    res.status(400).json({ "error": "Invalid radius. Please provide a numeric value."});
    return;
  }
  let area = Math.PI * radius * radius;
  let circumference = 2 * Math.PI * radius;

  res.json({
    "area": area,
    "circumference": circumference
  });
});

app.get('/math/rectangle/:w/:h', function (req, res) {
  let width, height;
  
  try {
    width = parseFloat(req.params.w);
    height = parseFloat(req.params.h);
  } catch (error) {
    res.status(400).json({ "error": "Invalid width or height. Please provide numeric values."});
    return;
  }
  if (isNaN(width) || isNaN(height)) {
    res.status(400).json({ "error": "Invalid width or height. Please provide numeric values."});
    return;
  }
  let area = width * height;
  let perimeter = 2 * (width + height);
  
  res.json({
    "area": area,
    "perimeter": perimeter
  });
});

app.get('/math/power/:base/:exponent/', function (req, res) {
let base, exponent;

  try {
    base = parseFloat(req.params.base);
    exponent = parseFloat(req.params.exponent);
  } catch (error) {
    res.status(400).json({ "error": "Invalid base or exponent. Please provide numeric values."});
    return;
  }
  if (isNaN(base) || isNaN(exponent)) {
    res.status(400).json({ "error": "Invalid base or exponent. Please provide numeric values."});
    return;
  }
  
  let root = req.query['root'] === 'true';

  if (root) {
    let result = Math.pow(base, exponent);
    let squareRoot = Math.sqrt(result);
    res.json({
      "result": result,
      "root": squareRoot
    });

  } else {
    let result = Math.pow(base, exponent);
    res.json({
      "result": result
    });
  }

});

app.get('/quotebook/categories', function (req, res) {
  res.type('text');
  let output = "";
  for (let category of categories) {
    output += `A possible category is ${category} \n`;
  }
  res.send(output);
});

app.get('/quotebook/category/:category', function (req, res) {
  let category = req.params.category;

  let quotes;

  switch (category) {
    case 'successQuotes':
      quotes = successQuotes;
      break;
    case 'perseveranceQuotes':
      quotes = perseveranceQuotes;
      break;
    case 'happinessQuotes':
      quotes = happinessQuotes;
      break;
    default:
      res.status(400).json({ "error": `no category listed for ${category}`});
      return;
  }
  
  let randQuote = quotes[Math.floor(Math.random() * quotes.length)];

  res.type('json');
  res.json(randQuote);
});

app.post('/quotebook/quote/new/:c/:q/:a', function (req, res) {
  let category = req.params.c;
  let quote = req.params.q;
  let author = req.params.a;

  if (!category || !quote || !author) {
    res.status(400).json({'error': 'invalid or insufficient user input'});
    return;
  }
  
  let quoteObj = {
    'quote': quote,
    'author': author
  };

  switch (category) {
    case 'successQuotes':
      successQuotes.push(quoteObj);
      break;
    case 'perseveranceQuotes':
      perseveranceQuotes.push(quoteObj);
      break;
    case 'happinessQuotes':
      happinessQuotes.push(quoteObj);
      break;
    default:
      res.status(400).json({'error': 'invalid or insufficient user input'});
      return;
  }


  res.status(200).send("Success!");
});
  

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});