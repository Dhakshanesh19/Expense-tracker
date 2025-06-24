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
    name: { type: String, required: true },
    email: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

app.post('/expense', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new User({ name, email });
        await newUser.save();

        res.status(201).json({ message: 'User added successfully!', user: newUser });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ message: 'Failed to add user.' });
    }
});

app.listen(PORT, () => {
    console.log(` SERVER RUNNING AT PORT: ${PORT}`);
});
