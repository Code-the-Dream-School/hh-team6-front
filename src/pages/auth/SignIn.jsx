import { Link } from 'react-router-dom';
import { Button } from '@headlessui/react';
import useAuthForm from '../../hooks/useAuthForm';
import LabelAndInput from '../../components/Form/LabelAndInput';

const SignIn = () => {
  const { form, error, handleChange, handleSubmit } = useAuthForm();

  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="flex w-full min-w-[320px] max-w-[420px] flex-col items-center rounded-[5px] bg-lightBlue p-10">
        <h2 className="mb-5 font-headings text-2xl font-bold">Log In</h2>

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

          <p>
            <Link to="/password/reset" className="underline">
              Forgot password?
            </Link>
          </p>

          <Button
            as="button"
            type="submit"
            className="mt-7 w-full rounded-md bg-red p-2 font-semibold tracking-wide text-white transition-transform duration-200 active:scale-95"
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
