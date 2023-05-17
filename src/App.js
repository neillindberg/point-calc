import React, { useEffect, useState } from 'react';
import TransactionGrid from './components/TransactionGrid';
import { fetchTransactions } from './helper';

function App() {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const getTransactions = async () => {
      const response = fetchTransactions();
      response.then(data => setTransactions(data));
    }
    getTransactions();
  }, []);

  return (
    <>
      {transactions ? 
        <TransactionGrid transactions={transactions} /> 
        : 
        <div className='loading'>Loading...</div>
      }
    </>
  );
}

export default App;
