import { useNavigate } from "react-router";
import { styled } from "styled-components";
import ListItem from "../sidebar/listItem";
import { useEffect, useState } from "react";
import apiHashtags from "../../services/apiHashtags";
import ClipLoader from "react-spinners/ClipLoader";

export default function SideBar(){
    const [listaTrending, setListaTrending] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const ComponentsList = listaTrending.map((el)=>(
        <ListItem hashtag={el.hashtag} key={`item${el.id})`} />
    ));

    useEffect(()=>{
        apiHashtags.getTrending()
        .then((res)=> {
            //console.log(res.data);
            setListaTrending(res.data);
            setIsLoading(false);
        })
        .catch((err)=> {
            console.log(err);
            setIsLoading(false);
        });
    },[])
    

    
    return (
        <SideBarContainer>
            <TitleContainer className="Oswald">
                trending
            </TitleContainer>
            {isLoading ?
            <LoadingContainer>
                <ClipLoader color="#fff" size={150}/>
            </LoadingContainer>
            :
                <ListContainer className="Lato">
                    <ul>
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
    position: absolute;
    top:232px;
    left:1025px;
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