import React, { useState } from 'react';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    // Clear the form or perform any cancel-related logic
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      location: '',
    });
  };

  const handleSave = () => {
    // Save the data logic
    console.log('Saved:', formData);
  };

  return (
    <div className="mx-auto mt-10 max-w-md p-4">
      <h1 className="mb-6 text-2xl font-bold">Update Profile</h1>
      <form className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className="border-gray-300 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className="border-gray-300 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="border-gray-300 bg-gray-100 text-gray-500 w-full cursor-not-allowed rounded border px-3 py-2"
            disabled
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            className="border-gray-300 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-yellow-400 hover:bg-yellow-500 rounded px-4 py-2 font-semibold text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded bg-teal-600 px-4 py-2 font-semibold text-white hover:bg-teal-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
