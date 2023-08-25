import axios, { AxiosError } from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const apiComments = async (path, token, postId, comment=false) => {
    try {
        const response = await axios.request({
            url: API_URL + path + `/${postId}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: (comment && { comment }) || "",
            method: comment ? 'post' : 'get',
            paramsSerializer: {
                encode: JSON.parse,
                serialize: JSON.stringify,
            }
        });
        //Get request:
        return response.data;
    } catch (err) {
        throw new AxiosError(err);
    }
};

export default apiComments;