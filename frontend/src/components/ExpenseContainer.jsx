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
    console.log("ITEM TO EDIT : ",itemToEdit)
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

const editExpense = (id,title,amount) =>{
    setExpense(expenses.map((exp)=>{
        if(exp.id == id){
            return {id,title,amount};
        }
        return exp;
    })
)
    setItemToEdit(null)
}
  
return (
    <>
        <div className="expense-container">
            <h1>EXPENSE TRACKER</h1>
            <BalanceContainer expenses={expenses} />
            <Expenseform addExpense={addExpense} itemToEdit={itemToEdit} updateExpense={editExpense} setItemToEdit={setItemToEdit}/>
            <History expenses={expenses} deleteExpenses={deleteExpenses} setItemToEdit={setItemToEdit} />

        </div>
    </>
);

}

export default ExpenseContainer;