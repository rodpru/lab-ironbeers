const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then((response) => {
    res.render('beers', {response: response});
    console.log(response);
  })
  .catch((error) => {
    console.log('error')
  });


});
app.get('/randombeers', (req, res) => {
  punkAPI.getRandom()
  .then((randomResponse) => {
    console.log(randomResponse);
    res.render('randombeers', randomResponse[0]);
  })
  .catch((error) => {
    console.log('randomError');
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
