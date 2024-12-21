import { Button } from '@headlessui/react';

import cover from '../../assets/images/cover.png';
import { useAuth } from '../../context/AuthProvider';

const Book = () => {
  const { isLoggedIn, userData } = useAuth();

  return (
    <div className="grid-areas-layout-mobile md:grid-areas-layout-desktop mx-5 mt-3 grid justify-items-center gap-4 md:grid-cols-[1fr_1fr_1fr] md:grid-rows-[40px_1fr]">
      {/* Header */}
      <h1 className="grid-in-header text-center font-headings text-2xl font-bold md:text-left">
        Karlsson On The Roof
      </h1>

      {/* Image */}
      <img
        className="grid-in-image h-auto w-60 justify-self-center"
        alt="cover"
        src={cover}
      />

      {/* Box */}
      <div className="grid-in-box border-gray-300 my-2 flex w-72 flex-col items-center rounded-md border px-8 py-5">
        <h1 className="font-headings text-2xl">$9.99</h1>
        {isLoggedIn ? (
          <>
            <Button
              as="button"
              type="submit"
              className="bg-red-600 hover:bg-red-700 mb-2 mt-4 w-full rounded-md px-6 py-2 text-xl font-semibold tracking-wide text-white transition-transform duration-150 active:scale-95"
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

      {/* Table */}
      <div className="grid-in-table w-full">
        <table className="w-full border-separate border-spacing-y-4">
          <tbody>
            <tr>
              <td className="text-gray-600 w-28">Condition:</td>
              <td>Like new</td>
            </tr>
            <tr>
              <td className="text-gray-600 w-28">Author:</td>
              <td>Astrid Lindgren</td>
            </tr>
            <tr>
              <td className="text-gray-600 w-28">Publisher:</td>
              <td>OUP Oxford; 1st edition (March 4, 2021)</td>
            </tr>
            <tr>
              <td className="text-gray-600 w-28">Genre:</td>
              <td>Adventure</td>
            </tr>
            <tr>
              <td className="text-gray-600 w-28">Age category:</td>
              <td>Children</td>
            </tr>
            <tr>
              <td className="text-gray-600 w-28">Language:</td>
              <td>English</td>
            </tr>
            <tr>
              <td className="text-gray-600 w-28">Pages:</td>
              <td>176</td>
            </tr>
            <tr>
              <td className="text-gray-600 w-28">Cover:</td>
              <td>Hardcover</td>
            </tr>
            <tr>
              <td className="text-gray-600 w-28">ISBN:</td>
              <td>978-0192776273</td>
            </tr>
          </tbody>
        </table>
        <div>
          <p className="text-gray-600 mt-3">Description:</p>
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
