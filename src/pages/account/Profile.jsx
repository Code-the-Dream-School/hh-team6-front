import React from "react";
import userIcon from "../../assets/images/user.png";
import locationIcon from "../../assets/images/location.png";
import envelopeIcon from "../../assets/images/envelope.png";

const Profile = () => {
  return (
    <div className="max-w-sm mx-auto text-left font-sans">
      <h1 className="text-xl font-bold mb-6">Personal Profile</h1>
      <div className="flex items-center mb-4">
        <img
          src={userIcon}
          alt="User Icon"
          className="w-6 h-6 mr-3 text-gray-500"
        />
        <span className="text-base">John Doe</span>
      </div>
      <div className="flex items-center mb-4">
        <img
          src={envelopeIcon}
          alt="Envelope Icon"
          className="w-6 h-6 mr-3 text-gray-500"
        />
        <span className="text-base">john-doe@mail.com</span>
      </div>
      <div className="flex items-center mb-6">
        <img
          src={locationIcon}
          alt="Location Icon"
          className="w-6 h-6 mr-3 text-gray-500"
        />
        <span className="text-base">San Diego, CA</span>
      </div>
      <button className="w-full py-2 px-4 bg-orange-500 text-white font-semibold text-center rounded hover:bg-orange-600">
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
