import { styled } from "styled-components";
export default function TitleContainer({children}){
   return(
        <TitleContainerSC className="Oswald">
            <PositionContentSC>
                {children}
            </PositionContentSC>
        </TitleContainerSC>
   )
}

const TitleContainerSC = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    h1{
            font-size: 43px;
    }
`

const PositionContentSC = styled.div`
    width: 920px;
    margin-bottom: 40px;
    display: flex;
    @media (max-width: 1024px){
        width: 611px;
    }
    @media (max-width: 768px){
        width: 100%;
        flex-direction: column;
        gap: 0px;
    }
`