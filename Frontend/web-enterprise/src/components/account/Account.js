import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../constants/constants";

const Account = () => {
    const Roles = ['QAM', 'QAC', 'Staff'];
    const [accounts, setAccounts] = useState([]);
    const [createAccountForm, setCreateAccountForm] = useState({
        Username: '',
        Password: '',
        Role: Roles[0]
    });

    const { Username, Password, Role } = createAccountForm;

    useEffect(() => {
        try {
            (async () => {
                const response = await axios.get(`${apiUrl}/auth/listAccount`);
                if (response.data.success) {
                    console.log(response.data.accounts);
                    setAccounts(response.data.accounts);
                }
            })();
        } catch (error) {
            console.log(error.response.data);
        }
    }, []);

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
                    setAccounts([...accounts, response.data.newAccount]);
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

    const deleteAccount = id => {
        (async () => {
            try {
                const response = await axios.delete(`${apiUrl}/auth/${id}`);
                if (response.data.success) {
                    console.log(response.data);
                    const afterDeletedAccounts = accounts.filter(account => account._id !== id);
                    setAccounts(afterDeletedAccounts);
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
            <h1>List of accounts</h1>
            {
                accounts.map((account, index) => (
                    <div key={index}>
                        <div>{account._id}</div>
                        <div>{account.Username}</div>
                        <div>{account.Role}</div>
                        <button type='button' onClick={() => deleteAccount(account._id)}>Delete</button>
                    </div>
                ))
            }
        </>
    );
};

export default Account;