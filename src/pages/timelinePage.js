import React from "react";
import TemplatePage from "../components/common/templatePage";
import PublishBox from "../components/timeline/publishBox"; // Importe o PublishBox

export default function TimeLinePage() {
  const handlePublish = (newPost) => {
    // Aqui você pode implementar a lógica para adicionar a nova publicação à timeline
    console.log("Nova publicação:", newPost);
  };

  return (
    <TemplatePage title={`Time Line Page`} hasPublishBox={true}>
      <PublishBox onPublish={handlePublish} />
      {/* Outro conteúdo da timeline aqui */}
      <>TimeLine aqui...</>
    </TemplatePage>
  );
}