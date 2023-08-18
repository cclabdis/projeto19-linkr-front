import axios, { AxiosError } from "axios";
import ConfigToken from "./configToken";
import IdentifyHashtags from "../utils/identifyHashtags.function";

const API_URL = process.env.REACT_APP_API_URL;

export const createPost = async (postData, token) => {

  try {

    const hashtagsList = IdentifyHashtags(postData.description);
    const response = await axios.post(`${API_URL}/timeline`, {...postData,hashtagsList}, ConfigToken(token));
    return response.data;
  } catch (error) {
    throw new AxiosError(error.message);
  }
};

//>>>>>>>>>>>>>>>>>>Alterações de Jefti, apagar comentarios depois <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export const GetPosts = async (token)=>{
  try {
    const response = await axios.get(`${API_URL}/timeline`,ConfigToken(token));
    return response.data;
  } catch (error) {
    throw new AxiosError(error.message);
  }
}
//>>>>>>>>>>>>>>>>>>Fim das alterações de Jefti, apagar comentarios depois <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<