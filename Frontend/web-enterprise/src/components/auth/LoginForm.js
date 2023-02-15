import { useState, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

const LoginForm = () => {
    //context
    const { loginUser } = useContext(AuthContext)

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const onChangeLoginForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
    const { username, password } = loginForm
    const login = async event => {
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            console.log(loginData)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={login}>
            <input type="text" name="username" placeholder="Username" required value={username} onChange={onChangeLoginForm} />
            <input type="password" name="password" placeholder="Password" required value={password} onChange={onChangeLoginForm} />
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm