import React from 'react';
import { Bar, BarChart, Cell, Tooltip, XAxis, YAxis } from 'recharts';

const Barchart = ({userData, activeIndex }) => {

    const categoryExpenses = {};
    userData.expenses.forEach(expense => {
        const { category, amount } = expense;
        if (categoryExpenses[category]) {
            categoryExpenses[category] += amount;
        } else {
            categoryExpenses[category] = amount;
        }
    });

    const aggregatedData = Object.keys(categoryExpenses).map(category => ({
        category,
        amount: categoryExpenses[category]
    }));
    const sortedData = aggregatedData.sort((a, b) => b.amount - a.amount);

    return (
        <div >
        <BarChart width={417} height={345} data={sortedData} layout="vertical" margin={{top: 5, right: 30, left: 48, bottom: 5,}} borderRadius={40}>
            <XAxis type="number" hide={true}/>
            <YAxis dataKey="category" type="category" />
            <Tooltip />
            
            <Bar dataKey="amount" fill="#8884d8" barSize={20}>
                {sortedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} />
                ))}
            </Bar>
        </BarChart>
    </div>
    );
};


export default Barchart;