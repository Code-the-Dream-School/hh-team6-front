import React from "react";

const Profile = () => {
  return (
    <div className="max-w-sm mx-auto text-left font-sans">
      <h1 className="text-xl font-bold mb-6">Personal Profile</h1>
      <div className="flex items-center mb-4">
        <span className="text-gray-500 text-2xl mr-3">👤</span>
        <span className="text-base">John Doe</span>
      </div>
      <div className="flex items-center mb-4">
        <span className="text-gray-500 text-2xl mr-3">📧</span>
        <span className="text-base">john-doe@mail.com</span>
      </div>
      <div className="flex items-center mb-6">
        <span className="text-gray-500 text-2xl mr-3">📍</span>
        <span className="text-base">San Diego, CA</span>
      </div>
      <button className="w-full py-2 px-4 bg-orange-500 text-white font-semibold text-center rounded hover:bg-orange-600">
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
