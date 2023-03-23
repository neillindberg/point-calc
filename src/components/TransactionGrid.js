import React from 'react';
// rows are by customer
// columns should be by numeric month + end column with total
// NOTE: unsure if total points should be a sum of the different months points
//        or calculated from summing transactions, and then points from there?
const TransactionGrid = ({transactions = [], calculatePoints}) => {
    const transByCustomer = transactions.reduce((acc, curr) => {
        const {customer_id, transaction_total, month} = curr;
        if (!acc[customer_id]) acc[customer_id] = {};
        acc[customer_id][`month${month}`] = [transaction_total, calculatePoints(transaction_total)];
        acc[customer_id].total_points = (acc[customer_id].total_points || 0) + acc[customer_id][`month${month}`][1];
        return acc;
    }, {});

    return (
        <div className='tg-wrapper'>
            <div className='tg-table'>
                <div className='tg-row'>
                    <div className='tg-cell'>Customer</div>
                    <div className='tg-cell'>M1 - Transactions</div>
                    <div className='tg-cell'>M1 - Points</div>
                    <div className='tg-cell'>M2 - Transactions</div>
                    <div className='tg-cell'>M2 - Points</div>
                    <div className='tg-cell'>M3 - Transactions</div>
                    <div className='tg-cell'>M3 - Points</div>
                    <div className='tg-cell'>Points Total</div>
                </div>
                {Object.entries(transByCustomer).map(([key, value]) => {
                    const { month1, month2, month3, total_points } = value;
                    return (
                        <div className='tg-row' key={`customer${key}`}>
                            <div className='tg-cell'>{key}</div>
                            <div className='tg-cell'>{month1[0]}</div>
                            <div className='tg-cell'>{month1[1]}</div>
                            <div className='tg-cell'>{month2[0]}</div>
                            <div className='tg-cell'>{month2[1]}</div>
                            <div className='tg-cell'>{month3[0]}</div>
                            <div className='tg-cell'>{month3[1]}</div>
                            <div className='tg-cell tg-total'>{total_points}</div>
                        </div>
                    );
                })}
            </div>
            
        </div>
    )
};

export default TransactionGrid;