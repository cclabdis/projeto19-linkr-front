import { styled } from "styled-components";
import ListItem from "../../styles/ComponentStyles/listItem";
import { useContext, useEffect, useState } from "react";
import apiHashtags from "../../services/apiHashtags";
import { MoonLoader } from "react-spinners";
import { RefreshContext } from "../../contexts/refreshContext";

export default function SideBar(){
    const [listaTrending, setListaTrending] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {refresh} = useContext(RefreshContext);


    const ComponentsList = listaTrending.map((el)=>(
        <ListItem hashtag={el.hashtag} key={`item${el.id})`} data-test="hashtag" />
    ));

    useEffect(()=>{
        apiHashtags.getTrending()
        .then((res)=> {
            setListaTrending(res.data);
            setIsLoading(false);
        })
        .catch((err)=> {
            console.log(err);
            setIsLoading(false);
        });
    },[refresh])
    

    
    return (
        <SideBarContainer>
            <TitleContainer className="Oswald">
                trending
            </TitleContainer>
            {isLoading ?
            <LoadingContainer>
                <MoonLoader
                    color="rgba(255,255,255, 1)"
                    size={100}
                    speedMultiplier={0.5}
                />
            </LoadingContainer>
            :
                <ListContainer className="Lato">
                    <ul data-test="trending">
                        {ComponentsList}
                    </ul>
                </ListContainer>
            }

        </SideBarContainer>

    );

}

const SideBarContainer = styled.div`
    background-color: #171717;
    width: 301px;
    height: 406px;
    border-radius: 16px;
    /* position: absolute;
    top:232px;
    left:1025px; */
`

const TitleContainer = styled.div`
    border-bottom: 1px solid #484848;
    height: 60px;
    border-radius: 16px 16px 0 0;
    display: flex;
    /* justify-content: center; */
    padding-left: 16px;
    align-items: center;
    font-size: 27px;
    font-weight: 800;
`

const ListContainer = styled.div`
    height: 345px;
    border-radius: 0 0 16px 16px;
    padding-left: 16px;
    padding-top: 22px;
    display: flex;
`

const LoadingContainer = styled.div`
    height: 345px;
    border-radius: 0 0 16px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
`