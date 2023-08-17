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

                    <h2>{post.description}</h2>
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

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
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
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;

`