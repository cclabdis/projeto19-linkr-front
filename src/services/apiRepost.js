import axios, { AxiosError } from "axios";
import ConfigToken from "./configToken";

const API_URL = process.env.REACT_APP_API_URL;



export const apiRepost= async (postId, userId, token) => {
    const repost = {
        postId,
        userId
      };
    try {
        console.log(repost)
      const response = await axios.post(`${API_URL}/repost`, repost, ConfigToken(token));
      console.log(response)
      return response.data;
    } catch (error) {
      throw new AxiosError(error.message);
    }
  };
  