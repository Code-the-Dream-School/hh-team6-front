import React from 'react';
// import avatar from '../assets/images/default-avatar.jpeg';
import avatar from '../assets/images/square.png';

const TeamMemberCard = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-10 bg-lightBlue py-5 px-6">
      <img
        className="w-full rounded-t-lg"
        src={avatar}
        alt="Image description"
      />
      <div className="px-6 py-4 bg-white text-center">
        <h2 className="text-xl font-bold mb-2">First and last name</h2>
        <p className="text-gray-700 text-base">Role</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
