import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../contexts/userContext';
import apiAuth from '../../services/apiAuth';
import { object, string } from 'yup';

const signInFields = {
    'email': { type: 'email', placeholder: "e-mail", dataTest: 'email' },
    'password': { type: 'password', placeholder: "password", dataTest: 'password' }
};
const signUpFields = {
    ...signInFields,
    'username': { type: 'text', placeholder: 'username', dataTest: 'username' },
    'photo': { type: 'url', placeholder: 'picture url', dataTest: 'picture-url' }
};

const signInSchema = object({
    email: string().required(),
    password: string().min(3).required(),
});

const signUpSchema = object({
    email: string().required(),
    password: string().min(3).required(),
    username: string().min(3).required(),
    photo: string().url().required(),
})

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
            //Validate data:
            await (action === "signIn" ? signInSchema : signUpSchema)
                .validate(data)

            const responseData = await apiAuth(`/${action}`, data);
            if (action === "signIn") {
                localStorage.setItem("user", JSON.stringify(responseData));
                setUser(responseData);
                navigate("/timeline");
            } else if (action === "signUp") { navigate("/"); }

        } catch ({ message }) {
            alert(message?.data || message);
        }
        setSubmitting(false);
    };
    console.log(data);
    return (
        <form>
            {Object.keys(fields).map(field =>
                <input
                    data-test={fields[field].dataTest}
                    required={true}
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