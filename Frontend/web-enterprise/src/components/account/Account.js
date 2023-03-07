import axios from "axios";
import { useState } from "react";
import { apiUrl } from "../../constants/constants";

const Account = () => {
    const Roles = ['QAM', 'QAC', 'Staff'];
    const [createAccountForm, setCreateAccountForm] = useState({
        Username: '',
        Password: '',
        Role: Roles[0]
    });

    const { Username, Password, Role } = createAccountForm;

    const onChangeCreateAccountForm = event => {
        setCreateAccountForm({ ...createAccountForm, [event.target.name]: event.target.value });
    }

    const createAccount = event => {
        event.preventDefault();
        (async () => {
            try {
                const response = await axios.post(`${apiUrl}/auth/create`, createAccountForm);
                if (response.data.success) {
                    console.log(response.data);
                    setCreateAccountForm({
                        Username: '',
                        Password: '',
                        Role: Roles[0]
                    });
                }
            } catch (error) {
                console.log(error.response.data);
            }
        })();
    }

    return (
        <>
            <h1>Create Account</h1>
            <form onSubmit={createAccount}>
                <input type='text' placeholder="Username" name="Username" value={Username} onChange={onChangeCreateAccountForm} />
                <input type='password' placeholder="Password" name="Password" value={Password} onChange={onChangeCreateAccountForm} />
                <select value={Role} name="Role" onChange={onChangeCreateAccountForm}>
                    {
                        Roles.map((Role, index) => (
                            <option key={index} value={Role}>{Role}</option>
                        ))
                    }
                </select>
                <button type="submit">Create Account</button>
            </form>
        </>
    );
};

export default Account;