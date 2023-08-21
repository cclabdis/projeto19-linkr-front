import { styled } from "styled-components";
import replace from 'react-string-replace';
import { AiOutlineHeart, AiFillHeart, AiFillDelete } from 'react-icons/ai';
import { PiPencilBold } from 'react-icons/pi';
import React, { useState, useEffect, useRef, useContext } from "react";
import { handleDelete } from "./deleteCard";
import { UserContext } from "../../contexts/userContext";
import Modal from 'react-modal';
import { RefreshContext } from "../../contexts/refreshContext";

export default function PostCard({ post }) {
    const [desc, setDesc] = useState(post.description);
    const replacedDesc = replace(desc, /#(\w+)/g, (match, i) => (
        <a key={i} href={`/hashtag/${match}`}>
            #{match}
        </a>
    ));
    const refreshContext = useContext(RefreshContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openDeleteModal = () => {
        setIsModalOpen(true);
    };

    const { user } = useContext(UserContext)

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
    };

    /// edit post///
    const [isEditing, setIsEditing] = useState(false);
    const editRef = useRef();

    const editPost = () => {
        setIsEditing(true);
    }

    return (

        <Card data-test="post">
            <ImgLikeContainer>
                <img src={post.photo} alt="user" />
                <AiOutlineHeart size={30} />
            </ImgLikeContainer>

            <PostInfo>
                <NameIconsContainer>
                    <h1 data-test="username">{post.username}</h1>
                    <div>
                        <PiPencilBold data-test="edit-btn" size={20} color={"white"} onClick={editPost} />
                        <AiFillDelete data-test="delete-btn" size={20} onClick={openDeleteModal} />
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
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
                                <button data-test="cancel" onClick={() => setIsModalOpen(false)}>No, go back</button>
                                <button data-test="confirm" onClick={() => handleDelete(post.id, user.token, refreshContext, setIsModalOpen)}>Yes, delete it</button>

                            </div>
                        </ModalContent>
                    </Modal>

                </NameIconsContainer>

                {isEditing
                    ?
                    <EditDescription >
                        <input
                            ref={editRef}
                            type="text"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </EditDescription>
                    :
                    <h2 data-test="description">{replacedDesc}</h2>
                }

                {Object.keys(post.linkMetadata).length !== 0
                    ?
                    <LinkContainer data-test="link" onClick={() => openInNewTab(post.link)}>
                        <div>
                            <h3>{post.linkMetadata.title === '' ? "No title available" : post.linkMetadata.title}</h3>
                            <h4>{post.linkMetadata.description === '' ? "No description available" : post.linkMetadata.description}</h4>
                            <h5>{post.link}</h5>
                        </div>
                        <img src={post.linkMetadata.image} alt={post.linkMetadata.image === '' ? "" : "metadata"} />
                    </LinkContainer>
                    :
                    <LinkEmpty data-test="link" onClick={() => openInNewTab(post.link)}>
                        <h3>No preview available</h3>
                        <h5>{post.link}</h5>
                    </LinkEmpty>
                }

            </PostInfo>
        </Card>
    )
}

const Card = styled.div`
    width: 611px;
    background-color: #171717;
    border-radius: 16px;

    padding: 20px;
    display: flex;
    gap: 20px;
    box-sizing: border-box;

    * { 
        box-sizing: border-box;
    }

    @media (max-width: 768px) {
        width: 100%;
        border-radius: 0px;
    }
`

const ImgLikeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    img {
        flex: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
    }
`

const NameIconsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    h1 {
        font-family: Lato;
        font-size: 19px;
        font-weight: 400;
        line-height: 23px;
        letter-spacing: 0em;
        text-align: left;
        color: #ffffff;
    }

    div {
        display: flex;
        gap: 10px;

        *:hover{
            cursor: pointer;
        }
    }
`

const PostInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: flex-start;
    align-items: flex-start;

    h2 {
        font-family: Lato;
        font-size: 17px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: left;
        color: #B7B7B7;

        a {
            color: #ffffff;
            font-weight: 700;
            text-decoration: none;
        }
    }
`

const LinkContainer = styled.div`
    min-height: 155px;
    min-width: 500px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display: flex;
    justify-content: space-between;

    div {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: space-between;
        overflow: hidden;
    }

    img {
        flex: none;
        width: 155px;
        min-height: 155px;
        object-fit: cover;
        border-radius: 0px 11px 11px 0px;
    }

    h3 {
        font-family: Lato;
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        letter-spacing: 0em;
        text-align: left;
        color: #CECECE;
    }

    h4 {
        font-family: Lato;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        letter-spacing: 0em;
        text-align: left;
        color: #9B9595;
    }

    h5 {
        font-family: Lato;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        letter-spacing: 0em;
        text-align: left;
        color: #CECECE;
    }

    &:hover{
        cursor: pointer;
    }
`

const LinkEmpty = styled.div`
    height: 80px;
    min-width: 500px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    overflow: hidden;

    h3 {
        font-family: Lato;
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        letter-spacing: 0em;
        text-align: left;
        color: #CECECE;
    }

    h5 {
        font-family: Lato;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        letter-spacing: 0em;
        text-align: left;
        color: #CECECE;
    }

    &:hover{
        cursor: pointer;
    }
`

const EditDescription = styled.div`
    background-color: white;
    border-radius: 7px;
    width: 100%;

    input {
        width: 100%;
    }
`

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
