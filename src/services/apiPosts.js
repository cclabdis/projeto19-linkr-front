import axios, { AxiosError } from "axios";
import ConfigToken from "./configToken";
import IdentifyHashtags from "../utils/identifyHashtags.function";

const API_URL = process.env.REACT_APP_API_URL;

export const createPost = async (postData, token) => {

  try {
    const HashtagsList = IdentifyHashtags(postData.description);
    const response = await axios.post(`${API_URL}/timeline`, {...postData,HashtagsList}, ConfigToken(token));
    return response.data;
  } catch (error) {
    throw new AxiosError(error.response);
  }
};
