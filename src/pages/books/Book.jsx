import { Button } from '@headlessui/react';

import cover from '../../assets/images/cover.png';
import { useAuth } from '../../context/AuthProvider';
import { useLocation } from 'react-router-dom';

const Book = () => {
  const { isLoggedIn, userData } = useAuth();

  const location = useLocation();
  console.log('location ===> ');
  console.log('location ===> ', location);
  return (
    // <div className="mx-5 flex flex-col items-center">
    <div className="grid-template-areas mx-5 justify-items-center">
      {/* <h1 className="grid-area-header mb-6 font-headings text-2xl font-bold">
        Karlsson On The Roof
      </h1> */}
      <h1 className="grid-area-header w-full font-headings text-2xl font-bold">
        {location.state?.title}
      </h1>
      {/* <img className="grid-area-image mb-6" alt="cover" src={cover}></img> */}
      <img
        className="grid-area-image h-auto w-60"
        alt="cover"
        src={cover}
      ></img>
      {/* <div className="grid-area-box mx-7 mb-6 flex flex-col items-center rounded-md border border-gray px-8 py-5">
        <h1>$9.99</h1>
        <Button
          as="button"
          type="submit"
          className="mt-7 w-full rounded-md bg-red p-2 font-semibold tracking-wide text-white transition-transform duration-150 hover:bg-darkGreenHover active:scale-95"
        >
          Add to cart
        </Button>
        <p>Selling by Username</p>
        <p>Write to owner</p>
      </div> */}
      <div className="grid-area-box my-2 flex flex-col items-center rounded-md border border-gray px-8 py-5">
        <h1 className="font-headings text-2xl">$9.99</h1>
        {isLoggedIn ? (
          <>
            <Button
              as="button"
              type="submit"
              className="mb-2 mt-4 w-full rounded-md bg-red px-6 py-2 font-body text-xl font-semibold tracking-wide text-white transition-transform duration-150 hover:bg-darkGreenHover active:scale-95"
            >
              Add to cart
            </Button>
            <p>Selling by {`${userData.firstName} ${userData.lastName}`}</p>
            <p className="underline">Write to owner</p>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="grid-area-table mb-6">
        <table className="border-spacing-1.5">
          <tbody>
            <tr>
              <td className="text-body w-28 text-gray">Condition:</td>
              <td>Like new</td>
            </tr>
            <tr>
              <td className="text-body align-top text-gray">Author:</td>
              <td className="align-top">Astrid Lindgren</td>
            </tr>
            <tr>
              <td className="text-body align-top text-gray">Publisher:</td>
              <td className="align-top">
                OUP Oxford; 1st edition (March 4, 2021)
              </td>
            </tr>
            <tr>
              <td className="text-body align-top text-gray">Genre:</td>
              <td className="align-top">Adventure</td>
            </tr>
            <tr>
              <td className="text-body align-top text-gray">Age category:</td>
              <td className="align-top">Children</td>
            </tr>
            <tr>
              <td className="text-body align-top text-gray">Language:</td>
              <td className="align-top">English</td>
            </tr>
            <tr>
              <td className="text-body align-top text-gray">Pages:</td>
              <td className="align-top">176</td>
            </tr>
            <tr>
              <td className="text-body align-top text-gray">Cover:</td>
              <td className="align-top">Hardcover</td>
            </tr>
            <tr>
              <td className="text-body align-top text-gray">ISBN:</td>
              <td className="align-top">978-0192776273</td>
            </tr>
          </tbody>
        </table>
        <div>
          <p className="text-body mt-3 text-gray">Description:</p>
          <p>
            Imagine Smidge&apos;s delight when, one day, a little man with a
            propeller on his back appears hovering at the window! It&apos;s
            Karlsson and he lives in a house on the roof. Soon Smidge and
            Karlsson are sharing all sorts of adventures, from tackling thieves
            and playing tricks to looping the loop and running across the
            rooftops. Fun and chaos burst from these charming, classic stories.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Book;
