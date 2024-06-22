import React, { useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AuthContext } from '../../Provider/AuthContextProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const CheckoutForm = () => {
    const { biodataId } = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
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
            const { data } = await axiosPublic.post(`/create-payment-intent`, {
                amount: 500, // 5 USD in cents
            });

            const clientSecret = data.clientSecret;

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
                console.log("success");
                const res = await axiosPublic.post(`/contact-requests`, {
                    biodataId,
                    email: user.email,
                });
                if (res.data.insertedId) {
                    toast.success('Payment successful, contact request sent!');
                    navigate('/dashboard/contact-request')
                }
            }
        } catch (error) {
            toast.error('Payment failed, please try again.');
        } finally {
            setLoading(false);
        }
    };
    console.log(biodataId)
    return (
        <div className="lg:pt-16 lg:pl-12">
            <form onSubmit={handleSubmit} className="checkout-form p-6 bg-white shadow-lg rounded-lg">
                <div className="form-group mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Biodata ID</label>
                    <input type="text" value={biodataId} readOnly className="form-control w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="form-group mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input type="email" value={user.email} readOnly className="form-control w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="form-group mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Card Details</label>
                    <div className="form-control w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <CardElement />
                    </div>
                </div>
                <button type="submit" className=" w-full px-4 py-2 bg-primary2 hover:bg-primary text-white font-semibold rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" disabled={!stripe || loading}>
                    {loading ? 'Processing...' : 'Pay $5'}
                </button>
            </form>

        </div>
    );
};

const CheckoutPage = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default CheckoutPage;
