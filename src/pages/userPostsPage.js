import { useParams } from "react-router-dom"
import TemplatePage from "../components/common/templatePage";
import TitleTemplate from "../components/common/titleTemplate";

export default function UserPostsPage(){
    const {id} = useParams();
    return(
    <>
        <TemplatePage>
            <TitleTemplate texto={`${id}'s posts`}/>
            <>Posts do usuario {id} aqui...</>
        </TemplatePage>
    </>
    )
}