import { paymentService } from "../../services/index.js";
import { successHandler } from "../../utils/successHandler.js";

export const createPaymentIntent = async (req, res) => {
    try {
        const { amount, currency } = req.body;

        if (!amount) {
            return res.status(400).json({ success: false, message: 'Amount is required' });
        }
        if (!currency) {
            return res.status(400).json({ success: false, message: 'Currency is required' });
        }
        const response = await paymentService.createPaymentIntent(amount, currency);
        let data = {
            client_secret: response.paymentIntent.client_secret
        }
        successHandler(res, 200, 'Payment intent created successfully', data);
    } catch (error) {
        console.error('Failed to create payment intent', error.message);
        res.status(500).json({
            message: 'Failed to create payment intent',
            status: false,
            success: false,
            error: error.message
        });
    }
};
