import { deletePost } from "../../services/apiPosts"; // Atualize o caminho de importação conforme necessário

export const handleDelete = async (postId, token) => {
    console.log('postId:', postId)
    console.log('posttoken:', token)
    try {
        await deletePost(postId, token);
        console.log( 'Post excluído com sucesso'); 
    } catch (error) {
        console.error('Erro ao excluir o post:', error);
        // Lide com o erro, se necessário
    }
};
