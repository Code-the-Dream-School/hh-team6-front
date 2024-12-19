import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LabelAndInput from '../../components/Form/LabelAndInput';
import { updatePassword } from '../../api/DBRequests';
import { useNavigate } from 'react-router-dom';
import { Description, Dialog, DialogTitle, Button } from '@headlessui/react';

const PasswordEdit = () => {
  const [form, setForm] = useState({
    newPassword: '',
    newPasswordConfirm: '',
  });
  const [error, setError] = useState({
    password: '',
    form: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const returnToLogin = () => navigate('/sign_in');

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError((prev) => ({
        ...prev,
        form: 'Invalid or missing token.',
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: '' }));
    }
    if (error.form) {
      setError((prev) => ({ ...prev, form: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.newPassword || !form.newPasswordConfirm) {
      setError((prev) => ({
        ...prev,
        password: 'Both fields are required.',
      }));
      return;
    }

    if (form.newPassword !== form.newPasswordConfirm) {
      setError((prev) => ({
        ...prev,
        form: 'Passwords do not match.',
      }));
      return;
    }

    if (!token) {
      setError((prev) => ({
        ...prev,
        form: 'Token is missing. Please use the link provided in your email.',
      }));
      return;
    }

    setIsLoading(true);
    try {
      const response = await updatePassword({
        newPassword: form.newPassword,
        token,
      });
      if (response.status === 200) {
        setMessage('Your password has been successfully changed.');
        setForm({ newPassword: '', newPasswordConfirm: '' });
        setIsModalOpen(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError((prev) => ({
        ...prev,
        form: error.message || 'An error occurred while updating the password.',
      }));
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
        <h2 className="mb-10 mt-5 font-headings text-2xl font-bold">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="flex w-full flex-col">
          <LabelAndInput
            id="newPassword"
            name="newPassword"
            type="password"
            value={form.newPassword}
            error={error.password}
            onChange={handleChange}
          >
            New Password
          </LabelAndInput>

          <LabelAndInput
            id="newPasswordConfirm"
            name="newPasswordConfirm"
            type="password"
            value={form.newPasswordConfirm}
            error={error.password}
            onChange={handleChange}
          >
            Confirm New Password
          </LabelAndInput>

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
            {isLoading ? 'Changing...' : 'Change Password'}
          </Button>

          {error.form && <p className="mt-2 text-red">{error.form}</p>}
          {message && <p className="mt-2 text-darkGreen">{message}</p>}
        </form>
      </div>

      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        className="fixed inset-0 z-10 flex items-center justify-center"
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-30"
          aria-hidden="true"
        ></div>
        <div className="relative z-20 max-w-lg rounded-lg bg-white p-8 shadow-xl">
          <DialogTitle className="text-center text-xl font-semibold">
            Reset Password
          </DialogTitle>
          <Description className="mt-4 text-center">{message}</Description>
          <div className="mt-6">
            <Button
              as="button"
              onClick={closeModal}
              className="w-full rounded-md bg-darkGreen p-3 text-white hover:bg-darkGreenHover"
            >
              OK
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PasswordEdit;
