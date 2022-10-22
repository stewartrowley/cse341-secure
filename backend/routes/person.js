const routes = require('express').Router();

const personController = require('../controllers/person');

routes.get('/', personController.getAll);

routes.get('/:username', personController.getPerson);

routes.post('/', personController.create);

routes.put('/:username', personController.updatePerson);

routes.delete('/:username', personController.deletePerson);

module.exports = routes;