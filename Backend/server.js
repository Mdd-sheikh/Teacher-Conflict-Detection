import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



// db connection
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});