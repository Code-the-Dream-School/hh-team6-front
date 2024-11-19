import React from 'react';
import TeamMemberCard from '../components/TeamMemberCard';

const About = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <div className="bg-lightPink p-10 flex flex-col items-center rounded-[5px] w-full max-w-[420px] min-w-[320px]">
        <h2 className="font-headings font-bold text-2xl mb-5">Meet our team</h2>
      </div>
      <div className="bg-lightPink flex flex-col items-center rounded-[5px] w-full max-w-[420px] min-w-[320px]">
        <TeamMemberCard />
        <TeamMemberCard />
        <TeamMemberCard />
        <TeamMemberCard />
        <TeamMemberCard />
        <TeamMemberCard />
        <TeamMemberCard />
      </div>
      <div className="bg-lightPink flex flex-col items-center rounded-[5px] w-full max-w-[420px] min-w-[320px]">
        <h2 className="font-headings font-bold text-2xl mb-5">
          About Re:Books
        </h2>
      </div>
      <div className="bg-lightPink px-10 flex flex-col items-center rounded-[5px] w-full">
        <p className="font-body">
          Welcome to your go-to marketplace for buying and selling pre-owned
          books! Our platform connects book lovers, offering a space to resell
          books from personal libraries or discover affordable, quality reads.
          Whether you’re looking to clear space on your shelves or find that
          next great title, we’ve made the process simple, secure, and
          community-driven. Each book has a story, and here, you can pass it on
          or find a new one waiting for you. Join our community, save money, and
          enjoy the thrill of sustainable reading!
        </p>
      </div>
    </div>
  );
};

export default About;
