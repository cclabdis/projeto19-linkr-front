import axios from "axios";
import ConfigToken from "./configToken";

const API_URL = process.env.REACT_APP_API_URL;

function getFollowInfos(token, targetId){
    const promise = axios.get(`${API_URL}/infos/${targetId}`, ConfigToken(token));
    return promise;
}

function FollowUser(token, targetId){
    const promise = axios.post(`${API_URL}/follow/${targetId}`,{},ConfigToken(token));
    return promise;    
}
const apiFollow = {getFollowInfos, FollowUser};
export default apiFollow;
