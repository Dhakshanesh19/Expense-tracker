const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URL = 'mongodb+srv://dhakshaneshr23cse:dhakshanesh@cluster0.c6iegky.mongodb.net/expenseDB?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URL)
  .then(() => console.log(" Connected to MongoDB successfully!"))
  .catch(err => console.error(" MongoDB Connection Error:", err));

const userSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true }  
});

const User = mongoose.model('User', userSchema);

app.post('/expense', async (req, res) => {
  try {
    const { title, amount } = req.body;
    const newUser = new User({ title, amount });
    await newUser.save();
    res.status(201).json(newUser);  
  } catch (error) {
    console.error(' Error inserting expense:', error);
    res.status(500).json({ message: 'Failed to add expense.' });
  }
});

app.get('/expense', async (req, res) => {
  try {
    const expenses = await User.find();
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

app.put('/expense/:id', async (req, res) => {
  try {
    const updatedExpense = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }  
    );

    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json(updatedExpense);
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Failed to update expense" });
  }
});

app.delete('/expense/:id', async (req, res) => {
  try {
    const deletedExpense = await User.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(deletedExpense);
  } catch (err) {
    console.error(' Error deleting expense:', err);
    res.status(500).json({ message: 'Failed to delete expense' });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

