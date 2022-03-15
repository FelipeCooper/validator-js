module.exports = {
  name: "account-not-active",
  matchs: (transaction, account) => !account.active,
}