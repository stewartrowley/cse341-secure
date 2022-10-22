const db = require('../models');
const passwordUtil = require('../utils/passwordChecker');
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

exports.updatePerson = (req, res) => {
  try {
    const username = req.params.username;
    if (!username) {
      res.status(400).send({ message: 'Invalid username' });
      return;
    }

    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }    

    Person.findOne({ username: username }, function (error, person) {
      person.username = req.params.username;
      person.password = req.params.password;
      person.firstName = req.params.firstName;
      person.lastName = req.params.lastName;
      person.email = req.params.email;
      person.phoneNumber = req.params.phoneNumber;
      person.profile = req.params.profile;
      person.save(function (error) {
        if (error) {
          res.status(500).json(error || 'Some error occurred while updating the person.');
        } else {
          res.status(204).send();
        }
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deletePerson = (req, res) => {
  try {
    const username = req.params.username;
    if (!username) {
      res.status(400).send({ message: 'Invalid Username' });
      return;
    }
    Person.deleteOne({ username: username }, function (error, result) {
      if (error) {
        res.status(500).json(error || 'Some error occurred while deleting the person.');
      } else {
        res.status(204).send(result);
      }
    });
  } catch (error) {
    res.status(500).json(error || 'Some error occurred while deleting the person.');
  }
};
