module.exports= {
  name: "insufficient-limit",
  matchs: (transaction, account) =>
    account.availableLimit < transaction.amount,
}