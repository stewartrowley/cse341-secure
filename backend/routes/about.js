const routes = require('express').Router();

const aboutController = require('../controllers/about');
const { about } = require('../models');

console.log(aboutController);

routes.get('/', aboutController.getAboutAll);

routes.get('/:aboutId', aboutController.getAbout);

routes.post('/', aboutController.createAbout);

module.exports = routes;