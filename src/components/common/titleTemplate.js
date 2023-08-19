import { styled } from "styled-components";
export default function TitleTemplate({texto}){
    return (
        <TitleContainer className="Oswald">
            <h1 data-test="hashtag-title">{texto}</h1>
        </TitleContainer>
    )
}

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    margin-right: 740px;
    margin-bottom: 40px;
    h1{
        font-size: 43px;
    }
    @media (max-width: 1024px){
        margin-right: 500px;
    }
    @media (max-width: 768px){
        margin-right: 0px;
    }
`