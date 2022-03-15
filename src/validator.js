const validators = require("./validators")

const validate = (transaction, account) =>
  validators
    .filter(({ matchs }) => matchs(transaction, account))
    .map(({ name }) => name);

module.exports = { validate };
