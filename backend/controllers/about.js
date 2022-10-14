const db = require('../models');
const About = db.about;

exports.createAbout = (req, res) => {
  if(!req.body._id) {
    res.status(400).send({ message: 'Content can"t be empty' });
    return;
  }

  const about = new About({
    _id: req.body._id,
    skills: req.body.skills,
    hobbies: req.body.skills,
  });
  about.save(about).then((data) => {
    console.log(data);
    res.status(201).send(data);
  })
  .catch((error) => {
    res.status(500).send({
      message: error.message || 'Some error occurred while creating about information'
    })
  })
}

exports.getAboutAll = (req, res) => {
  About.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.'
      });
    });
};


exports.getAbout = (req, res) => {
  const aboutId = req.params.aboutId;
  About.find({ aboutId: aboutId })
    .then((data) => {
      if (!data) res.status(404).send({ message: 'Not found in about' + aboutId });
      else res.send(data[0]);
    })
    .catch((error) => {
      res.status(500).send({
        message: 'Error retrieving aboutId' + aboutId,
        error: error
      });
    });
};
