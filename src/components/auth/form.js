import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../contexts/userContext';
import apiAuth from '../../services/apiAuth';

const signInFields = {
    'email': { type: 'email', placeholder: "e-mail", dataTest: 'email' },
    'password': { type: 'password', placeholder: "password", dataTest: 'password' }
};
const signUpFields = {
    ...signInFields,
    'username': { type: 'text', placeholder: 'username', dataTest: 'username' },
    'photo': { type: 'url', placeholder: 'picture url', dataTest: 'picture-url' }
};

const Form = ({ action }) => {
    const fields = (action === "signIn" && signInFields)
        || (action === "signUp" && signUpFields);

    const [submitting, setSubmitting] = useState(false);
    const [data, setData] = useState({});

    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);

    const handleSubmit = async ev => {
        ev.preventDefault();
        setSubmitting(true);
        try {
            const responseData = await apiAuth(`/${action}`, data);
            if (action === "signIn") {
                localStorage.setItem("user", JSON.stringify(responseData));
                setUser(responseData);
                navigate("/timeline");
            } else if (action === "signUp") { navigate("/"); }

        } catch ({ message }) {
            alert(message.data);
        }
        setSubmitting(false);
    };

    return (
        <form>
            {Object.keys(fields).map(field =>
                <input
                    data-test={fields[field].dataTest}
                    required
                    key={field}
                    className="Oswald"
                    name={field}
                    placeholder={fields[field].placeholder}
                    type={fields[field].type}
                    value={data[field] || ""}
                    onChange={ev => setData(prev => ({
                        ...prev, [field]: ev.target.value,
                    }))}
                />
            )}
            <button
                data-test={action === "signIn" ? "login-btn" : "sign-up-btn"}
                disabled={submitting}
                className="Oswald"
                onClick={ev => handleSubmit(ev)}
            >
                {action === "signIn"
                    ? "Log In"
                    : "Sign Up"}
            </button>
        </form>
    )
}

export default Form;