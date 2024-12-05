import { Button } from '@headlessui/react';

const SaveBookButton = () => {
  return (
    <Button
      as="button"
      type="submit"
      className="mb-2 w-[200px] rounded-md bg-darkGreen px-3 py-1 text-white transition-transform duration-150 hover:bg-darkGreenHover active:scale-95"
    >
      Save
    </Button>
  );
};

export default SaveBookButton;
