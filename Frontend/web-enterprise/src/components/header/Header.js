import React, { useState, useEffect } from "react";
import style from './Header.module.css';

const Header = () => {
	const [fixed, setFixed] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleScroll = () => {
		if (window.pageYOffset > 0) {
			setFixed(true);
		} else {
			setFixed(false);
		}
	};
	return (
		<header className={fixed ? style.fixed : ""}>
			<nav className={style.navbar}>
				<div className={style.logo}>
					<img src="https://www.logolynx.com/images/logolynx/79/79de60e9956ba8104831b1530d45d2e0.jpeg" />
				</div>
				<div className={style.searchContainer}>
					<input type="text" placeholder="Search" />
				</div>
				<div class={style.dropdown}>
					<div class={style.dropdownToggle}>
						<img src="https://scontent.fhan1-1.fna.fbcdn.net/v/t39.30808-6/279124471_1370043140139558_7697343296375162295_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=BEaMNFz7QxcAX8AUCBi&_nc_ht=scontent.fhan1-1.fna&oh=00_AfAui5DKlW7l4nLJw6oE3WLHxZoYJnDlmi_rHtzlnaZGDw&oe=63F30095" alt="avatar" class={style.avatar}/>
						<i class="fa fa-caret-down">
							<div class={style.dropdownMenu}>
								<a href="#">Profile</a>
								<a href="#">Settings</a>
								<a href="#">Logout</a>
							</div>
						</i>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
