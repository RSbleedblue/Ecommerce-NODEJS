import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

class PaymentController {
    async createOrder(req, res) {
        const { amount, currency, receipt } = req.body;
        const options = {
            amount: amount * 100, 
            currency: currency,
            receipt: receipt,
        };

        try {
            const order = await razorpay.orders.create(options);
            return res.status(200).json({
                success: true,
                order,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error creating order',
                error: error.message,
            });
        }
    }
    async verifyPayment(req, res) {
        const { order_id, payment_id, signature } = req.body;
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(`${order_id}|${payment_id}`);
        const generatedSignature = hmac.digest('hex');

        if (generatedSignature === signature) {
            return res.status(200).json({
                success: true,
                message: 'Payment verified successfully',
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Payment verification failed',
            });
        }
    }
}

export default new PaymentController();
