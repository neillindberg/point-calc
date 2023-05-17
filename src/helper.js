const fiftyToOneHundred = x => x > 100 ? 50 : x > 50 ? x - 50 : 0;
const overOneHundred = x => x - 100 > 0 ? (x - 100) * 2 : 0;

export const calculatePoints = x => fiftyToOneHundred(x) + overOneHundred(x);

const transactions = [
    { customer_id: 1, transaction_total: 111, month: 1 },
    { customer_id: 2, transaction_total: 222, month: 1 },
    { customer_id: 3, transaction_total: 333, month: 1 },
    { customer_id: 1, transaction_total: 50, month: 2 },
    { customer_id: 2, transaction_total: 100, month: 2 },
    { customer_id: 3, transaction_total: 150, month: 2 },
    { customer_id: 1, transaction_total: 200, month: 3 },
    { customer_id: 2, transaction_total: 400, month: 3 },
    { customer_id: 3, transaction_total: 800, month: 3 },
  ];

export const fetchTransactions = () => new Promise((resolve) => setTimeout(() => resolve(transactions), 2000));
