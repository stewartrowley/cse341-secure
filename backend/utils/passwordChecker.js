const passwordComplexity = require('joi-password-complexity');
const complexityOptions = {
  min: 8,
  max: 18,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 2,
  requirementCount: 4
};

module.exports.passwordPass = (passwordToCheck) => {
  return passwordComplexity(complexityOptions, 'Password').validate(passwordToCheck);
};