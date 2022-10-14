const db = require('../models');
const Person = db.person;

exports.create = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: 'Content can"t be empty' });
    return;
  }

  const person = new Person(req.body);
  person
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || 'Some error occurred while creating a person'
      });
    });
};

exports.getAll = (req, res) => {
  Person.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || 'Some error occurred while getting a person.'
      });
    });
};


exports.getPerson = (req, res) => {
  const username = req.params.username;
  Person.find({ username: username })
    .then((data) => {
      if (!data) res.status(404).send({ message: 'Not found in about' + username });
      else res.send(data[0]);
    })
    .catch((error) => {
      res.status(500).send({
        message: 'Error retrieving aboutId' + username,
        error: error
      });
    });
};