import { styled } from "styled-components";
import TitleContainer from "../../styles/ComponentStyles/titleContainer";
import FollowButton from "./followButton";
import { useState } from "react";

export default function UserPageTitle({texto,foto}){
    const [isYou, setIsYou] = useState(false);
    
    return (
        <TitleContainer>
            <PositionContainerSC>
                <UserContainer>
                    <UserPhoto src={foto}/>
                    <h1 data-test="hashtag-title">{texto}</h1>
                </UserContainer>
                {isYou
                ? <></>
                :<ButtonContainer>
                    <FollowButton isFolowing={false}/>
                </ButtonContainer>
                }

            </PositionContainerSC>
        </TitleContainer>
    )
}
const UserContainer = styled.div`
    gap: 18px;
    display: flex;
    justify-content: center;
    flex-direction: row;
`
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: end;
    button{
        width: 112px;
        height: 31px;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 700;
        border: none;
    }
    
`

const UserPhoto = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    object-fit: cover;
`
const PositionContainerSC = styled.div`
    display: flex;
    justify-content: space-between;
    width: 920px;
    @media (max-width: 1024px){
        width: 611px;
    }
    @media (max-width: 768px){
        width: 100%;
        flex-direction: column;
        gap: 20px;
    }
`