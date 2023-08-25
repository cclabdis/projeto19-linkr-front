import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "styled-components";
import { AiOutlineHeart, AiFillHeart, AiFillDelete, AiOutlineComment } from 'react-icons/ai';
import { PiPencilBold } from 'react-icons/pi';
import { Tooltip } from "react-tooltip";

import replace from 'react-string-replace';

import { UserContext } from "../../contexts/userContext";
import { RefreshContext } from "../../contexts/refreshContext";

import { handleDelete } from "./deleteCard";
import PostComments from "./postComments";

import { updatePost } from "../../services/apiPosts";
import apiLikes from "../../services/apiLikes";

import content from "../../helpers/toolTipContent";


import { BiRepost } from 'react-icons/bi';
import DeleteModal from "../modais/delete.modal";
import RepostModal from "../modais/repost.modal";
import { handleRepost } from "./repostCard";


export default function PostCard({ post }) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const token = user.token;

    const [desc, setDesc] = useState(post.description);
    const replaced = desc => {
        return replace(desc, /#(\w+)/g, (match, i) => (
            <a key={i} href={`/hashtag/${match}`}>
                #{match}
            </a>
        ))
    }
    const [replacedDesc, setReplaced] = useState(replaced(desc));

    const [likesInfo, setLikesInfo] = useState({
        liked: post['has_liked'],
        count: Number(post['like_count']),
        users: post['likes_users'] || [],
    });
    const [repostedInfo, setRepostedInfo] = useState({
        reposted: post['has_posted'],
        count: Number(post['reposts_count']),
    });
    const [commentsCount, setCommentsCount] = useState(post.comments_count);

    const { refresh, setRefresh } = useContext(RefreshContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRepostModalOpen, setIsRepostModalOpen] = useState(false);
    const openDeleteModal = () => {
        setIsModalOpen(true);
    };
    const [showComments, setShowComments] = useState(false);

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
    };

    /// edit post///
    const [isEditing, setIsEditing] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const editRef = useRef();

    useEffect(() => {
        if (isEditing) { editRef.current.focus(); };
    }, [isEditing]);

    const handlePress = e => {
        if (e.key === "Escape") {
            setIsEditing(false);
            setDesc(post.description);
        } else if (e.key === "Enter") {
            setSubmitting(true);
            handleSubmit()
        }
    };

    const handleLike = async () => {
        try {
            await apiLikes(likesInfo.liked, (likesInfo.liked ? `/deslike/` : `/like/`) + `${post.id}`, user.token);
            setLikesInfo(prev => ({
                liked: !prev.liked,
                count: prev.count + (prev.liked ? -1 : 1),
                users: prev.liked
                    ? prev.users.filter(u => u['user_id'] !== user.id)
                    : [...prev.users, { user_id: user.id, username: user.username }]
            }));
        } catch ({ message }) {
            console.log(message);
        }
    }
    const handleRepostPost = async () => {
        try {
            await handleRepost(post.id, user.id, user.token);
        } catch ({ message }) {
            console.log(message);
        }
    }


    function handleSubmit() {
        const data = { description: desc, hashtagsList: desc.split(" ").filter(c => c[0] === '#') };
        updatePost(token, post.id, data)
            .then(() => {
                setIsEditing(false);
                setReplaced(replaced(desc));
                setRefresh(!refresh);
            })
            .catch(err => {
                console.log(err.message);
                alert(`The changes couldn't be saved! Error: ${err.message}`);
            })
        setSubmitting(false);
    };
    const handleDeletePost = async () => {
        try {
            await handleDelete(post.id, user.token);
        } catch ({ message }) {
            console.log(message);
        }
    };

    return (
        <>
            {post['reposts_count'] > 0 ? <div
                style={{
                    display: "flex",
                    gap: "10px",

                    boxSizing: "border-box",
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    background: '#1E1E1E',

                    padding: "15px",
                    marginBottom: "-30px",
                    width: '100%',
                    height: '50px',
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 13V8H7L3.5 4L0 8H2V14C2 14.5304 2.21071 15.0391 2.58579 15.4142C2.96086 15.7893 3.46957 16 4 16H13.482L10.844 13H5ZM9.156 7L6.518 4H16C17.104 4 18 4.897 18 6V12H20L16.5 16L13 12H15V7H9.156Z" fill="white" />
                </svg>
                <p
                    style={{ color: "FFF", fontSize: "14px", fontFamily: "Lato" }}
                >Re-posted by {
                    <span style={{ fontWeight: "700" }}>
                        {post['reposts_users'].map(user => user.username || "Fulano").join(", ")}
                    </span>
                }</p>
            </div> : <></>}
            <Card data-test="post">
                <ImgLikeContainer>
                    <img src={post.photo} alt="user" />
                    <div className="likes">
                        {likesInfo.liked
                            ? <AiFillHeart
                                data-test="like-btn"
                                size={30}
                                color="red"
                                onClick={handleLike}
                                cursor="pointer"
                            />
                            : <AiOutlineHeart
                                data-test="like-btn"
                                size={30}
                                onClick={handleLike}
                                cursor="pointer"
                            />
                        }
                        <Tooltip
                            id={`tooltip-${post.id}`}
                            render={() => <p
                                data-test="tooltip"
                            >
                                {likesInfo.users.length > 0
                                    ? content(likesInfo.users, user.id)
                                    : "No one liked this post yet"}
                            </p>}
                        />
                        <p
                            data-tooltip-id={`tooltip-${post.id}`} data-test="counter"
                        >{likesInfo.count + " " + (likesInfo.count === 1 ? "like" : "likes")}</p>
                    </div>
                    <div className="comments">
                        <AiOutlineComment
                            onClick={() => setShowComments(prev => !prev)}
                            data-test="comment-btn"
                            size={30}
                            cursor="pointer"
                        />
                        <p data-test="comment-counter" >
                            {commentsCount.toString() + " " +
                                (Number(commentsCount) === 1 ? "comment" : "comments")}
                        </p>
                    </div>

                    <div>
                        <BiRepost data-test="repost-btn" size={30} cursor="pointer" onClick={() => setIsRepostModalOpen(true)} />
                        <p data-test="repost-counter">{repostedInfo.count + "" + (repostedInfo.count === 1 ? " re-post" : " re-posts")}</p>
                    </div>
                    <RepostModal
                        isOpen={isRepostModalOpen}
                        onClose={() => setIsRepostModalOpen(false)}
                        onRepost={handleRepostPost}
                    />

                </ImgLikeContainer>

            <PostInfo>
                <NameIconsContainer>
                    <h1 data-test="username" onClick={() => navigate(`/user/${post.user_id || post.posterid}`)}>{post.username}</h1>
                    {post.user_id === user.id &&
                        <div>
                            <PiPencilBold
                                size={20}
                                color={"white"}
                                onClick={() => setIsEditing(!isEditing)}
                                data-test="edit-btn"
                            />
                            {/* <AiFillDelete size={20} onClick={() => handleDelete(post.id, user.token)} /> */}
                            <AiFillDelete data-test="delete-btn" size={20} onClick={openDeleteModal} />
                            <DeleteModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onDelete={handleDeletePost}
                            />
                        </div>
                    }

                    </NameIconsContainer>

                    {isEditing
                        ?
                        <EditDescription >
                            <input
                                data-test="edit-input"
                                disabled={submitting}
                                onKeyDown={(e) => handlePress(e)}
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
                        <LinkContainer onClick={() => openInNewTab(post.link)}>
                            <div>
                                <h3>{post.linkMetadata.title === '' ? "No title available" : post.linkMetadata.title}</h3>
                                <h4>{post.linkMetadata.description === '' ? "No description available" : post.linkMetadata.description}</h4>
                                <a
                                    data-test="link"
                                    id="link-post"
                                    href={post.link}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {post.link}
                                </a>
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
            {(showComments || Number(post.comments_count) > 0) && <PostComments
                                post={post}
                                setCommentsCount={setCommentsCount}
                                commentsCount={commentsCount}/>}
        </>
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

    .likes, .comments {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;

        width: 100%;

        p {
            width: fit-content;
            text-align: center;
        }
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

        &:hover {
            cursor: pointer;
        }
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
    width: 90%;
    min-width: 450px;
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

    a {
        text-decoration: none;
        color: #CECECE;
        font-family: Lato;
        font-size: 13px;
        font-weight: 600;
    }

    &:hover{
        cursor: pointer;
    }
`

const LinkEmpty = styled.div`
    height: 80px;
    width: 90%;
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
        overflow-wrap: break-word;
        width: 100%;
        min-height: 30px;
        font-family: Lato;
        font-size: 14px;
        font-weight: 400;
        line-height: 17px;
        letter-spacing: 0em;
        text-align: left;
        color: #4C4C4C;
    }
`
