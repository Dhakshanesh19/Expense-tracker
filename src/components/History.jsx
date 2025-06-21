import React from 'react'
import Expenseitem from './Expenseitem'

export default function History(props) {
    const { expenses } = props
    const { deleteExpenses,updateExpense } = props;  


    return (
        <>
            <div className='history'>History</div>
            {expenses.map((expense) => {
        return (
        <Expenseitem key={expense.id} id={expense.id} title={expense.title} amount={expense.amount} deleteExpense={props.deleteExpenses} 
        updateExpense={updateExpense}        />
                )
            })}
        </>
    )
}
