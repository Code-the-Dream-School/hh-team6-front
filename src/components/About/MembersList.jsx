import TeamMemberCard from './TeamMemberCard';
import PropTypes from 'prop-types';

const MembersList = ({ list, teamRole }) => {
  return (
    <div className="flex flex-col justify-between gap-2 md:flex-row md:gap-16">
      {list.map((item, index) => (
        <TeamMemberCard
          key={index}
          img={item.image}
          firstName={item.firstName}
          lastName={item.lastName}
          teamRole={teamRole}
        />
      ))}
    </div>
  );
};

MembersList.propTypes = {
  list: PropTypes.array.isRequired,
  teamRole: PropTypes.string.isRequired,
};
export default MembersList;
