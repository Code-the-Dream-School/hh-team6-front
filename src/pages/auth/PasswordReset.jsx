import { useState } from 'react';

import { Button } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

import { sendResetLinkRequest } from '../../api/DBRequests';
import LabelAndInput from '../../components/Form/LabelAndInput';
import Modal from '../../layouts/ModalWithOneButton';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const returnToLogin = () => navigate('/sign_in');

  const handleChange = (e) => {
    setEmail(e.target.value);

    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await sendResetLinkRequest({ email });
      if (response.status === 200) {
        setMessage(
          'A password reset link has been sent to your email. Check your email, please.'
        );
        setError('');
        setIsModalOpen(true);
        setIsLoading(false);
      }
    } catch (error) {
      setError(
        error.message || 'An error occurred while sending the reset link.'
      );
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    returnToLogin();
  };

  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="flex w-full min-w-[320px] max-w-[420px] flex-col items-center rounded-[5px] bg-lightBlue p-10">
        <h2 className="mb-16 mt-4 font-headings text-2xl font-bold">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="flex w-full flex-col">
          <LabelAndInput
            id="email"
            name="email"
            type="email"
            value={email}
            error={error}
            onChange={handleChange}
          >
            Email
          </LabelAndInput>

          <div className="flex gap-2">
            <Button
              as="button"
              type="button"
              className="mt-7 w-full rounded-md border-2 border-red bg-white p-2 font-semibold tracking-wide text-red transition-transform duration-200 hover:bg-red hover:text-white active:scale-95"
              onClick={returnToLogin}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              as="button"
              type="submit"
              className={`mt-7 w-full rounded-md bg-red p-2 font-semibold tracking-wide text-white transition-transform duration-200 ${
                isLoading
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-redHover active:scale-95'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </div>
        </form>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Reset Password"
        description={message}
        buttonText="OK"
      />
    </div>
  );
};

export default PasswordReset;
