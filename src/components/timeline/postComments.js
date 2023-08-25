import { useContext, useEffect, useState } from "react";

import { styled } from "styled-components";

import { UserContext } from "../../contexts/userContext";

import apiComments from "../../services/apiComments";

const PostComments = ({ post: { id }, commentsCount, setCommentsCount }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const [submitting, setSubmitting] = useState(false);

    const { user } = useContext(UserContext);

    useEffect(() => {
        if(commentsCount > 0 && user?.token) {
            apiComments("/comment", user.token, id)
                .then(data => { setComments(data); setCommentsCount(data.length); })
                .catch(({ message }) => { console.log(message) });
        }
    }, [commentsCount, user, id]);

    const handleSubmit = () => {
        if(submitting) return;

        setSubmitting(true);

        apiComments("/comment", user.token, id, newComment)
            .then(() => { window.location.reload(); })
            .catch(err => { });

        setSubmitting(false);
    };

    return (
        <Container data-test="comment-box">
            {commentsCount > 0
                ? comments.map(comment => (<div key={comment['comment_id']}>
                    <div data-test="comment" className="comment__container">
                        <img src={comment['user_photo']} alt="user profile pic" />
                        <div className="comment-details">
                            <div className="user-info">
                                <h4 className="Lato">{comment['username'] || "Fulano"}</h4>
                                <p className="Lato">
                                    {comment['user_is_author']
                                        ? "• post's author"
                                        : comment['following']
                                            ? "• following" : ""}
                                </p>
                            </div>
                            <div className="comment-text">
                                <p className="Lato">{comment['comment']}</p>
                            </div>
                        </div>
                    </div>
                    <hr width={"100%"} />
                </div>
                ))
                : <>
                   <p className="Oswald">This post has zero comments</p>
                   <hr width={"100%"} />
                </>

            }
            <div className="new-comment__container">
                <img src={user.photo} alt="profile pic" />
                <input
                    data-test="comment-input"
                    disabled={submitting}
                    className="Lato"
                    placeholder="write a comment..."
                    type="text"
                    name="comment"
                    value={newComment}
                    onChange={ev => setNewComment(ev.target.value)}
                    onKeyDown={ev => { if(ev.key === "Enter") handleSubmit();  }}
                />
                <svg data-test="comment-submit" onClick={handleSubmit}
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14.8268 0.620432C14.7341 0.543491 14.6215 0.49447 14.502 0.479084C14.3826 0.463697 14.2612 0.482578 14.152 0.533526L1.05469 6.68115V7.87071L6.55584 10.0712L10.0845 15.4999H11.2743L15.0337 1.26865C15.0641 1.1521 15.0609 1.0293 15.0242 0.914532C14.9876 0.799768 14.9191 0.697774 14.8268 0.620432ZM10.5397 14.3653L7.50666 9.69896L12.1739 4.58703L11.4355 3.91278L6.73166 9.06456L2.19594 7.25028L13.866 1.7724L10.5397 14.3653Z" fill="#F3F3F3" />
                </svg>
            </div>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    box-sizing: border-box;
    position: relative;

    width: 100%;
    height: fit-content;
    margin-top: -20px;
    padding: 20px 30px 20px;
    border-radius: 15px;

    background: #1E1E1E;

    /* z-index: 1; */

    hr {
        color: #565656;
    }

    img {
        flex: none;

        width: 50px;
        height: 50px;

        border-radius: 50%;
        object-fit: cover;
    }

    .comment__container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 30px;

        .comment-details {
            display: flex;
            flex-direction: column;
            gap: 5px;

            .user-info {
                display: flex;
                gap: 10px;

                h4 {
                    color: #F3F3F3;
                    font-size: 14px;
                    font-weight: 700;
                }

                p {
                    color: #565656;
                    font-size: 14px;
                    font-weight: 400;
                }
            }

            .comment-text {
                p {
                    color: #ACACAC;
                    font-size: 14px;
                    font-weight: 400;
                }
            }
        }

    }

    .new-comment__container {
        display: flex;
        justify-content: space-between;
        align-items: center;


        input {
            width: 85%;
            height: 35px;

            border: none;
            border-radius: 8px;
            padding-left: 15px;

            background: #252525;
            color: #575757;

            font-size: 14px;

            &:focus {
                color: #FFF;
                font-size: 16px;
            }
        }

        svg {
            position: absolute;
            bottom: 35px;
            right: 50px;

            cursor: pointer;

            &:hover {
                scale: 1.05;
            }
        }
    }
`;

export default PostComments;