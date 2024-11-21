import React from 'react';
import TeamMemberCard from '../components/TeamMemberCard';
import avatar from '../assets/images/square.png';

const About = () => {
  const frontend = [
    {
      image: avatar,
      name: 'Evgenii',
      role: 'Frontend',
    },
    {
      image: avatar,
      name: 'Brandon',
      role: 'Frontend',
    },
    {
      image: avatar,
      name: 'Liuba',
      role: 'Frontend',
    },
  ];

  const frontendCards = frontend.map((item, index) => (
    <TeamMemberCard
      key={index}
      img={item.image}
      name={item.name}
      role={item.role}
    />
  ));

  const backend = [
    {
      image: avatar,
      name: 'Valentina',
      role: 'Backend',
    },
    {
      image: avatar,
      name: 'Tetiana',
      role: 'Backend',
    },
  ];

  const backendCards = backend.map((item, index) => (
    <TeamMemberCard
      key={index}
      img={item.image}
      name={item.name}
      role={item.role}
    />
  ));

  const mentors = [
    {
      image: avatar,
      name: 'Sergey',
      role: 'Mentor',
    },
    {
      image: avatar,
      name: 'Dan',
      role: 'Mentor',
    },
    {
      image: avatar,
      name: 'Vadim',
      role: 'Mentor',
    },
  ];

  const mentorCards = mentors.map((item, index) => (
    <TeamMemberCard
      key={index}
      img={item.image}
      name={item.name}
      role={item.role}
    />
  ));

  return (
    <div className="w-full flex flex-col items-center bg-white">
      <h2 className="font-headings font-bold text-3xl md:text-4xl my-7 md:my-10">
        Meet our team
      </h2>
      <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-16">
        {frontendCards}
      </div>
      <div className="flex flex-col md:flex-row justify-around gap-2 md:gap-32">
        {backendCards}
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-16">
        {mentorCards}
      </div>
      <h2 className="font-headings font-bold text-3xl md:text-4xl my-7 md:my-10">
        About Re:Books
      </h2>
      <p className="px-10 pb-10 flex flex-col items-center w-full font-body text-justify">
        Welcome to your go-to marketplace for buying and selling pre-owned
        books! Our platform connects book lovers, offering a space to resell
        books from personal libraries or discover affordable, quality reads.
        Whether you’re looking to clear space on your shelves or find that next
        great title, we’ve made the process simple, secure, and
        community-driven. Each book has a story, and here, you can pass it on or
        find a new one waiting for you. Join our community, save money, and
        enjoy the thrill of sustainable reading!
      </p>
    </div>
  );
};

export default About;
