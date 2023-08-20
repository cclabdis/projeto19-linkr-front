import { useParams } from "react-router-dom";
import TemplatePage from "../components/common/templatePage";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { UserContext } from "../contexts/userContext";
import ClipLoader from "react-spinners/ClipLoader";
import PostCard from "../components/timeline/PostCard";
import SideBar from "../components/common/sideBar";
import TitleTemplate from "../components/common/titleTemplate";
import getUserPosts from "../services/apiPosts";

export default function UserPostsPage() {
  const { username } = useParams();
  const { user } = useContext(UserContext);
  const [listaPosts, setListaPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setListaPosts([]);
    getUserPosts(username, user.token)
      .then((r) => {
        setListaPosts(r.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <TemplatePage>
      <TitleTemplate texto={`${username}'s posts`} />
      <Container>
        <PostsContainer>
          {isLoading ? (
            <LoadingContainer>
              <ClipLoader color="#fff" size={150} />
              <h1 className="Oswald">Loading posts...</h1>
            </LoadingContainer>
          ) : (
            listaPosts.map((post, i) => <PostCard post={post} key={`post_${i}`} />)
          )}
        </PostsContainer>
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
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  margin-right: 740px;
  margin-bottom: 40px;
  h1 {
    font-size: 43px;
  }
  @media (max-width: 1024px) {
    margin-right: 500px;
  }
  @media (max-width: 768px) {
    margin-right: 0px;
  }
`;
const LoadingContainer = styled.div`
  height: 345px;
  width: 611px;
  border-radius: 0 0 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  h1 {
    font-size: 35px;
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
