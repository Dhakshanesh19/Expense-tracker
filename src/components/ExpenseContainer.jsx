import { useState } from "react";
import History from "./History";
import { Expenseform } from "./Expenseform";
import BalanceContainer from "./BalanceContainer";
import { v4 as uuid } from 'uuid';
const EXPENSES=[{
    id:uuid(),
    title:"EXPENSE1",
    amount:-10
},
{
    id:uuid(),
    title:"EXPENSE2",
    amount:20
}
];

function ExpenseContainer(){
    const [expenses,setExpense] = useState(EXPENSES);
    const [itemToEdit,setItemToEdit] = useState(null)
    const addExpense=(title,amount)=>{
        setExpense(
            [
                ...expenses,{
                    id:uuid(),
                    title,
                    amount
                }
            ]
        )
    }
const deleteExpenses = (id) => {
    setExpense(expenses.filter(exp=>exp.id != id))
}
const updateExpense = (id, newTitle) => {
    setExpense(expenses.map(exp => exp.id === id ? { ...exp, title: newTitle } : exp));
  }
  
    return(
    <>
    <div className="expense-container">
        <h1>EXPENSE TRACKER</h1>
        <BalanceContainer expenses={expenses} />
        <History expenses={expenses} deleteExpenses={deleteExpenses} updateExpense={updateExpense}/>
        <Expenseform addExpense={addExpense}/>
    </div>
    
    </>
    );
}

export default ExpenseContainer;