import React from 'react';
import PropTypes from 'prop-types';

const TeamMemberCard = ({ img, firstName, lastName, role }) => {
  return (
    <div className="mb-10 max-w-60 rounded bg-lightBlue px-6 py-5">
      <img
        className="h-48 w-48 rounded-t-lg object-cover"
        src={img}
        alt="Image description"
      />
      <div className="px-6 py-4 text-center">
        <h2 className="mb-2 text-xl font-bold">{firstName}</h2>
        <h2 className="mb-2 text-xl font-bold">{lastName}</h2>
        <p className="text-gray-700 text-base">{role}</p>
      </div>
    </div>
  );
};

TeamMemberCard.propTypes = {
  img: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default TeamMemberCard;
