import { useParams } from "react-router-dom"
import TemplatePage from "../components/common/templatePage";
import { useContext, useEffect, useState } from "react";
import apiHashtags from "../services/apiHashtags";
import { styled } from "styled-components";
import { UserContext } from "../contexts/userContext";
import ClipLoader from "react-spinners/ClipLoader";
import PostCard from "../components/timeline/PostCard";
import SideBar from "../components/common/sideBar";
import InfiniteScroll from "react-infinite-scroller";


export default function HashatgPage(){
    const {hashtag} = useParams(); 
    const {user} = useContext(UserContext);
    const [listaPosts, setListaPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [limit, setLimit] = useState(10);
    const [hasMore, setHasMore] = useState(true);

    useEffect(()=>{
        setListaPosts([]);
        setIsLoading(true);
        handleHashtagPosts(limit);
    },[hashtag])

    const handleHashtagPosts = (limit) => {
        apiHashtags.getPostsByHashtag(hashtag,user.token, limit)
        .then((resp) => {
            setListaPosts(resp.data);
            setLimit(limit+10);
            if((resp.data.length - limit) < 0) setHasMore(false); 
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
            <TitleContainer className="Oswald">
                <h1 data-test="hashtag-title"># {hashtag}</h1>
            </TitleContainer>
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
                                loadMore={() => handleHashtagPosts(limit)}
                                hasMore={hasMore}
                                loader={
                                    <Loader key={0}>
                                      <h1 className="Oswald">Loading more posts...</h1>
                                    </Loader>}
                            >
                                {listaPosts.map((post,i)=>(<PostCard post={post} key={`post_${i}`} />))}
                            </InfiniteScroll>        
                        </ScrollContainer>
                    }
                    
                    
                </PostsContainer>
                <SideBar/>
            </Container>

        </TemplatePage>
    )
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
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    margin-right: 740px;
    margin-bottom: 40px;
    h1{
        font-size: 43px;
    }
    @media (max-width: 1024px){
        margin-right: 500px;
    }
    @media (max-width: 768px){
        margin-right: 0px;
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