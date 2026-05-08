import express from 'express';
import { LoginUser, RegisterUser } from '../controller/userCntroller.js';


const UserRouter = express.Router();

// Example route for getting user information

UserRouter.post('/register', RegisterUser);
UserRouter.post("/login", LoginUser)

export default UserRouter;