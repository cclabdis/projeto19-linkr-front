import { useContext } from "react";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import { RefreshContext } from "../../contexts/refreshContext";
export default function ListItem({hashtag}){
    const {refresh, setRefresh} = useContext(RefreshContext);
    
    const nav = useNavigate();
    function handleRedirect(hashtag){
        setRefresh(!refresh);
        nav(`/hashtag/${hashtag}`);
    }

    
    return(
        <ListItemContainer  onClick={()=>handleRedirect(hashtag)} >#{hashtag}</ListItemContainer>
    )
}

const ListItemContainer = styled.li`
    line-height:22.8px;
    font-size: 19px;
    font-weight: 700;
    margin-bottom: 5px;
    letter-spacing: 5%;
    &:hover{
        cursor: pointer;
        text-decoration: underline;
    }
`