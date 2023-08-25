import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';


const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  background-color: #333333;
  box-shadow: 0px 4px 8px rgba(0, 0, 0.2, 0.2);


  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin: 0 10px;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

    &:first-child {
        background-color: #fff;
        color: #2196f3;
      }
  
      &:last-child {
        background-color: #2196f3;
        color: #fff;
      }
  
      &:hover {
        background-color: #1565c0;
        color: #fff;
      }
  }
`;

export default function RepostModal({ isOpen, onClose, onRepost }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Repost"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    border: 'none',
                    padding: '0',
                },
            }}
        >
            <ModalContent>
                <h2>Do you want to re-post this link?</h2>
                <div>
                    {/* Add your repost content here */}
                    <button data-test="cancel-repost" onClick={onClose}>No, Cancel</button>
                    <button data-test="confirm-repost" onClick={onRepost}>Yes, share!</button>
                </div>
            </ModalContent>
        </Modal>
    );
}
