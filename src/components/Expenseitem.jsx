import React from 'react';
import  { useState } from 'react';


export default function Expenseitem(props) {
  const { id, title, amount, deleteExpense }=props
  const type = amount > 0 ? "income" : "expense";
  const [isUpdating, setIsUpdating] = useState(false);  

  function handleDelete() {
    deleteExpense(id); 
}

  function handleUpdate() {
    props.setItemToEdit(props.expense);
  }

  function handleUpdateChange(e) {
    setUpdatedTitle(e.target.value);
  }

  function handleUpdateSubmit() {
    updateExpense(id, updatedTitle); 
    setIsUpdating(false);
  }

  return (
    <>
      <div className={`expense-item ${type}`}>
        <div className='expense-title'>{title}</div>
        <div className='expense-amount'>{amount}</div>
        <div className='delete-button-overlay'>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleUpdate}>Update</button>

        </div>
      </div>
    </>
  )
}
