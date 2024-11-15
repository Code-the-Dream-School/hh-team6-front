import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import { login } from '../../api/DBRequests';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError({
        email: !form.email ? 'Email is required' : null,
        password: !form.password ? 'Password is required' : null,
      });
      return;
    }

    try {
      const result = await login(form);
      if (result.status === 200) {
        navigate('/');
      }
    } catch (error) {
      setError({
        ...error,
        form: 'Invalid email or password',
      });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="bg-lightBlue p-10 flex flex-col items-center rounded-[5px] w-full max-w-[420px] min-w-[320px]">
        <h2 className="font-headings font-bold text-2xl mb-5">Log In</h2>

        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <p className="mb-3">
            {`Don't have an account? `}
            <Link to="/sign_up" className="underline">
              Sign up
            </Link>
          </p>

          <div className="w-full flex flex-col gap-1 mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="border-2 border-gray rounded p-2 w-full"
            />
            {error.email && <p className="text-red">{error.email}</p>}
          </div>

          <div className="w-full flex flex-col gap-1 mb-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              className="border-2 border-gray rounded p-2 w-full"
            />
            {error.password && <p className="text-red">{error.password}</p>}
          </div>

          <p>
            <Link
              to="/password/reset"
              className="underline w-full flex flex-col mb-7"
            >
              Forgot password?
            </Link>
          </p>

          <button
            type="submit"
            className="w-full bg-red text-white font-semibold tracking-wide rounded-md p-2"
          >
            Log In
          </button>

          {error.form && <p className="text-red">{error.form}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
