import React from 'react';

const TeamMemberCard = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src="../../images/default-avatar.jpeg"
        alt="Image description"
      />
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold mb-2">First and last name</h2>
        <p className="text-gray-700 text-base">
          Role
        </p>
      </div>
      <div className="px-6 py-4">
      </div>
    </div>
  );
};

export default TeamMemberCard;
