import React, { useEffect, useState } from 'react';
import { calculatePoints } from '../helper';

const TableRow = ({contents, rowKey}) => {
    return (
        <div className='tg-row' key={rowKey}>
            {contents.map((cellText, cellNum) => <div className='tg-cell' key={`${rowKey}-cell-${cellNum}`}>{cellText}</div>)}
        </div>
    );
}

const TransactionGrid = ({transactions}) => {
    const [transByCustomer, setTransByCustomer] = useState({});

    useEffect(() => {
        const reformatted = transactions.reduce((acc, curr) => {
            const {customer_id, transaction_total, month} = curr;
            if (!acc[customer_id]) acc[customer_id] = {};
            acc[customer_id][`month${month}`] = [transaction_total, calculatePoints(transaction_total)];
            acc[customer_id].total_points = (acc[customer_id].total_points || 0) + acc[customer_id][`month${month}`][1];
            return acc;
        }, {});
        setTransByCustomer(reformatted);
    }, [transactions]);

    return (
        <div className='tg-table'>
            <TableRow 
                contents={['Customer', 'M1 - Transactions', 'M1 - Points', 'M2 - Transactions',
                'M2 - Points', 'M3 - Transactions', 'M3 - Points', 'Points Total']}
                key='table-header'
                rowKey='table-header'
            />
            {Object.entries(transByCustomer).map(([key, value]) => {
                const { month1, month2, month3, total_points } = value;
                const [m1Mon, m1Pnts] = month1;
                const [m2Mon, m2Pnts] = month2;
                const [m3Mon, m3Pnts] = month3;
                const rowKey = `customer${key}`;
                return (
                    <TableRow
                        contents={[key, m1Mon, m1Pnts, m2Mon, m2Pnts, m3Mon, m3Pnts, total_points]}
                        key={rowKey}
                        rowKey={rowKey}
                    />
                );
            })}
        </div>
    )
};

export default TransactionGrid;