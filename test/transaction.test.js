const { deepStrictEqual } = require("assert");
const { authorize } = require("../src/transaction");
const date = 16292982193362;

(() => {
  {
    transaction = { amount: 10, merchant: "Burger King", time: date };
    account = { active: true, availableLimit: 100, history: [] };

    result = authorize(transaction, account);

    deepStrictEqual(result, {
      account: {
        active: true,
        availableLimit: 90,
        history: [{ amount: 10, merchant: "Burger King", time: date }],
      },
      violations: [],
    });
  }
  {
    transaction = { amount: 10, merchant: "Burger King", time: date };
    account = { active: false, availableLimit: 100, history: [] };

    result = authorize(transaction, account);

    deepStrictEqual(result, {
      account: {
        active: false,
        availableLimit: 100,
        history: [],
      },
      violations: ['account-not-active'],
    });
  }
  {
    transaction = { amount: 110, merchant: "Burger King", time: date };
    account = { active: false, availableLimit: 100, history: [{ amount: 95, merchant: "Burger King", time: date }] };

    result = authorize(transaction, account);

    deepStrictEqual(result, {
      account: {
        active: false,
        availableLimit: 100,
        history: [{ amount: 95, merchant: "Burger King", time: date }],
      },
      violations: ['account-not-active','insufficient-limit'],
    });
  }
  {
    transaction = { amount: 110, merchant: "Burger King", time: date };
    account = { active: false, availableLimit: 100, history: [{ amount: 10, merchant: "Burger King", time: date }] };

    result = authorize(transaction, account);

    deepStrictEqual(result, {
      account: {
        active: false,
        availableLimit: 100,
        history: [{ amount: 10, merchant: "Burger King", time: date }],
      },
      violations: ['account-not-active','insufficient-limit'],
    });
  }
  {
    transaction = { amount: 95, merchant: "Burger King", time: date };
    account = { active: true, availableLimit: 100, history: [] };

    result = authorize(transaction, account);

    deepStrictEqual(result, {
      account: {
        active: true,
        availableLimit: 100,
        history: [],
      },
      violations: ['first-transaction-above-threshold'],
    });
  }
  {
    transaction = { amount: 10, merchant: "Burger King", time: date };
    account = { active: true, availableLimit: 100, history: [] };

    result = authorize(transaction, account);

    deepStrictEqual(result, {
      account: {
        active: true,
        availableLimit: 90,
        history: [{ amount: 10, merchant: "Burger King", time: date }],
      },
      violations: [],
    });
  }
})();
