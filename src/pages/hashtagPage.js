import { useParams } from "react-router-dom"
import TemplatePage from "../components/common/templatePage";

export default function HashatgPage(){
    const {hashtag} = useParams(); 
    return (
    <>
        <TemplatePage title={`# ${hashtag}`} hasPublishBox={false}>
            <>Posts com a #{hashtag} aqui...</>
        </TemplatePage>
    </>
    )
}