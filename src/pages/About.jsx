import MembersList from '../components/About/MembersList';
import avatar1 from '../assets/images/team/Evgenii.png';
import avatar2 from '../assets/images/team/Liuba.png';
import avatar3 from '../assets/images/team/Brandon.png';
import avatar4 from '../assets/images/team/Valentina.png';
import avatar5 from '../assets/images/team/Tetiana.png';
import avatar6 from '../assets/images/team/Sergey.png';
import avatar7 from '../assets/images/team/Dan.png';
import avatar8 from '../assets/images/team/Vadim.png';

const About = () => {
  const frontend = [
    { image: avatar1, firstName: 'Evgenii', lastName: 'Rychkov' },
    { image: avatar2, firstName: 'Liuba', lastName: 'Barusch' },
    { image: avatar3, firstName: 'Brandon', lastName: 'Warren' },
  ];

  const backend = [
    { image: avatar4, firstName: 'Valentina', lastName: 'Rudnitskaya' },
    { image: avatar5, firstName: 'Tetiana', lastName: 'Andriyanova' },
  ];

  const mentors = [
    { image: avatar6, firstName: 'Sergey', lastName: 'Sherstobitov' },
    { image: avatar7, firstName: 'Dan', lastName: 'Polityka' },
    { image: avatar8, firstName: 'Vadim', lastName: 'Dmitrochenko' },
  ];

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-7 font-headings text-2xl font-bold md:text-4xl">
        Meet our team
      </h2>

      <MembersList list={frontend} teamRole={'Frontend'} />
      <MembersList list={backend} teamRole={'Backend'} />
      <MembersList list={mentors} teamRole={'Mentor'} />

      <h2 className="my-7 font-headings text-2xl font-bold md:text-4xl">
        About Re:Books
      </h2>
      <p className="px-10 text-center font-body !leading-[200%] md:px-20 md:text-2xl">
        Welcome to your go-to marketplace for buying and selling pre-owned
        books!
      </p>
      <p className="px-10 pb-10 text-center font-body !leading-[200%] md:px-20 md:text-2xl">
        Our platform connects book lovers, offering a space to resell books from
        personal libraries or discover affordable, quality reads. Whether you’re
        looking to clear space on your shelves or find that next great title,
        we’ve made the process simple, secure, and community-driven. Each book
        has a story, and here, you can pass it on or find a new one waiting for
        you. Join our community, save money, and enjoy the thrill of sustainable
        reading!
      </p>
    </div>
  );
};

export default About;
