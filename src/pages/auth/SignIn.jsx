import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Button } from '@headlessui/react';

import { login } from '../../api/DBRequests';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!form.email) errors.email = 'Email is required';
    if (!form.password) errors.password = 'Password is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const result = await login(form);
      if (result.status === 200) {
        navigate('/');
      }
    } catch (error) {
      setError((prevError) => ({
        ...prevError,
        form: error.message,
      }));
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full min-w-[320px] max-w-[420px] flex-col items-center rounded-[5px] bg-lightBlue p-10">
        <h2 className="mb-5 font-headings text-2xl font-bold">Log In</h2>

        <form onSubmit={handleSubmit} className="flex w-full flex-col">
          <p className="mb-3">
            {`Don't have an account? `}
            <Link to="/sign_up" className="underline">
              Sign up
            </Link>
          </p>

          <div className="mb-3 flex w-full flex-col gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded border-2 border-gray p-2"
            />
            {error.email && <p className="text-red">{error.email}</p>}
          </div>

          <div className="mb-3 flex w-full flex-col gap-1">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded border-2 border-gray p-2"
            />
            {error.password && <p className="text-red">{error.password}</p>}
          </div>

          <p className="mb-7">
            <Link
              to="/password/reset"
              className="flex w-full flex-col underline"
            >
              Forgot password?
            </Link>
          </p>

          <Button
            as="button"
            type="submit"
            className="w-full rounded-md bg-red p-2 font-semibold tracking-wide text-white"
          >
            Log In
          </Button>

          {error.form && <p className="mt-2 text-red">{error.form}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
