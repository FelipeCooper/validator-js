const { validate } = require('./validator')
function authorize(transaction, account) {
  const violations = validate(transaction, account)

  if(violations.length === 0){
    account.history.push(transaction);
    account.availableLimit -= transaction.amount;
  }
  return { account, violations };
}

module.exports = {
  authorize,
};
