import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../constants/constants";
import style from './LoginForm.module.css'

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
      <div className={style.loginWrapper}>
        <div className={style.panda}>
          <div className={style.ear}></div>
          <div className={style.earRgt}></div>
          <div className={style.face}>
            <div className={style.eyeShadeLeft}></div>
            <div className={style.eyeWhiteLeft}></div>
            <div className={style.eyeShadeRight}></div>
            <div className={style.eyeWhiteRight}></div>
            <div className={style.nose}></div>
            <div className={style.mouth}></div>
          </div>
          <div className={style.body}> </div>
          <div className={style.footLeft}>
            <div className={style.finger}></div>
          </div>
          <div className={style.footRight}>
            <div className={style.finger}></div>
          </div>
        </div>
        <form className={style.loginForm} onSubmit={login}>
          <div className={style.handLeft}></div>
          <div className={style.handRight}></div>
          <h1 className={style.loginText}>Login Account</h1>

          <div className={style.formGroup}>
            <input
              className={style.formControl}
              type="text"
              name="Username"
              placeholder="Username"
              required
              value={Username}
              onChange={onChangeLoginForm}
            />
          </div>

          <div className={style.formGroup}>
            <input
              className={style.formControl}
              type="password"
              name="Password"
              placeholder="Password"
              required
              value={Password}
              onChange={onChangeLoginForm}
            />

          </div>
          <div className={style.loginBtnWrapper}>
            <input type="submit" className={style.loginBtn} value='Login' />
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
