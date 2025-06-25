const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URL = 'mongodb://localhost:27017/Expenses-DB';

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log(" Connected to MongoDB successfully!");
    })
    .catch(err => {
        console.error(" MongoDB Connection Error:", err);
    });

const userSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

app.post('/expense', async (req, res) => {
    try {
        const { title, amount } = req.body;
        const newUser = new User({ title, amount });
        await newUser.save();

        res.status(201).json({ message: 'User added successfully!', user: newUser });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ message: 'Failed to add user.' });
    }
});
app.get('/expense',async (req,res)=>{
    try{
        const expenses = await User.find();
        res.json(expenses);
    }catch(error){
        console.log("ERROR FETCHING EXPENSES: ",error)
        res.status(500).json({error: "Failed to fetch expenses"})
    }
})

app.put('/expense/:id',async(req,res)=>{
    try{
        const updateExpense = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        if(!updateExpense){
    return res.status(404).json(error,"Expense not found")
}
res.json(updateExpense);

    }
    catch(error){
        console.log("Error updating expesnes:",error)
    }
})

app.delete('/expense/:id',async(req,res)=>{

    try{
        const deleteExpese = await User.findByIdAndDelete(
            req.params.id
        );
        if(!deleteExpese){
            console.log("ERROR DELETINF EXPENSES",err)
            return res.status(404).json({error:'Expense not found'})
        }
        res.json(deleteExpese)
    }
    catch(err){
        console.error('Error deleted expense:',err);
    }
})

app.listen(PORT, () => {
    console.log(` SERVER RUNNING AT PORT: ${PORT}`);
});
