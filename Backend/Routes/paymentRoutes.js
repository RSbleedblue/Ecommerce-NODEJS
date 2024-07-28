import { Router } from 'express';
import PaymentController from '../controllers/paymentController.js';

const paymentRouter = Router();

paymentRouter.post('/createOrder', PaymentController.createOrder);
paymentRouter.post('/verifyPayment', PaymentController.verifyPayment);

export default paymentRouter;
