import {
  Dialog,
  DialogTitle,
  Description,
  Button,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react';
import PropTypes from 'prop-types';
import { useAccount } from '../context/AccountProvider';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { addChat } from '../api/DBRequests';

import dateFormater from '../utils/dateFormater';

const Modal = ({ order, variant, isOpen, onClose }) => {
  const { setAccountPage, setCurrentChatId } = useAccount();
  const { token } = useAuth();
  const navigate = useNavigate();
  
  const handleWriteToContact = async () => {
    const contactId = variant === 'purchases' ? order.seller._id : order.buyer._id;
    const chat = await addChat(contactId, token);
    setAccountPage('messages');
    setCurrentChatId(chat._id);
    navigate('/account');
  };

  return (
    <>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose}>
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="space-y-4 rounded-md border border-gray bg-white p-5">
              <DialogTitle className="text-center font-bold">
                Order: {order.orderNumber}
              </DialogTitle>
              <div className="flex justify-between">
                {variant === 'purchases' ? (
                  <p>Seller:</p>
                ) : (
                  <p>Buyer:</p>
                )}
                <p>
                  <Button
                    onClick={handleWriteToContact}
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    {variant === 'purchases' ? 
                      order.seller.firstName + ' ' + order.seller.lastName : 
                      order.buyer.firstName + ' ' + order.buyer.lastName
                    }
                  </Button> 
                </p>
              </div>

              <div className="flex justify-between">
                <p>Order Status:</p>
                <p>{order.status}</p>
              </div>
              
              <div className="flex justify-between">
                <p>Date Placed: </p>
                <p>{dateFormater(order.datePlaced)}</p>
              </div>
              <div>
                <p>Books:</p>
              </div>
              <div className="">
                <ul>
                  {order.items.map((item) => (
                    <li key={'id' + item._id}>
                      "{item.book.title}"  {item.book.author}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between">
                <p>Total:</p>
                <p>${order.total ? order.total.toFixed(2) : ''}</p>
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={onClose}
                  className="w-[100px] rounded-md border border-white px-3 py-1 text-gray hover:border-gray"
                >
                  Close
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </>
  );
};

Modal.propTypes = {
  order: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Modal;
