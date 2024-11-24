import React from 'react';
import TeamMemberCard from './TeamMemberCard';

const MembersList = ({list, role}) => { 
    return (
        <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-16">
            {list.map((item, index) => (
        <TeamMemberCard
            key={index}
            img={item.image}
            name={item.name}
            role={role}
        />
    ))}
        </div>
    );
}
export default MembersList;