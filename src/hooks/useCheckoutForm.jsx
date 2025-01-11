import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { useAccount } from '../context/AccountProvider';
import { createOrder } from '../api/DBRequests';

const useCheckoutForm = () => {
  const { token } = useAuth();
  const { setAccountPage } = useAccount();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    address: "",
    city: "",
    zip: "",
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) =>
    setForm((prevForm) => ({ ...prevForm, [name]: value }));

  const validateForm = () => {
    const errors = {};
    if (!form.email) errors.email = 'Email is required';
    if (!form.firstName) errors.firstName = 'First Name is required';
    if (!form.lastName) errors.lastName = 'Last Name is required';
    if (!form.country) errors.country = 'Country is required';
    if (!form.address) errors.address = 'Address is required';
    if (!form.city) errors.city = 'City is required';
    if (!form.zip) errors.zip = 'Zip is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setError(validationErrors);
    if (Object.keys(validationErrors).length) return;
      
    try {
      setIsLoading(true);
      await createOrder( {shippingAddress: form}, token);  
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
}

export default useCheckoutForm;