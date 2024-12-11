import { useState } from 'react';

import { Input, Disclosure, DisclosureButton } from '@headlessui/react';
import PropTypes from 'prop-types';

import LabelAndInput from '../../../components/Form/LabelAndInput';

const AddImage = ({
  error,
  imageSrc,
  setFile,
  setImageSrc,
  handleFileUpload,
  handleChange,
}) => {
  const [openPanel, setOpenPanel] = useState(null);

  const handleUrlInput = (event) => {
    setFile(null);
    handleChange({
      target: { name: 'coverImageUrl', value: event.target.value },
    });
    setImageSrc(event.target.value);
  };

  return (
    <div className="mb-3 flex w-full flex-col gap-4">
      <p>Cover image</p>

      <div className="flex gap-4">
        <Disclosure>
          <DisclosureButton
            onClick={() => setOpenPanel(openPanel === 'file' ? null : 'file')}
            className="font-gray w-full rounded border border-gray py-1 text-blueGray transition-transform duration-150 hover:bg-grayHover active:scale-95"
          >
            Upload a file
          </DisclosureButton>
        </Disclosure>

        <Disclosure>
          <DisclosureButton
            onClick={() => setOpenPanel(openPanel === 'url' ? null : 'url')}
            className="font-gray w-full rounded border border-gray py-1 text-blueGray transition-transform duration-150 hover:bg-grayHover active:scale-95"
          >
            Provide an URL
          </DisclosureButton>
        </Disclosure>
      </div>

      <div className="flex flex-col gap-4">
        {openPanel === 'file' && (
          <div className="mt-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full rounded border border-gray p-2"
            />
          </div>
        )}

        {openPanel === 'url' && (
          <LabelAndInput
            id="image"
            name="image"
            type="url"
            onChange={handleUrlInput}
          >
            URL:
          </LabelAndInput>
        )}
      </div>

      {error.coverImageUrl && <p className="text-red">{error.coverImageUrl}</p>}

      {imageSrc && (
        <div className="flex justify-center">
          <img src={imageSrc} alt="Preview" className="max-h-[200px]" />
        </div>
      )}
    </div>
  );
};

AddImage.propTypes = {
  error: PropTypes.object,
  imageSrc: PropTypes.string,
  setFile: PropTypes.func.isRequired,
  setImageSrc: PropTypes.func.isRequired,
  handleFileUpload: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AddImage;
