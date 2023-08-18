import { useParams } from "react-router-dom"
import TemplatePage from "../components/common/templatePage";
import { useEffect, useState } from "react";
import apiHashtags from "../services/apiHashtags";
import { styled } from "styled-components";

export default function HashatgPage(){
    const {hashtag} = useParams(); 
    const [listaPosts, setListaPosts] = useState([]);

    useEffect(()=>{
        apiHashtags.getPostsByHashtag(hashtag).
        then((resp)=>{
            console.log(resp.data);
            setListaPosts(resp.data);
        })
        .catch((err)=>{console.log(err.message)});
    },[hashtag])
    
    const Posts = listaPosts.map((el)=>(
        <ApagarDepois>
            <ul>
                <li>usuario: {el.username}</li>
                <li>mail: {el.mail}</li>
                <li>photo: {el.photo}</li>
                <li>description: {el.description}</li>
                <li>link: {el.link}</li>
                <li>hashtag: {el.hashtag}</li>
                <li>created_at: {el.created_at}</li>
            </ul>
        </ApagarDepois>
    ));


    return (
    <>
        <TemplatePage title={`# ${hashtag}`} hasPublishBox={false}>
            <>Posts com a #{hashtag} aqui...</>
            {Posts}
        </TemplatePage>
    </>
    )
}

const ApagarDepois = styled.div`
    background-color: #666;
    display: flex;
    border-bottom: 1px solid white;
    margin: 10px;
    width: auto;
`