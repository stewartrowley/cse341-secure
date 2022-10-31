const routes = require('express').Router();

const personController = require('../controllers/person');
const loadPerson = require("../middleware/loadPerson");
const router = require('./authorization');

router.use([loadPerson])
routes.get('/', personController.getAll);

routes.get('/:username', personController.getPerson);

routes.post('/', personController.create);

routes.put('/:username', personController.updatePerson);

routes.delete('/:username', personController.deletePerson);

module.exports = routes;