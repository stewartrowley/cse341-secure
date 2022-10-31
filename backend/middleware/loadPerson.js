const appConfig = require("../config/app");
const Person = require("../models/person");

const loadPerson = async (req, res, next) => {
  if (!req.headers.authorization) next();
  const token = parseToken(req);

  const authZeroPerson = await fetchAuthZeroPerson(token);
  const person = await findOrCreatePerson(authZeroPerson);

  req.person = person;

  next();
};

const findOrCreatePerson = async (authZeroPersonJson) => {
  if (!authZeroPersonJson) return;

  const existingPerson = await Person.findOne({ username: authZeroPersonJson.sub });

  if (existingPerson) return existingPerson;

  const newPerson = await Person.create({
    username: authZeroPersonJson.sub,
    password: authZeroPersonJson.password,
    firstName: authZeroPersonJson.firstName,
    lastName: authZeroPersonJson.lastName,
    email: authZeroPersonJson.email,
    phoneNumber: authZeroPersonJson.phoneNumber,
    profile: authZeroPersonJson.profile,
  });

  return newPerson;
};

const fetchAuthZeroPerson = async (token) => {
  const response = await fetch(`${appConfig.authorizationHost}/personinfo`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.json();
};

const parseToken = (req) => {


  return req.headers.authorization.split(" ")[1];
};

module.exports = loadPerson;