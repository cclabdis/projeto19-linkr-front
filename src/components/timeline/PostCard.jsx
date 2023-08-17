import { styled } from "styled-components";


export default function PostCard({post}){
    // const urlMetadata = require('url-metadata');

    // urlMetadata('https://www.npmjs.com/package/url-metadata'
    // ,     
    //     { mode: 'no-cors'
    //     }
    // )
    // .then((metadata) => {
    // console.log(metadata)
    // // do stuff with the metadata
    // },
    // (err) => {
    // console.log(err)
    // });

    return (
        <Card>
            <img src={post.photo} alt="user" />
            <PostInfo>
                <h1>{post.username}</h1>
                <h2>{post.description}</h2>
                <LinkContainer>
                    <div>
                        <h3>{post.linkMetadata.title}</h3>
                        <h4>{post.linkMetadata.header}</h4>
                        <h5>{post.linkUrl}</h5>
                    </div>
                    <img src={post.linkMetadata.image} alt="metadata" />
                </LinkContainer>
            </PostInfo>
        </Card>
    )
}

const Card =  styled.div`
    width: 611px;
    background-color: #171717;
    border-radius: 16px;

    padding: 20px;
    display: flex;
    gap: 20px;

    * { 
        box-sizing: border-box;
    }

    >img {
        flex: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
    }

    @media (max-width: 768px) {
        box-sizing: border-box;
        width: 100%;
        border-radius: 0px;
    }
`

const PostInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: flex-start;
    align-items: flex-start;

    h1 {
        font-family: Lato;
        font-size: 19px;
        font-weight: 400;
        line-height: 23px;
        letter-spacing: 0em;
        text-align: left;
        color: #ffffff;
    }

    h2 {
        font-family: Lato;
        font-size: 17px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: left;
        color: #B7B7B7;
    }
`

const LinkContainer = styled.div`
    min-height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display: flex;

    div {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: space-between;
        overflow: hidden;
    }

    img {
        flex: none;
        width: 155px;
        min-height: 155px;
        object-fit: cover;
        border-radius: 0px 11px 11px 0px;
    }

    h3 {
        font-family: Lato;
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        letter-spacing: 0em;
        text-align: left;
        color: #CECECE;
    }

    h4 {
        font-family: Lato;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        letter-spacing: 0em;
        text-align: left;
        color: #9B9595;
    }

    h5 {
        font-family: Lato;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        letter-spacing: 0em;
        text-align: left;
        color: #CECECE;
    }
`