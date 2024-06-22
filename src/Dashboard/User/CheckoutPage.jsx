import React, { useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AuthContext } from '../../Provider/AuthContextProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const CheckoutForm = () => {
    const {biodataId} = useParams();
    console.log(biodataId)
    const axiosPublic = useAxiosPublic()
    const { user } = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        const cardElement = elements.getElement(CardElement);

        try {
            // Create a payment intent on the server
            const { data: clientSecret } = await axiosPublic.post(`/create-payment-intent`, {
                amount: 500, // 5 USD in cents
            });

            // Confirm the payment with Stripe
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        email: user.email,
                    },
                },
            });

            if (paymentResult.error) {
                toast.error(paymentResult.error.message);
                setLoading(false);
                return;
            }

            if (paymentResult.paymentIntent.status === 'succeeded') {
                // Create a contact request on the server
                await axiosPublic.post(`/contact-requests`, {
                    biodataId,
                    email: user.email,
                });
                toast.success('Payment successful, contact request sent!');
            }
        } catch (error) {
            toast.error('Payment failed, please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='lg:pt-16 lg:pl-12'>
            <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-group ">
                    <label>Biodata ID</label>
                    <input type="text" value={biodataId} readOnly className="form-control" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={user.email} readOnly className="form-control" />
                </div>
                <div className="form-group">
                    <label>Card Details</label>
                    <CardElement className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={!stripe || loading}>
                    {loading ? 'Processing...' : 'Pay $5'}
                </button>
            </form>
        </div>
    );
};

const CheckoutPage = () => (
  
    <Elements stripe={stripePromise}>
        <CheckoutForm/>
    </Elements>
);

export default CheckoutPage;
