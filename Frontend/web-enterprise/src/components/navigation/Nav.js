import "./Nav.css";

import React, { useState, useEffect } from "react";

const Nav = () => {
	const [fixed, setFixed] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleScroll = () => {
		if (window.pageYOffset > 50) {
			setFixed(true);
		} else {
			setFixed(false);
		}
	};

	return (
		<header className={fixed ? "fixed" : ""}>
			<nav className="navbar">
				<div className="logo">
					<img src="https://www.logolynx.com/images/logolynx/79/79de60e9956ba8104831b1530d45d2e0.jpeg" />
				</div>
				<div className="search-container">
					<input type="text" placeholder="Search" />
				</div>

				<div class="dropdown">
					<div class="dropdown-toggle">
						<img src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/279124471_1370043140139558_7697343296375162295_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Aa58ZvsOtyQAX-xk8VM&tn=XxsEV1fe8eY9p6hm&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDn_60rxz8p9jtoQpQwPwCq2XiC5kVvUBauvK4Lxcn4Yw&oe=63ED11D5" alt="avatar" class="avatar" />
						<i class="fa fa-caret-down">
							<div class="dropdown-menu">
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


export default Nav;