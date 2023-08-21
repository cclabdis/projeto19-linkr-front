import { useParams } from "react-router-dom";
import TemplatePage from "../components/common/templatePage";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { UserContext } from "../contexts/userContext";
import ClipLoader from "react-spinners/ClipLoader";
import PostCard from "../components/timeline/PostCard";
import SideBar from "../components/common/sideBar";
import TitleTemplate from "../components/common/titleTemplate";
import apiHashtags from "../services/apiHashtags";

export default function UserPostsPage() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [listaPosts, setListaPosts] = useState([]);
  const [userName, setUserName] = useState("__");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setListaPosts([]);
    setUserName("");
    apiHashtags.getUserPosts(id, user.token)
      .then((r) => {
        console.log(r.data);
        setListaPosts(r.data);
        setIsLoading(false);
        if(r.data[0].username){
          setUserName(r.data[0].username)      
        }
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <TemplatePage>
      {userName !== ""  && <TitleTemplate texto={`${userName}'s posts`} />} 

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
