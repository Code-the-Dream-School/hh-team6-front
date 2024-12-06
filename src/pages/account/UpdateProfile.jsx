import React, { useCallback, useState } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function UpdateProfile({
  setFirstName,
  setLastName,
  updateEmail,
  setLocation,
  saveProfile,
  cancelUpdate,
}) {
  const [firstName, setFirstNameState] = useState('');
  const [lastName, setLastNameState] = useState('');
  const [location, setLocationState] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleFirstNameChange = useCallback(
    (e) => {
      setFirstNameState(e.target.value);
      setFirstName(e.target.value);
    },
    [setFirstName]
  );

  const handleLastNameChange = useCallback(
    (e) => {
      setLastNameState(e.target.value);
      setLastName(e.target.value);
    },
    [setLastName]
  );

  const handleEmailChange = useCallback(
    (e) => {
      updateEmail(e.target.value);
    },
    [updateEmail]
  );

  const handleLocationChange = useCallback(
    (e) => {
      setLocationState(e.target.value);
      setLocation(e.target.value);
    },
    [setLocation]
  );

  const handleSave = useCallback(() => {
    if (!firstName || !lastName || !location) {
      setError('All fields are required!');
      return;
    }

    saveProfile();
    setError('');
    navigate('/profile'); // Redirect to a profile page after saving
  }, [firstName, lastName, location, saveProfile, navigate]);

  const handleCancel = useCallback(() => {
    setFirstName('');
    setLastName('');
    setLocation('');
    setError('');
    cancelUpdate(); // Perform additional cancel logic if necessary
    navigate('/profile'); // Redirect back to the profile page
  }, [setFirstName, setLastName, setLocation, cancelUpdate, navigate]);

  return (
    <div className="w-full max-w-md p-6 text-left">
      <h1 className="mb-6 font-headings text-2xl font-bold">Update Profile</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="text-gray-700 block text-sm font-medium"
        >
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={handleFirstNameChange}
          className="border-gray-300 mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="text-gray-700 block text-sm font-medium"
        >
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={handleLastNameChange}
          className="border-gray-300 mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="text-gray-700 block text-sm font-medium"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={updateEmail} // Controlled by context
          onChange={handleEmailChange}
          className="border-gray-300 text-gray-500 mt-1 block w-full rounded-md bg-lightBlue shadow-sm"
          disabled
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="location"
          className="text-gray-700 block text-sm font-medium"
        >
          Location
        </label>
        <input
          id="location"
          type="text"
          placeholder="Location"
          value={location}
          onChange={handleLocationChange}
          className="border-gray-300 mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-start space-x-4">
        <button
          onClick={handleCancel}
          className="w-40 rounded-md bg-yellow px-4 py-2 text-center font-semibold text-white hover:bg-yellowHover"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="w-40 rounded-md bg-darkGreen px-4 py-2 text-center font-semibold text-white hover:bg-darkGreenHover"
        >
          Save
        </button>
      </div>
    </div>
  );
}

UpdateProfile.propTypes = {
  setFirstName: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
  updateEmail: PropTypes.func,
  setLocation: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
  cancelUpdate: PropTypes.func.isRequired,
};

export default UpdateProfile;
