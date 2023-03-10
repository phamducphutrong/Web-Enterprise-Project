import React, { useState, useEffect } from "react";
import { LOCAL_STORAGE_TOKEN_NAME, ACCOUNT_ID, ROLE, PROFILE_INFORMATION } from '../../constants/constants'
import style from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();
	const [fixed, setFixed] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const logout = event => {
		event.preventDefault();
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
		localStorage.removeItem(ACCOUNT_ID);
		localStorage.removeItem(ROLE);
		localStorage.removeItem(PROFILE_INFORMATION);
		navigate('/');
	}

	const handleScroll = () => {
		if (window.pageYOffset >= 0) {
			setFixed(true);
		} else {
			setFixed(false);
		}
	};

	return (

		<header className={fixed ? style.fixed : ""}>
			<nav className={style.navbar}>
				<div className={style.logo}>
					<a href="/homepage">
						<img src="https://www.logolynx.com/images/logolynx/79/79de60e9956ba8104831b1530d45d2e0.jpeg" />
					</a>
				</div>
				<div className={style.searchContainer}>
					<input type="text" placeholder="Search" />
				</div>
				<div className={style.dropdown}>
					<div className={style.dropdownToggle}>
						<img src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/279124471_1370043140139558_7697343296375162295_n.jpg?stp=dst-jpg_p240x240&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=D_tMB3tY9XAAX8hHXTj&tn=SLNvUmKXwpYJVKz6&_nc_ht=scontent.fhan5-9.fna&oh=00_AfAPLiyfjTk7RoIjs2FKkFIcx3ptGIuFYHF-MXtHNODAVw&oe=63F7EB97 " alt="avatar" className={style.avatar} />
						<i className="fa fa-caret-down">
							<div className={style.dropdownMenu}>
								<a href="/profile">Profile</a>
								<a href="#">Settings</a>
								<a href="#">Download file CSV</a>
								<a href="#">Download all idea</a>
								<a onClick={logout}>Logout</a>
							</div>
						</i>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;