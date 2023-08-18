import React from "react";
import { useEffect, useState } from "react";
import TemplatePage from "../components/common/templatePage";
import PublishBox from "../components/timeline/publishBox"; // Importe o PublishBox
import PostCard from "../components/timeline/PostCard.jsx";
import { styled } from "styled-components";
import SideBar from "../components/common/sideBar";

import getPosts from "../services/apiPosts";
import ClipLoader from "react-spinners/ClipLoader";

export default function TimeLinePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    getPosts()
      .then((r) => {
        setPosts(r.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      })
  }, []);

  const handlePublish = (newPost) => {
    // Aqui você pode implementar a lógica para adicionar a nova publicação à timeline
    console.log("Nova publicação:", newPost);
  };

  return (
    <TemplatePage title={`Time Line Page`} hasPublishBox={true}>
      <PublishBox onPublish={handlePublish} />
      {/* Outro conteúdo da timeline aqui */}

      <Container>
        {isLoading ?
          <LoadingContainer>
            <ClipLoader color="#fff" size={150} />
            <h1 className="Oswald">Loading posts...</h1>
          </LoadingContainer>
          :
          <PostsContainer>
            {posts.map(p =>
              <PostCard post={p} />
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