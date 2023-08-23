import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { UserContext } from "../../contexts/userContext";
import { PulseLoader } from "react-spinners";
import TitleContainer from "../../styles/ComponentStyles/titleContainer";
import FollowButton from "./followButton";
import apiFollow from "../../services/apiFollow";

export default function UserPageTitle({userId}){
    const {user} = useContext(UserContext);
    const [isYou, setIsYou] = useState(user.id === parseInt(userId));
    const [userInfos, setUserInfos] = useState({id: 0,isFollowing:false,photo:"",username:""});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        setUserInfos({id: 0,isFollowing:false,photo:"",username:""});
        setIsLoading(true);
        apiFollow.getFollowInfos(user.token,userId)
        .then((resp)=>{
            setUserInfos(resp.data);
        })
        .catch((err)=>{
            setUserInfos({id: -1,isFollowing:false,photo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmmpcXeJjTncQghbrAVOJbFYPEdVpMYEPzoQ&usqp=CAU",username:"Server Error!"});
            console.log(err.message);
        })
        .finally(()=>{
            setIsLoading(false);
        });
    },[]);
    
    return (
        <TitleContainer>
            {isLoading
                ?(
                    <PositionContainerSC>
                        <LoadingWarning>
                            Carregando informações do usuario
                            <PulseLoader
                                size={8}
                                color="#fff"
                                speedMultiplier={0.7}
                            />
                        </LoadingWarning>
                    </PositionContainerSC>
                ):(
                    <PositionContainerSC>
                        <UserContainer>
                            <UserPhoto src={userInfos.photo}/>
                            <h1 data-test="hashtag-title">{userInfos.username}</h1>
                        </UserContainer>
                        {!(isYou) &&
                            <ButtonContainer>
                                <FollowButton isFollowing={userInfos.isFollowing} userId={userInfos.id}/>
                            </ButtonContainer>
                        }
                    </PositionContainerSC>)
            }
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

const LoadingWarning = styled.div`
    display:flex;
    gap: 10px;
    align-items: end;
    justify-content: center;
    font-size: 40px;
    @media (max-width: 768px){
        font-size: 5vw;
    }
`