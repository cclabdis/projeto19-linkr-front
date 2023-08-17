import React from "react";
import TemplatePage from "../components/common/templatePage";
import PublishBox from "../components/timeline/publishBox"; // Importe o PublishBox
import PostCard from "../components/timeline/PostCard.jsx";

const mockPost = {
    username: "Teste Nildo",
    photo: "https://picsum.photos/id/237/200/300",
    description: "Muito maneiro esse tutorial de Material UI com React, deem uma olhada!",
    link: "https://medium.com/javascript-in-plain-english/i-created-the-exact-same-app-in-react-and-vue-here-are-the-differences-e9a1ae8077fd"
}

export default function TimeLinePage() {
  const handlePublish = (newPost) => {
    // Aqui você pode implementar a lógica para adicionar a nova publicação à timeline
    console.log("Nova publicação:", newPost);
  };

  return (
    <TemplatePage title={`Time Line Page`} hasPublishBox={true}>
      <PublishBox onPublish={handlePublish} />
      {/* Outro conteúdo da timeline aqui */}
      <PostCard post={mockPost}/>
    </TemplatePage>
  );
}