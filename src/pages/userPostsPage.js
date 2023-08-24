import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { UserContext } from "../contexts/userContext";
import TemplatePage from "../components/common/templatePage";
import PostCard from "../components/timeline/PostCard";
import SideBar from "../components/common/sideBar";
import UserPageTitle from "../components/userPage/userPageTitle";
import apiHashtags from "../services/apiHashtags";
import InfiniteScroll from "react-infinite-scroller";

export default function UserPostsPage() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [listaPosts, setListaPosts] = useState([]);
  const [userData, setUserData] = useState({ username: '', photo: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setListaPosts([]);
    setUserData({ username: '', photo: '' });
    handleUserPosts(limit);
  }, [id]);

  const handleUserPosts = (limit) => {
    apiHashtags.getUserPosts(id, user.token, limit)
      .then((r) => {
        setListaPosts(r.data);
        if (r.data[0].username) {
          setUserData({ username: r.data[0].username, photo: r.data[0].photo })
        }
        setLimit(limit + 10);
        if ((r.data.length - limit) < 0) setHasMore(false);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(()=>{
        setIsLoading(false);
      })
  }

  return (
    <TemplatePage>
      {<UserPageTitle userId={id} />}

      <Container>
        <PostsContainer>
          {isLoading
            ?
              (<LoadingContainer>
                <ClipLoader color="#fff" size={150} />
                <h1 className="Oswald">Loading posts...</h1>
              </LoadingContainer>)
            :
              <ScrollContainer>
                <InfiniteScroll
                  pageStart={0}
                  loadMore={() => handleUserPosts(limit)}
                  hasMore={hasMore}
                  loader={
                    <Loader key={0}>
                      <h1 className="Oswald">Loading more posts...</h1>
                    </Loader>}
                >
                  {listaPosts.map((post, i) => (<PostCard post={post} key={`post_${i}`} />))}
                </InfiniteScroll>
              </ScrollContainer>
          }
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

const ScrollContainer = styled.div`
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }   
`
const Loader = styled.div`
  height: 50px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  h1 {
    color: #151515;
  }
`