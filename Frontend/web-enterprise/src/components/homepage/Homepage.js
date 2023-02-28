import React, { useState, useEffect } from "react";
import Header from '../header/Header'
import Body from "../body/Body";
import style from './Homepage.module.css';
import Modal from "react-modal";
import SideBar from "../sidebar/Sidebar";

Modal.setAppElement("#root");

function Homepage() {
    return (
        <div>
            <Header />
            <div className={style.container}>
                <div className={style.leftSidebar}>
                    <SideBar />
                </div>
                <div className={style.middleSection}>
                    <h2 className={style.post}>Posts</h2>
                    <Body />
                </div>
                <div className={style.rightSidebar}>
                    <ul className={style.homepageUl}>
                        <li className={style.homepageLi}>Category 4</li>
                        <li>Category 5</li>
                        <li>Category 6</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Homepage