import { useState, useEffect, useCallback, useRef } from 'react';

import { Button } from '@headlessui/react';

import { getChats, getChatMessages } from '../../api/DBRequests';
import SendMessage from '../../components/account/SendMessage';
import { useAccount } from '../../context/AccountProvider';
import { useAuth } from '../../context/AuthProvider';
import Preloader from '../../layouts/Preloader';

const Messages = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const { currentChatId, setCurrentChatId } = useAccount();
  const [currentName, setCurrentName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token, userId } = useAuth();
  const [error, setError] = useState('');
  const [errorMessages, setErrorMessages] = useState('');
  const lastMessageRef = useRef(null);

  const fetchMessages = useCallback(
    async (id) => {
      try {
        await getChatMessages(setMessages, token, id);
      } catch (error) {
        setErrorMessages('Failed to load messages. Please try again later.');
      }
    },
    [token]
  );

  const fetchChats = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getChats(setChats, token);
      if (currentChatId) {
        setCurrentName(data.find((chat) => chat.id === currentChatId).peerName);
        fetchMessages(currentChatId);
      }
    } catch (error) {
      setError('Failed to load chats. Please try again later.');
    }
    setIsLoading(false);
  }, [token, currentChatId, fetchMessages]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const handleChatClick = (id, name) => {
    setIsLoading(true);
    setCurrentChatId(id);
    setCurrentName(name);

    fetchMessages(id);
  };

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex h-full flex-col gap-4 sm:flex-row">
      {error ? (
        <p>{error}</p>
      ) : isLoading ? (
        <Preloader />
      ) : (
        <>
          {/* chats */}
          <div className="relative flex-1 rounded-md border border-gray p-3">
            {chats.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p>You do not have any chats yet</p>
              </div>
            ) : (
              <div className="absolute inset-0 m-5 overflow-y-auto">
                <ul>
                  {chats.map((chat) => (
                    <li key={chat.id}>
                      <Button
                        className={`w-full rounded-md p-2 text-left ${chat.id === currentChatId ? 'bg-lightBlue' : ''}`}
                        onClick={() => handleChatClick(chat.id, chat.peerName)}
                      >
                        {chat.peerName}
                      </Button>
                      <hr className="my-3 border-blueGray" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* messages */}
          <div className="flex-1 rounded-md border border-gray py-3">
            {errorMessages ? (
              <p>{errorMessages}</p>
            ) : (
              <div className="flex h-full flex-col">
                {currentChatId && (
                  <>
                    <p className="mx-3">
                      <strong>Messages</strong> between <strong>You</strong> and{' '}
                      <strong>{currentName}</strong>
                    </p>
                    <hr className="m-3 border-blueGray" />
                    <div className="relative grow">
                      <div className="absolute inset-0 overflow-y-auto p-3">
                        <ul>
                          {messages.map((message) => (
                            <li
                              key={message._id}
                              className={`p-1 ${userId === message.senderId ? 'text-right' : ''}`}
                            >
                              <p>
                                <strong>
                                  {userId === message.senderId
                                    ? 'You: '
                                    : `${currentName}: `}
                                </strong>
                                {message.text}
                              </p>
                            </li>
                          ))}
                          <div ref={lastMessageRef}></div>
                        </ul>
                      </div>
                    </div>
                    <div className="mx-3">
                      <SendMessage
                        chatId={currentChatId}
                        token={token}
                        fetchMessages={fetchMessages}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Messages;
