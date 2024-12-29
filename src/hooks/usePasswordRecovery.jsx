import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { updatePassword, sendResetLinkRequest } from '../api/DBRequests';

const usePasswordRecovery = (mode) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState('');

  const navigate = useNavigate();
  const returnToLogin = () => navigate('/sign_in');

  useEffect(() => {
    if (mode === 'edit') {
      const tokenFromUrl = searchParams.get('token');
      if (tokenFromUrl) {
        setToken(tokenFromUrl);
      } else {
        setError('Invalid or missing token.');
      }
    }
  }, [mode, searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'newPassword':
        setNewPassword(value);
        break;
      case 'newPasswordConfirm':
        setNewPasswordConfirm(value);
        break;
      default:
        break;
    }
    setError('');
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Email is required.');
      return;
    }
    try {
      setIsLoading(true);
      const response = await sendResetLinkRequest({ email });
      if (response.status === 200) {
        setMessage('A password reset link has been sent to your email.');
        setIsModalOpen(true);
        setIsLoading(false);
      }
    } catch (err) {
      setError(
        err.message || 'An error occurred while sending the reset link.'
      );
      setIsLoading(false);
    }
  };

  const handleEditPassword = async () => {
    if (!newPassword || !newPasswordConfirm) {
      setError('Both fields are required.');
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      setError('Passwords do not match.');
      return;
    }
    if (!token) {
      setError('Token is missing.');
      return;
    }
    try {
      setIsLoading(true);
      const response = await updatePassword({ newPassword, token });
      if (response.status === 200) {
        setMessage('Your password has been successfully changed.');
        setNewPassword('');
        setNewPasswordConfirm('');
        setIsModalOpen(true);
        setIsLoading(false);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while updating the password.');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'reset') {
      await handleResetPassword();
    } else if (mode === 'edit') {
      await handleEditPassword();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    returnToLogin();
  };

  return {
    email,
    newPassword,
    newPasswordConfirm,
    error,
    message,
    isLoading,
    isModalOpen,
    closeModal,
    handleChange,
    handleSubmit,
    returnToLogin,
  };
};

usePasswordRecovery.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default usePasswordRecovery;
