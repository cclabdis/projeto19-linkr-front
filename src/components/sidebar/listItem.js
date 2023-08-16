import { useNavigate } from "react-router";
import { styled } from "styled-components";
export default function ListItem({hashtag}){
    const nav = useNavigate();
    function handleRedirect(hashtag){
        nav(`/hashtag/${hashtag}`);
    }

    
    return(
        <ListItemContainer  onClick={()=>handleRedirect(hashtag)} ># {hashtag}</ListItemContainer>
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