import { useState, useEffect } from "react";
import History from "./History";
import { Expenseform } from "./Expenseform";
import BalanceContainer from "./BalanceContainer";

const API = import.meta.env.VITE_API_URL;

function ExpenseContainer() {
  const [expenses, setExpense] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${API}/expense`);
      const data = await response.json();
      setExpense(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (title, amount) => {
    try {
      const response = await fetch(`${API}/expense`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, amount }),
      });

      if (response.ok) {
        const newItem = await response.json();
        setExpense(prev => [...prev, newItem]);
      }
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  const deleteExpenses = async (id) => {
    try {
      const response = await fetch(`${API}/expense/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setExpense(prev => prev.filter(exp => exp._id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const editExpense = async (id, title, amount) => {
    try {
      const response = await fetch(`${API}/expense/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, amount }),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        setExpense(prev =>
          prev.map(exp => (exp._id === id ? updatedItem : exp))
        );
        setItemToEdit(null);
      }
    } catch (error) {
      console.error("Edit error:", error);
    }
  };

  return (
    <div className="expense-container">
      <h1>EXPENSE TRACKER</h1>
      <BalanceContainer expenses={expenses} />
      <Expenseform
        addExpense={addExpense}
        itemToEdit={itemToEdit}
        updateExpense={editExpense}
        setItemToEdit={setItemToEdit}
      />
      <History
        expenses={expenses}
        deleteExpenses={deleteExpenses}
        updateExpense={editExpense}
        setItemToEdit={setItemToEdit}
      />
    </div>
  );
}

export default ExpenseContainer;
