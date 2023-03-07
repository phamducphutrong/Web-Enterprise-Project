import React, { useState } from 'react';
import './Sidebar.css'; // import file css
import { Sidebar, SidebarItem } from "react-responsive-sidebar";


function SideBar() {
    /*const items = [
        <SidebarItem>
            <ul className="nav">
                <i class='bx bx-menu' id='btn'></i>
                <li>
                    <a href="#">
                        <i class="fa fa-home" aria-hidden="true"></i>
                        <span className="link_name">Home</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                        <span className="link_name">Profile</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-comment" aria-hidden="true"></i>
                        <span className="link_name">Comment</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-lightbulb-o" aria-hidden="true"></i>
                        <span className="link_name">Idea</span>
                    </a>
                </li>
            </ul>
        </SidebarItem>,
    ];*/

    return (
        /*<Sidebar breakpoint={980} content={items}></Sidebar>*/

        <div className={`sidebar `}>
            <ul className="nav">
                <i className='bx bx-menu' id='btn'></i>
                <li>
                    <a href="/homepage">
                        <i className="fa fa-home" aria-hidden="true"></i>
                        <span className="link_name">Home</span>
                    </a>
                </li>
                <li>
                    <a href="/profile">
                        <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                        <span className="link_name">Profile</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa fa-comment" aria-hidden="true"></i>
                        <span className="link_name">Comment</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
                        <span className="link_name">Idea</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default SideBar;