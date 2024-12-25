import { Button } from '@headlessui/react';

import LabelAndInput from '../../components/Form/LabelAndInput';
import usePasswordRecovery from '../../hooks/usePasswordRecovery';
import Modal from '../../layouts/ModalWithOneButton';
import Preloader from '../../layouts/Preloader';

const PasswordEdit = () => {
  const {
    newPassword,
    newPasswordConfirm,
    error,
    message,
    isLoading,
    handleSubmit,
    handleChange,
    isModalOpen,
    closeModal,
  } = usePasswordRecovery('edit');

  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="flex w-full min-w-[320px] max-w-[420px] flex-col items-center rounded-[5px] bg-lightBlue p-10">
        {isLoading && <Preloader />}
        <h2 className="mb-10 mt-5 font-headings text-2xl font-bold">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="flex w-full flex-col">
          <LabelAndInput
            id="newPassword"
            name="newPassword"
            type="password"
            value={newPassword}
            error={error}
            onChange={handleChange}
          >
            New Password
          </LabelAndInput>

          <LabelAndInput
            id="newPasswordConfirm"
            name="newPasswordConfirm"
            type="password"
            value={newPasswordConfirm}
            error={error}
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
        </form>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="New Password"
        description={message}
        buttonText="OK"
      />
    </div>
  );
};

export default PasswordEdit;
