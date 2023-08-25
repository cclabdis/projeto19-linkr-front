import { apiRepost } from "../../services/apiRepost";

export const handleRepost = async (postId, userId, token) => {

try {
    await apiRepost(postId, userId, token);
    console.log("Repostado");
    window.location.reload();
  } catch ({ message }) {
    alert(message?.data || message);
  }
};


//post.id, user.token, user.id