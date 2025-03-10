import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (amount, currency) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });
        return { paymentIntent };
    } catch (error) {
        throw new Error('Failed to create payment intent' + error.message);
    }
};
