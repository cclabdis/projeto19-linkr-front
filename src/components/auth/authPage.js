import { Link } from "react-router-dom";

import Container from "./container";
import Form from "./form";

const AuthPage = ({ action }) => {
    const login = action === "signIn";

    return (
        <Container>
            <div className="logo__container">
                <div>
                    <h1 className="PassionOne">linkr</h1>
                    <h3 className="Oswald">save, share and discover the best links on the web</h3>
                </div>
            </div>
            <div className="form__container">
                <Form action={action} />
                <Link
                    data-test={login ? "sign-up-link" : "login-link"}
                    className="Lato"
                    to={login ? "/sign-up" : "/"}
                >
                    {login
                        ? "First time? Create an account!"
                        : "Switch back to log in"
                    }
                </Link>
            </div>
        </Container>
    )
}

export default AuthPage;