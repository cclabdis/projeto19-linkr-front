import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { UserContext } from "../contexts/userContext";

import AuthPage from "../components/auth/authPage";

export default function LoginPage() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (user?.token) {
            navigate("/timeline");
        }
    }, []);

    return <AuthPage action={"signIn"} />
}