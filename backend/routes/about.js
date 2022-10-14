const routes = require('express').Router();

const aboutController = require('../controllers/about');

routes.get('/', aboutController.getAboutAll);

routes.get('/:_id', aboutController.getAbout);

routes.post('/', aboutController.createAbout);

module.exports = routes;