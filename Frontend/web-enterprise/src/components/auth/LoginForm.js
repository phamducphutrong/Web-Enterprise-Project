import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../constants/constants";

const LoginForm = () => {
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        Username: "",
        Password: "",
    });
    
    const [invalidUsernameOrPassword, setInvalidUsernameOrPassword] = useState('')

    const onChangeLoginForm = (event) =>
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

    const login = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${apiUrl}/auth/login`, loginForm);
            if (response.data.success) {
                console.log(response.data);
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
                const role = response.data.Role
                if (role === 'Staff')
                    navigate("/homepage");
                else if (role === 'QAM')
                    navigate("/category");
            }
        } catch (error) {
            console.error(error.response.data.message);
            setInvalidUsernameOrPassword(error.response.data.message);
        }
    };

    const { Username, Password } = loginForm;
    return (
        <>
            {invalidUsernameOrPassword && <p>{invalidUsernameOrPassword}</p>}
            <form onSubmit={login}>
                <input
                    type="text"
                    name="Username"
                    placeholder="Username"
                    required
                    value={Username}
                    onChange={onChangeLoginForm}
                />
                <input
                    type="password"
                    name="Password"
                    placeholder="Password"
                    required
                    value={Password}
                    onChange={onChangeLoginForm}
                />
                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default LoginForm;
