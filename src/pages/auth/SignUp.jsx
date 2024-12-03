import { Button } from '@headlessui/react';
import { Link } from 'react-router-dom';

import LabelAndInput from '../../components/Form/LabelAndInput';
import useSignUpForm from '../../hooks/useSignUpForm';

const SignUp = () => {
  const { form, error, handleChange, handleSubmit } = useSignUpForm();

  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="flex w-full min-w-[320px] max-w-[420px] flex-col items-center rounded-[5px] bg-lightBlue p-10">
        <h2 className="mb-5 font-headings text-2xl font-bold">Sign Up</h2>

        <form onSubmit={handleSubmit} className="flex w-full flex-col">
          <p className="mb-3">
            {`Already have an account? `}
            <Link to="/sign_in" className="underline">
              Log in
            </Link>
          </p>

          <LabelAndInput
            id="firstName"
            name="firstName"
            type="text"
            value={form.firstName}
            error={error.firstName}
            onChange={handleChange}
          >
            First Name
          </LabelAndInput>

          <LabelAndInput
            id="lastName"
            name="lastName"
            type="text"
            value={form.lastName}
            error={error.lastName}
            onChange={handleChange}
          >
            Last Name
          </LabelAndInput>

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

          <Button
            as="button"
            type="submit"
            className="mt-7 w-full rounded-md bg-red p-2 font-semibold tracking-wide text-white transition-transform duration-200 active:scale-95"
          >
            Create account
          </Button>

          {error.form && <p className="mt-2 text-red">{error.form}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
