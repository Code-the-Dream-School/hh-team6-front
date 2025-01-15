import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { createOrder } from '../api/DBRequests';
import { useAccount } from '../context/AccountProvider';
import { useAuth } from '../context/AuthProvider';

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
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) =>
    setForm((prevForm) => ({ ...prevForm, [name]: value }));

  const validateForm = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setError(validationErrors);
    if (Object.keys(validationErrors).length) return;

    try {
      setIsLoading(true);
      await createOrder({ shippingAddress: form }, token);
      setIsLoading(false);
      setAccountPage('orderHistory');
      navigate('/account');
    } catch (error) {
      setError((prevError) => ({
        ...prevError,
        form: error.message,
      }));
    }
  };

  return { form, error, isLoading, handleChange, handleSubmit };
};

export default useCheckoutForm;
