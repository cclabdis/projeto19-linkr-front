import React from "react";
import { useEffect, useState } from "react";
import TemplatePage from "../components/common/templatePage";
import PublishBox from "../components/timeline/publishBox"; // Importe o PublishBox
import PostCard from "../components/timeline/PostCard.jsx";
import { styled } from "styled-components";
import SideBar from "../components/common/sideBar";
import getPosts from "../services/apiPosts";

// const mockPost = {
//     username: "Teste Nildo",
//     photo: "https://picsum.photos/id/237/200/300",
//     description: "Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #teste",
//     linkUrl: "https://medium.com/javascript-in-plain-english/i-created-the-exact-same-app-in-react-and-vue-here-are-the-differences-e9a1ae8077fd",
//     linkMetadata: { 
//         title: "Como aplicar o Material UI em um projeto React",
//         header: "Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn5Ipwht9SgjUySSRE65fzvbr_6Ek2Gx-iyw&usqp=CAU"
//         //image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
//     }
// }
// const posts = [mockPost, mockPost];

export default function TimeLinePage() {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
      getPosts()
      .then((r)=>{
          console.log(r.data);
          setPosts(r.data);
      })
      .catch((err)=>{console.log(err.message)});
  },[])

  const handlePublish = (newPost) => {
    // Aqui você pode implementar a lógica para adicionar a nova publicação à timeline
    console.log("Nova publicação:", newPost);
  };

  return (
    <TemplatePage title={`Time Line Page`} hasPublishBox={true}>
      <PublishBox onPublish={handlePublish} />
      {/* Outro conteúdo da timeline aqui */}

      <Container>
        <PostsContainer>
                  {posts.map(p =>
                      <PostCard post={p}/>
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
