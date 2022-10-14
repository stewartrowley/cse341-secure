const routes = require('express').Router();
const person = require('./person');
const about = require('./about');

routes.use('/', require('./swagger'));
routes.use('/person', person);
routes.use('/about', about);

routes.get('/', (req, res) => {
  res.send('Stewart Rowley');
});

module.exports = routes;