import { useContext, useState } from "react";
import { styled } from "styled-components"
import apiFollow from "../../services/apiFollow";
import { UserContext } from "../../contexts/userContext";

export default function FollowButton({isFollowing, userId}){
    const {user} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [followState, setFollowState] = useState(isFollowing);

    async function handleClick(){
        setIsLoading(true);
        apiFollow.FollowUser(user.token,userId)
            .then((resp)=>{
                setFollowState(resp.data);
            })
            .catch((err)=>{
                console.log(err);
            })
            .finally(()=>{
                setIsLoading(false); 
            }); 
    }

    return(
        isLoading
            ? <DisableButton className="Lato">loading...</DisableButton>
            :followState
            ? <UnfollowBtn className="Lato" onClick={handleClick} data-test="follow-btn">Unfollow</UnfollowBtn>
            : <FollowBtn className="Lato" onClick={handleClick} data-test="follow-btn">Follow</FollowBtn>
    )
}

const FollowBtn = styled.button`
    background-color: #1877F2;
    color: white;
    &:hover{
        cursor: pointer;
        box-shadow: rgba(24, 119, 242, 0.35) 0px 5px 15px;
    }
`

const UnfollowBtn = styled.button`
    background-color: white;
    color: #1877F2;
    &:hover{
        cursor: pointer;
        box-shadow: rgba(255, 255, 255, 0.35) 0px 5px 15px;
    }
`

const DisableButton = styled.button`
    background-color: darkgray;
    color: gray;
`