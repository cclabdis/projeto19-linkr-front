import React from "react";
import { useEffect, useState, useContext } from "react";

import { styled } from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

import { UserContext } from "../contexts/userContext";
import { RefreshContext } from "../contexts/refreshContext";

import TemplatePage from "../components/common/templatePage";
import TitleTemplate from "../components/common/titleTemplate";
import SideBar from "../components/common/sideBar";

import PublishBox from "../components/timeline/publishBox"; // Importe o PublishBox
import PostCard from "../components/timeline/PostCard.jsx";
import PostsNotifier from "../components/timeline/postsNotifier";

import getPosts from "../services/apiPosts";
import useNotifier from "../hooks/useNotifier";
import InfiniteScroll from 'react-infinite-scroller';

export default function TimeLinePage() {
  const { user } = useContext(UserContext);
  const token = user.token;
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const { refresh, setRefresh } = useContext(RefreshContext)
  const notifier = useNotifier({ currData: posts });

  useEffect(() => {
    handlePosts(limit);
  }, [refresh, token]);

  const handlePublish = (newPost) => {
    console.log("Nova publicação:", newPost);
  };

  const handlePosts = (limit) => {
    getPosts(token, limit)
      .then((r) => {
        console.log(r.data);
        setPosts(r.data);
        setIsLoading(false);
        setLimit(limit+10);
        if((r.data.length - limit) < 0) setHasMore(false);

        notifier.setState({
          show: false,
          count: 0,
        });
      })
      .catch((err) => {
        alert(err);
        console.log(err.message);
        setIsLoading(false);
      })
  };

  return (
    <TemplatePage>

      <TitleTemplate />
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
              {notifier.state.show && <PostsNotifier notifier={notifier} setRefresh={setRefresh} />}
              {
                (posts[0].message)
                ?
                  <MessageContainer data-test="message" className="Oswald">{posts[0].message}</MessageContainer>
                :
                  <ScrollContainer>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={() => handlePosts(limit)}
                        hasMore={hasMore}
                        loader={
                          <Loader key={0}>
                            <h1 className="Oswald">Loading more posts...</h1>
                          </Loader>}
                    >
                      {(posts.length!==0) && posts.map(p =><PostCard post={p} key={p.id}/>)}
                    </InfiniteScroll>
                  </ScrollContainer>
              }

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