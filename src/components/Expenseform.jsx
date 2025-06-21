import React from 'react'
import { useState } from 'react'
export const Expenseform = (props) => {
    const isEdit=props.itemToEdit;

    const [title, setTitle] = useState(isEdit ? isEdit.title : "");
    const [amount,setAmount] = useState()
    const [error,setError] = useState("")

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!title){
            setError("Please enter the title");
            return;
        }
        if(!amount){
            setError("Please enter the amount");
            return;
        }

        props.addExpense(title,amount);
        setError("");
        setTitle("");
        setAmount("");
    };
    const handleTitleChange = (e)=>{
        setTitle(e.target.value)
    };
    const handleAmountChange = (e)=>{
        setAmount(Number(e.target.value));

    }
  return (
    <>
        <div >Expenseform</div>
        <h2>{isEdit ? "EDIT EXPENSE" : "ADD EXPENSE"}</h2>
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' name='title' value={title} onChange={handleTitleChange} />
            </div>
            <div className='form-group'>
                <label htmlFor='amount'>Amount ($)</label>
                <input type='number' id='amount' name='amount' value={amount} onChange={handleAmountChange}/>
            </div>
            {error&&<div className='error'>{error}</div>}

            <button type='submit'>{isEdit ? "UPDATE EXPENSE" : "ADD EXPENSE"}</button>

        </form>
        </>
  )
}
