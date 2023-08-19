import axios from "axios";
import ConfigToken from "./configToken";

const API_URL = process.env.REACT_APP_API_URL;

function getTrending(){
    const promise = axios.get(`${API_URL}/trendings`);
    return promise;
}

function getPostsByHashtag(hashtag,token){
    const promise = axios.get(`${API_URL}/posts/${hashtag}`,ConfigToken(token));
    return promise;
}


const apiHashtags = {getTrending,getPostsByHashtag};
export default apiHashtags;