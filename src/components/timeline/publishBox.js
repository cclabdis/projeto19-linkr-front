import React, { useContext, useState } from "react";
import { createPost } from "../../services/apiPosts";
import { UserContext } from "../../contexts/userContext";
import { styled } from "styled-components";

export default function PublishBox({ onPublish }) {
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useContext(UserContext)

  const handlePublish = async () => {
    if (link.trim() === "") return

    setIsPublishing(true);
    setErrorMessage("");
    try {
      const postData = {
        link,
        description,
      };
      // Chamada de API usando o serviço apiPosts
      const newPost = await createPost(postData, user.token);
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
    <PublishBoxContainer>
      <UserInfo>
        <UserPhoto src={user.photo} alt="User" />
        <span>{user.username}</span>
      </UserInfo>
      <InputsContainer>
        <SharePrompt>What are you going to share today?</SharePrompt>
        <Input
          type="text"
          placeholder="http://..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
          disabled={isPublishing}
        />
        <DescriptionInput
          type="text"
          placeholder="Awesome article about #javascript"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isPublishing}
        />
        <Button onClick={handlePublish} disabled={isPublishing}>
          {isPublishing ? "Publishing..." : "Publish"}
        </Button>
      </InputsContainer>
      {errorMessage && <p>{errorMessage}</p>}
    </PublishBoxContainer>
  );
}

const PublishBoxContainer = styled.div`
  display: flex;
  background-color: #FFFFFF;
  justify-content: space-between;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 20px;
  width: 570px;
  height: 219px;
`;
const SharePrompt = styled.p`
  color: #707070;
  font-size: 24px;
  height: 40px
  top: 253px
  left: 327px

`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  align-items: flex-start; 
`;

const Button = styled.button`
  background-color: #2196f3;
  color: #fff;
  width: 90px;
  height: 31px;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  align-self: flex-end; 
  margin-left: auto;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: #1565c0;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Input = styled.input`
  width: 502px;
  height: 30px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background-color: #EFEFEF;
  color: black;

  &:disabled {
    background-color: #333;
    cursor: not-allowed;
  }
`;
const DescriptionInput = styled(Input)`
  height: 66px;
  width: 502px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 20px; 
  text-align: center; 
  margin-top: 20px; 
`;