import { useState, useEffect, useCallback } from 'react';

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

import { createOrder, createClientSecret } from '../api/DBRequests';
import { useAccount } from '../context/AccountProvider';
import { useAuth } from '../context/AuthProvider';

const VITE_STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

const useCheckoutForm = () => {
  const { token } = useAuth();
  const { setAccountPage } = useAccount();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    address: '',
    city: '',
    zip: '',
    cardholderName: '',
  });

  const [error, setError] = useState({});
  const [paymentErrors, setPaymentErrors] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe(VITE_STRIPE_PUBLIC_KEY);
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);

  const getClientSecret = useCallback(async () => {
    try {
      const secret = await createClientSecret(token);
      setClientSecret(secret);
    } catch (err) {
      console.error('Error fetching client secret:', err);
    }
  }, [token]);

  useEffect(() => {
    if (stripe && token) {
      getClientSecret();
    }
  }, [stripe, token, getClientSecret]);

  const handleChange = ({ target: { name, value } }) =>
    setForm((prevForm) => ({ ...prevForm, [name]: value }));

  const validateAddress = () => {
    const requiredFields = {
      email: 'Email is required',
      firstName: 'First Name is required',
      lastName: 'Last Name is required',
      country: 'Country is required',
      address: 'Address is required',
      city: 'City is required',
      zip: 'Zip is required',
    };

    return Object.entries(requiredFields).reduce((errors, [field, message]) => {
      if (!form[field]) errors[field] = message;
      return errors;
    }, {});
  };

  const validatePayment = async () => {
    const errors = {};

    if (!stripe || !elements) {
      errors.payment = 'Payment system is not ready yet.';
      return errors;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const expiryElement = elements.getElement(CardExpiryElement);
    const cvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardNumberElement._complete) {
      errors.cardNumberElement = 'Card number is incomplete.';
    }
    if (!expiryElement || !expiryElement._complete) {
      errors.cardExpiry = 'Card expiry date is incomplete.';
    }
    if (!cvcElement || !cvcElement._complete) {
      errors.cardCvc = 'Card CVC is incomplete.';
    }

    if (!form.cardholderName) {
      errors.cardholderName = 'Cardholder name is required.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addressErrors = validateAddress();
    const paymentErrors = await validatePayment();
    setPaymentErrors(paymentErrors);
    setError({ ...addressErrors, ...paymentErrors });
    if (Object.keys(addressErrors).length || Object.keys(paymentErrors).length)
      return;

    try {
      setIsLoading(true);

      if (stripe && elements && clientSecret) {
        const cardNumberElement = elements.getElement(CardNumberElement);

        const paymentMethod = {
          card: cardNumberElement,
          billing_details: {
            name: form.cardholderName,
            email: form.email,
            address: {
              line1: form.address,
              city: form.city,
              postal_code: form.zip,
              country: 'US',
            },
          },
        };

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: paymentMethod,
          }
        );

        if (error) {
          setError({ form: error.message });
          setIsLoading(false);
        } else if (paymentIntent.status === 'succeeded') {
          await createOrder({ shippingAddress: form }, token);
          setIsLoading(false);
          setAccountPage('orderHistory');
          navigate('/account');
        } else {
          setError({ form: 'Payment failed, please try again.' });
          setIsLoading(false);
        }
      }
    } catch (error) {
      setError((prevError) => ({
        ...prevError,
        form: error.message,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    error,
    paymentErrors,
    isLoading,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    handleChange,
    handleSubmit,
  };
};

export default useCheckoutForm;
