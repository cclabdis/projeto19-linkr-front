import { useContext, useState } from "react";

import useInterval from "./useInterval";

import findNewPosts from "../services/apiNewPosts";
import { UserContext } from "../contexts/userContext";

const useNotifier = ({ currData }) => {
    const [state, setState] = useState({
        show: false,
        count: 0,
    });
    const { user } = useContext(UserContext);

    useInterval(async () => {
        const lastPostId = currData[0]?.id || null;

        if(lastPostId !== null) {
            await findNewPosts("/timeline/new-posts", user?.token, lastPostId)
                .then((data) => {
                    if(data) {
                        setState({
                           show: true,
                           count: data,
                        });
                    } else {
                        setState({
                            show: false,
                            count: 0,
                        })
                        // console.log("Nothing new to see...");
                    }
                })
                .catch(({ message }) => {
                    console.log(message);
                });
        }
    }, 15000);

    return { state, setState };
}

export default useNotifier;
