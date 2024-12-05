import React, { useCallback } from 'react';

import PropTypes from 'prop-types';

function UpdateProfile({ setName, updateEmail, saveProfile }) {
  const handleNameChange = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [setName]
  );

  const handleEmailChange = useCallback(
    (e) => {
      updateEmail(e.target.value);
    },
    [updateEmail]
  );

  const handleSave = useCallback(() => {
    saveProfile();
  }, [saveProfile]);

  return (
    <div>
      <input onChange={handleNameChange} placeholder="Name" />
      <input onChange={handleEmailChange} placeholder="Email" />
      <button onClick={handleSave}>Save Profile</button>
    </div>
  );
}

UpdateProfile.propTypes = {
  setName: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
};

export default UpdateProfile;
