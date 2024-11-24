import React from 'react';
import avatar from '../assets/images/square.png';
import avatar1 from '../assets/images/Evgenii.png';
import avatar3 from '../assets/images/Liuba.png';
import avatar4 from '../assets/images/Valentina.png';
import MembersList from '../components/About/MembersList';

const About = () => {
  const frontend = [
    {image: avatar1, name: 'Evgenii Rychkov'},
    {image: avatar, name: 'Brandon Warren'},
    {image: avatar, name: 'Liuba Barusch'},
  ];

  const backend = [
    {image: avatar, name: 'Valentina Rudnitskaya'},
    {image: avatar, name: 'Tetiana Andriyanova'},
  ];

  const mentors = [
    {image: avatar, name: 'Sergey Sherstobitov'},
    {image: avatar, name: 'Dan P'},
    {image: avatar, name: 'Vadim Dmitrochenko'},
  ];

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-headings font-bold text-2xl my-7">
        Meet our team
      </h2>
      
      <MembersList list={frontend} role={'Frontend'}/>
      <MembersList list={backend} role={'Backend'}/>
      <MembersList list={mentors} role={'Mentor'}/>
    
      <h2 className="font-headings font-bold text-2xl my-7">
          About Re:Books
        </h2>
      <p className='px-20 text-center'>
        Welcome to your go-to marketplace for buying and selling pre-owned
          books! 
      </p>
      <p className="px-20 pb-10 text-center">
      Our platform connects book lovers, offering a space to resell
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
