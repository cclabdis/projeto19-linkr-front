import TitleContainer from "../../styles/ComponentStyles/titleContainer";
export default function TitleTemplate({texto}){
    return (
        <TitleContainer className="Oswald">
            <div>
                <h1 data-test="hashtag-title">{texto}</h1>
            </div>
        </TitleContainer>
    )
}
