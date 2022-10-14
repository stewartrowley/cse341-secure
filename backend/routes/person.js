const routes = require('express').Router();

const personController = require('../controllers/person');

routes.get('/', personController.getAll);

routes.get('/:username', personController.getPerson);

routes.post('/', personController.create);

module.exports = routes;