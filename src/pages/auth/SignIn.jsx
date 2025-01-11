import { Button } from '@headlessui/react';
import { Link } from 'react-router-dom';

import LabelAndInput from '../../components/Form/LabelAndInput';
import useAuthForm from '../../hooks/useAuthForm';
import Preloader from '../../layouts/Preloader';

const SignIn = () => {
  const { form, error, isLoading, handleChange, handleSubmit } = useAuthForm();

  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="flex w-full min-w-[320px] max-w-[420px] flex-col items-center rounded-[5px] bg-lightBlue p-10">
        <h2 className="mb-5 font-headings text-2xl font-bold">Log In</h2>

        {isLoading && <Preloader />}

        <form onSubmit={handleSubmit} className="flex w-full flex-col">
          <p className="mb-3">
            {`Don't have an account? `}
            <Link to="/sign_up" className="underline">
              Sign up
            </Link>
          </p>

          <LabelAndInput
            id="email"
            name="email"
            type="email"
            value={form.email}
            error={error.email}
            onChange={handleChange}
          >
            Email
          </LabelAndInput>

          <LabelAndInput
            id="password"
            name="password"
            type="password"
            value={form.password}
            error={error.password}
            onChange={handleChange}
          >
            Password
          </LabelAndInput>

          <Link to="/password/reset" className="block underline">
            Forgot password?
          </Link>

          <Button
            as="button"
            type="submit"
            className="mt-7 w-full rounded-md bg-red p-2 font-semibold tracking-wide text-white transition-transform duration-200 hover:bg-redHover active:scale-95"
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
