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


const DeleteModal = ({ isOpen, onClose, onDelete }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Confirm Delete"
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
                <h2>Are you sure you want to delete this post?</h2>

                <div>
                    <button data-test="cancel" onClick={onClose}>No, go back</button>
                    <button data-test="confirm" onClick={onDelete}>Yes, delete it</button>


                </div>
            </ModalContent>
        </Modal>
    );
};

export default DeleteModal;