import express from 'express'
import { teacherLogin } from '../controller/teacherloginController.js'

const teacherloginRouter = express.Router()

teacherloginRouter.post("/teacherlogin",teacherLogin);

export default teacherloginRouter;