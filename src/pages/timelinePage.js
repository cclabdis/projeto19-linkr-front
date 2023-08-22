import React from "react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import TemplatePage from "../components/common/templatePage";
import PublishBox from "../components/timeline/publishBox"; // Importe o PublishBox
import PostCard from "../components/timeline/PostCard.jsx";
import { styled } from "styled-components";
import SideBar from "../components/common/sideBar";
import getPosts from "../services/apiPosts";
import ClipLoader from "react-spinners/ClipLoader";
import TitleTemplate from "../components/common/titleTemplate";

export default function TimeLinePage() {
  const { user } = useContext(UserContext);
  const token = user.token;
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPosts(token)
      .then((r) => {
        setPosts(r.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err);
        console.log(err.message);
        setIsLoading(false);
      })
  }, []);

  const handlePublish = (newPost) => {
    console.log("Nova publicação:", newPost);
  };

  return (
    <TemplatePage>

      <TitleTemplate/>
      
      
      {/* Outro conteúdo da timeline aqui */}
      <Container>
        {isLoading ?
          <LoadingContainer>
            <ClipLoader color="#fff" size={150} />
            <h1 className="Oswald">Loading posts...</h1>
          </LoadingContainer>
          :
          <PostsContainer>
            <PublishBox onPublish={handlePublish} />
              {posts.length === 0 && <MessageContainer data-test="message" className="Oswald">There are no posts yet</MessageContainer>}
              {posts.map(p =>
                <PostCard post={p} key={p.id}/>
              )}
          </PostsContainer>
        }
        <SideBar />
      </Container>

    </TemplatePage>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 1024px){
    flex-direction: column;
    align-items: center;
  }
`

const PostsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`
const LoadingContainer = styled.div`
    height: 345px;
    width: 611px;
    border-radius: 0 0 16px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    
    h1{
      font-size: 35px;
    }
`

const MessageContainer = styled.div`
  min-width: 611px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 400;

`