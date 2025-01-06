import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { register } from '../api/DBRequests';
import { useAuth } from '../context/AuthProvider';

const useSignUpForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState({});
  const { setUserSession } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) =>
    setForm((prevForm) => ({ ...prevForm, [name]: value }));

  const validateForm = () => {
    const errors = {};
    if (!form.email) errors.email = 'Email is required';
    if (!form.password) errors.password = 'Password is required';
    if (!form.firstName) errors.firstName = 'First Name is required';
    if (!form.lastName) errors.lastName = 'Last Name is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setError(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setIsLoading(true);

    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const { data, status } = await register(headers, form);
      if (status === 201) {
        setUserSession({
          user: data.userData,
          token: data.token,
        });
        navigate('/');
      }
    } catch (error) {
      setError((prevError) => ({
        ...prevError,
        form: error.message,
      }));
    }
    setIsLoading(false);
  };

  return { form, error, isLoading, handleChange, handleSubmit };
};

export default useSignUpForm;
