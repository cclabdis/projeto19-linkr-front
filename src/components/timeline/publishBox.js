import React, { useState } from "react";
import { createPost } from "../../services/apiPosts";

export default function PublishBox({ onPublish }) {
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const handlePublish = async () => {
    if (link.trim() === "") return
    
    setIsPublishing(true);
    setErrorMessage("");


    const token = localStorage.getItem('token')
    if (!token) {
        console.log('Token not found in LocalStorage');
        return;
    }

    try {
        const postData = {
          link,
          description,
        };

  
        // Chamada de API usando o serviço apiPosts
        const newPost = await createPost(postData, token);
  
        // Ação de sucesso
        onPublish(newPost);
  
        setLink("");
        setDescription("");
      } catch (error) {
        setErrorMessage("Houve um erro ao publicar seu link");
      } finally {
        setIsPublishing(false);
      }
    };

  return (
    <div>
      <input
        type="text"
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        disabled={isPublishing}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isPublishing}
      />
      <button onClick={handlePublish} disabled={isPublishing}>
        {isPublishing ? "Publishing..." : "Publish"}
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
