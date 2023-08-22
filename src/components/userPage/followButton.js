import { useState } from "react";
import { styled } from "styled-components"
export default function FollowButton({isFolowing}){
    const [isLoading, setIsLoading] = useState(false);
    return(
        isLoading
            ? <DisableButton>loading...</DisableButton>
            :isFolowing
            ? <UnfollowBtn>Unfollow</UnfollowBtn>
            : <FollowBtn className="Lato">Follow</FollowBtn>
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