import React, { useState, useEffect } from 'react';

export const Expenseform = (props) => {
    const isEdit = props.itemToEdit;
    console.log(isEdit);

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");

   

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title) {
            setError("Please enter the title");
            return;
        }
        if (!amount) {
            setError("Please enter the amount");
            return;
        }

        if (isEdit) {
            props.updateExpense(isEdit.id, title, amount);
        } else {
            props.addExpense(title, amount);
        }

        setError("");
        setTitle("");
        setAmount("");
        props.setItemToEdit(null); 
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(Number(e.target.value));
    };

    const handleClear = () => {
        props.setItemToEdit(null); 
    };

    return (
        <>
            <div>Expenseform</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>{isEdit ? "EDIT EXPENSE" : "ADD EXPENSE"}</h2>
                {isEdit?<button type='button' onClick={handleClear}>Clear</button>:""}
                 
            </div>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' id='title' name='title' value={title} onChange={handleTitleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='amount'>Amount ($)</label>
                    <input type='number' id='amount' name='amount' value={amount} onChange={handleAmountChange} />
                </div>
                {error && <div className='error'>{error}</div>}

                <button type='submit'>{isEdit ? "UPDATE EXPENSE" : "ADD EXPENSE"}</button>
            </form>
        </>
    );
};
