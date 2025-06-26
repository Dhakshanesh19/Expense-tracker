import { useState, useEffect } from "react";
import History from "./History";
import { Expenseform } from "./Expenseform";
import BalanceContainer from "./BalanceContainer";

function ExpenseContainer() {
  const [expenses, setExpense] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:3000/expense');
      const data = await response.json();
      setExpense(data); // assumes data is an array of { _id, title, amount }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (title, amount) => {
    try {
      const response = await fetch('http://localhost:3000/expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, amount }),
      });

      if (response.ok) {
        const newItem = await response.json(); // e.g., { _id, title, amount }
        setExpense(prev => [...prev, newItem]);
      } else {
        console.error("Failed to add expense");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // 🧹 Locally delete from state (you can also call backend DELETE if needed)
  const deleteExpenses = (id) => {
    setExpense(expenses.filter(exp => exp._id !== id));
  };

  const editExpense = (id, title, amount) => {
    setExpense(expenses.map((exp) => {
      if (exp._id === id) {
        return { _id: id, title, amount }; // keep `_id` consistent
      }
      return exp;
    }));
    setItemToEdit(null);
  };

  if (loading) return <div>Loading expenses...</div>;

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
        setItemToEdit={setItemToEdit}
      />
    </div>
  );
}

export default ExpenseContainer;
