/*
A customer receives 2 points for every dollar spent over $100 in each transaction, 
plus 1 point for every dollar spent between $50 and $100 in each transaction. 
(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).

Given a record of every transaction during a three month period, calculate the reward 
points earned for each customer per month and total.
*/
import React, {useState, useMemo} from 'react';
import TransactionGrid from './components/TransactionGrid';
import './App.css';

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

const fiftyToOneHundred = x => x > 100 ? 50 : x > 50 ? x - 50 : 0;
const overOneHundred = x => x - 100 > 0 ? (x - 100) * 2 : 0;
const calculatePoints = x => fiftyToOneHundred(x) + overOneHundred(x);

function App() {
  const [inputAmount, setInputAmount] = useState(0);

  const points = useMemo(() => calculatePoints(inputAmount), [inputAmount]);

  return (
    <div className='App'>
      <>
        <div className='insta-calc'>
          transaction amount <input type='number' value={inputAmount} onChange={({target}) => setInputAmount(target.value)} />
          <span>yields {points} points</span>
        </div>
      </>
      <TransactionGrid transactions={transactions} calculatePoints={calculatePoints} />
    </div>
  );
}

export default App;
