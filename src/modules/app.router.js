import { connectDB } from '../../DB/connection.js';
import cors from 'cors';
import authRouter from './auth/auth.router.js';
import userRouter from './user/user.router.js';
import messageRouter from './message/message.router.js';
import { globalErrorHandler } from '../utils/errorHandling.js';

export const initApp = (app,express) => {
    connectDB();
    app.use(cors());
    app.use(express.json());
    app.get('/', (req, res) => {
        return res.status(200).json({message : 'Welcome to the saraha app'});
    });
    app.use('/auth' , authRouter);
    app.use('/user' , userRouter);
    app.use('/message' , messageRouter);
    app.use(globalErrorHandler);
    app.use('*',(req,res) => {
        return res.status(404).json({message : 'Page Not found'});
    });

}