module.exports =  {
  name: "first-transaction-above-threshold",
  matchs: (transaction, account) =>
    account.history.length === 0 &&
    transaction.amount / account.availableLimit > 0.9,
}