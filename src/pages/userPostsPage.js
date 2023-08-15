import { useParams } from "react-router-dom"
import TemplatePage from "../components/common/templatePage";

export default function UserPostsPage(){
    const {id} = useParams();
    return(
    <>
        <TemplatePage title={`usuario ${id}'s posts`} hasPublishBox={false}>
            <>Posts do usuario {id} aqui...</>
        </TemplatePage>
    </>
    )
}