import express, {json} from 'express';
import userRouter from './Routes/userRoutes.js';
import dotenv from 'dotenv';
import productRoutes from './Routes/productRoutes.js';
import blogRoutes from './Routes/blogRoutes.js';

const app =express();
dotenv.config();
app.use(json());
app.use('/api/user',userRouter);
app.use('/api/product',productRoutes);
app.use('/api/blogs/',blogRoutes);

export default app;