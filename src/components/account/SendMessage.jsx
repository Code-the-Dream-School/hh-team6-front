import { useState, useEffect, useRef } from 'react';

import { Button, Input } from '@headlessui/react';
import PropTypes from 'prop-types';

import { sendMessage } from '../../api/DBRequests';

const SendMessage = ({ chatId, setIsMessageLoading, token, fetchMessages }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleChange = ({ target: { value } }) => {
    setMessage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsMessageLoading(true);
    await sendMessage(setIsMessageLoading, chatId, message, token);
    // fetchMessages(chatId);
    setMessage('');
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [message]);

  return (
    <form className="flex w-full" onSubmit={handleSubmit}>
      <div className="flex w-full gap-2">
        <Input
          ref={inputRef}
          placeholder="Enter message"
          className="flex-1 rounded-md border border-gray p-1 focus:border-transparent"
          value={message}
          onChange={handleChange}
        />
        <Button
          type="submit"
          className="block h-full rounded-md bg-darkGreen px-3 py-1 text-white transition-transform duration-150 hover:bg-darkGreenHover active:scale-95"
        >
          Send
        </Button>
      </div>
    </form>
  );
};

SendMessage.propTypes = {
  chatId: PropTypes.string.isRequired,
  setIsMessageLoading: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  fetchMessages: PropTypes.func.isRequired,
};

export default SendMessage;
