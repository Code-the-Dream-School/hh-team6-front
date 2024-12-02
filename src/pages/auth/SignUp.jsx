import { Link } from 'react-router-dom';
import { Button } from '@headlessui/react';
import useSignUpForm from '../../hooks/useSignUpForm';
import Input from '../../components/Form/Input';

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

          <Input
            id="firstName"
            name="firstName"
            type="text"
            value={form.firstName}
            error={error.firstName}
            onChange={handleChange}
          >
            First Name
          </Input>

          <Input
            id="lastName"
            name="lastName"
            type="text"
            value={form.lastName}
            error={error.lastName}
            onChange={handleChange}
          >
            Last Name
          </Input>

          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            error={error.email}
            onChange={handleChange}
          >
            Email
          </Input>

          <Input
            id="password"
            name="password"
            type="password"
            value={form.password}
            error={error.password}
            onChange={handleChange}
          >
            Password
          </Input>

          <Button
            as="button"
            type="submit"
            className="mt-7 w-full rounded-md bg-red p-2 font-semibold tracking-wide text-white"
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
