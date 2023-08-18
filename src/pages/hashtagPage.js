import { useParams } from "react-router-dom"
import TemplatePage from "../components/common/templatePage";
import { useContext, useEffect, useState } from "react";
import apiHashtags from "../services/apiHashtags";
import { styled } from "styled-components";
import { UserContext } from "../contexts/userContext";
import { RefreshContext } from "../contexts/refreshContext";
import SideBar from "../components/common/sideBar";

export default function HashatgPage(){
    const {hashtag} = useParams(); 
    const [listaPosts, setListaPosts] = useState([]);
    const {user} = useContext(UserContext);
    const {refresh, setRefresh} = useContext(RefreshContext);

    useEffect(()=>{
        apiHashtags.getPostsByHashtag(hashtag,user.token).
        then((resp)=>{
            console.log(resp.data);
            setListaPosts(resp.data);
        })
        .catch((err)=>{console.log(err.message)});
    },[])
    
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
            <div>
                <button onClick={()=>{setRefresh(!refresh)}}>recarregar {refresh.toString()}</button>
            </div>
            {Posts}
            <SideBar/>
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