import { styled } from "styled-components";

export default styled.div`
    display: flex;
    align-items: center;

    width: 100%;
    height: 100vh;

    >div {
        display: flex;
        justify-content: center;

        height: 100%;
    }

    .logo__container {
        flex-direction: column;
        padding-left: 10%;

        width: 60%;
        background-color: #151515;

        font-weight: 700;

        >div {
            h1 {
                font-size: 95px;
            }

            h3 {
                max-width: 442px;
                font-size: 40px;
            }
        }
    }

    .form__container {
        flex-direction: column;
        align-items: center;
        gap: 5px;

        width: 40%;

        background-color: #333;

        >form {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;

            width: 100%;

            input {
                box-sizing: border-box;
                width: 80%;
                height: 42px;

                border-radius: 6px;
                border: none;
                padding-left:10px ;
                background: #FFF;

                font-size: 20px;
            }
        }

        button {
            width: 80%;
            height: 40px;

            border-radius: 6px;
            background: #1877F2;
            margin-top: 2px;
            border: none;

            color: #FFF;
            font-size: 22px;

            cursor: pointer;
        }

        a {
            color: #FFF;

            text-align: center;
            font-size: 20px;
            font-weight: 400;
            text-decoration-line: underline;
        }
    }
`;