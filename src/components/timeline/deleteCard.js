import { deletePost } from "../../services/apiPosts";

export const handleDelete = async (postId, token, setIsModalOpen) => {

try {
    await deletePost(postId, token);
    console.log("Post excluído com sucesso");
    window.location.reload();
  } catch ({ message }) {
    alert(message?.data || message);
  }
};
