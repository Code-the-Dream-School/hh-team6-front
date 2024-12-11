import { Button } from '@headlessui/react';

import cover from '../../assets/images/cover.png';

const Book = () => {
  return (
    <div className="mx-5 flex flex-col items-center">
      <h1 className="mb-6 font-headings text-2xl font-bold">
        Karlsson On The Roof
      </h1>
      <img className="mb-6" alt="cover" src={cover}></img>
      <div className="mx-7 mb-6 flex flex-col items-center rounded-md border border-gray px-8 py-5">
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
      </div>
      <table className="mb-6">
        <tr>
          <td className="text-body text-gray">Condition:</td>
          <td>Like new</td>
        </tr>
        <tr>
          <td className="text-body text-gray">Author:</td>
          <td>Astrid Lindgren</td>
        </tr>
        <tr>
          <td className="text-body text-gray">Publisher:</td>
          <td>OUP Oxford; 1st edition (March 4, 2021)</td>
        </tr>
        <tr>
          <td className="text-body text-gray">Genre:</td>
          <td>Adventure</td>
        </tr>
        <tr>
          <td className="text-body text-gray">Age category:</td>
          <td>Children</td>
        </tr>
        <tr>
          <td className="text-body text-gray">Language:</td>
          <td>English</td>
        </tr>
        <tr>
          <t className="text-body text-gray">Pages:</t>
          <td>176</td>
        </tr>
        <tr>
          <td className="text-body text-gray">Cover:</td>
          <td>Hardcover</td>
        </tr>
        <tr>
          <td className="text-body text-gray">ISBN:</td>
          <td>978-0192776273</td>
        </tr>
      </table>
      <div>
        <p className="text-body text-gray">Description:</p>
        <p>
          Imagine Smidge&apos;s delight when, one day, a little man with a
          propeller on his back appears hovering at the window! It&apos;s
          Karlsson and he lives in a house on the roof. Soon Smidge and Karlsson
          are sharing all sorts of adventures, from tackling thieves and playing
          tricks to looping the loop and running across the rooftops. Fun and
          chaos burst from these charming, classic stories.
        </p>
      </div>
    </div>
  );
};

export default Book;
