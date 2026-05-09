import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import UserRouter from './Routes/UserRouter.js';
import teacherRouter from './Routes/TeacherRouter.js';
import classRouter from './Routes/classRouter.js';
import roomRouter from './Routes/roomRouter.js';
import subjectRouter from './Routes/subjectRouter.js';
import timeSlotRouter from './Routes/timeSlotRouter.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// api endpoint
app.use("/api/user", UserRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/class", classRouter);
app.use("/api/room", roomRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/timeslots", timeSlotRouter);

// db connection
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});