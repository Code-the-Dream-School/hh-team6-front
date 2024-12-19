import React, { useState, useCallback, useEffect } from 'react';

import { updateProfile } from '../../api/DBRequests';
import CancelButton from '../../components/account/Profile/CancelProfileButton';
import SaveProfileButton from '../../components/account/Profile/SaveProfileButton';
import LabelAndInput from '../../components/Form/LabelAndInput';
import { useAccount } from '../../context/AccountProvider';
import { useAuth } from '../../context/AuthProvider';

const UpdateProfile = () => {
  const { setAccountPage } = useAccount();
  const { token, userData, setUserData } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    location: '',
    email: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        location: userData.location || '',
        email: userData.email || '',
      });
    }
  }, [userData]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSave = useCallback(
    async (e) => {
      e.preventDefault();
  
      if (!formData.firstName || !formData.lastName || !formData.location) {
        setError('All fields are required!');
        return;
      }
      setError('');
  
      try {
        const headers = { 'Content-Type': 'application/json' };
        const response = await updateProfile(headers, formData, token);
  
        if (response.data?.user) {
          setUserData(response.data.user);
          sessionStorage.setItem('user', JSON.stringify(response.data.user));
        } else {
          setError('API response does not contain updated user data.');
        }
  
        setAccountPage('profile');
      } catch (err) {
        console.error('Error occurred during profile update:', err); 
        setError(err.message || 'Failed to update profile');
      }
    },
    [formData, setAccountPage, token, setUserData]
  );

  const handleCancel = useCallback(() => {
    setAccountPage('profile');
  }, [setAccountPage]);

  return (
    <form className="w-full max-w-md p-6 text-left">
      <h1 className="mb-6 font-headings text-2xl font-bold">Update Profile</h1>

      <div className="mb-4">
        <LabelAndInput
          id="firstname"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        >
          First Name
        </LabelAndInput>

        <LabelAndInput
          id="lastname"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        >
          Last Name
        </LabelAndInput>

        <LabelAndInput
          id="email"
          name="email"
          type="text"
          value={formData.email}
          onChange={handleChange}
          disabled={true}
          style={{
            backgroundColor: '#e0e0e0',
            color: '#333',
            border: '1px solid #ccc',
          }}
        >
          Email
        </LabelAndInput>

        <LabelAndInput
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        >
          Location
        </LabelAndInput>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex justify-start space-x-4">
        <CancelButton onClick={handleCancel} />
        <SaveProfileButton onClick={handleSave} />
      </div>
    </form>
  );
};

export default UpdateProfile;
