import React from 'react';

const TeamMemberCard = ({ img, name, role }) => {
  return (
    <div className="max-w-sm rounded mb-10 bg-lightBlue py-5 px-6">
      <img className="w-full rounded-t-lg" src={img} alt="Image description" />
      <div className="px-6 py-4 text-center">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-700 text-base">{role}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
