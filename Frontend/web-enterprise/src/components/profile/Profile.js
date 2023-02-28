import React, { useState, useEffect } from "react";
import Header from '../header/Header'
import style from './Profile.module.css';
import Modal from "react-modal";
import Sidebar from "../sidebar/Sidebar";
import Body from "../body/Body";

Modal.setAppElement("#root");

function Profile() {

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [fixed, setFixed] = useState(false);

    const handleLikeClick = () => {
        setLikes(likes + 1);
    };

    const handleDislikeClick = () => {
        setDislikes(dislikes + 1);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        const comment = event.target.elements.comment.value;
        setComments([...comments, comment]);
        event.target.elements.comment.value = '';
    };

    const [isModalOpen, setIsModalOpen] = useState(false); // state cho việc mở và đóng modal

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    const [isModalOpenAvatar, setIsModalOpenAvatar] = useState(false); // state cho việc mở và đóng modal

    function openModalAvatar() {
        setIsModalOpenAvatar(true);
    }

    function closeModalAvatar() {
        setIsModalOpenAvatar(false);
    }

    const [isModalOpenUpdateDeleteIdea, setIsModalOpenUpdateDeleteIdea] = useState(false); // state cho việc mở và đóng modal

    function openModalUpdateDeleteIdea() {
        setIsModalOpenUpdateDeleteIdea(true);
    }

    function closeModalUpdateDeleteIdea() {
        setIsModalOpenUpdateDeleteIdea(false);
    }

    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false); // state cho việc mở và đóng modal

    function openModalUpdate() {
        setIsModalOpenUpdate(true);
    }

    function closeModalUpdate() {
        setIsModalOpenUpdate(false);
    }

    return (
        <div>
            <Header />
            <div className={style.container}>
                <div className={style.leftSidebar}>
                    <Sidebar />
                </div>
                <div className={style.Section}>
                    <ul>
                        <div className={style.avatarProfile}>
                            <li><img src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/279124471_1370043140139558_7697343296375162295_n.jpg?stp=dst-jpg_p240x240&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=D_tMB3tY9XAAX8hHXTj&tn=SLNvUmKXwpYJVKz6&_nc_ht=scontent.fhan5-9.fna&oh=00_AfAPLiyfjTk7RoIjs2FKkFIcx3ptGIuFYHF-MXtHNODAVw&oe=63F7EB97" alt="avatar" className={style.logoProfile} /></li>
                            <li className={style.profileName}>
                                <div className={style.nameInfo}>
                                    <div className={style.nameAndBtn}>
                                        <p className={style.nameProfile}>Quân Lê</p>
                                        <button className={style.btnEditProfile} onClick={openModalUpdate}>Edit Profile</button>
                                        <Modal className={style.modal1}
                                            isOpen={isModalOpenUpdate}
                                            onRequestClose={closeModalUpdate}
                                            contentLabel="Example Modal"
                                        >
                                            <h1>Quân le</h1>
                                            <button onClick={closeModalUpdate}>Đóng modal</button>
                                        </Modal>
                                        <span className={style.iconSetting}><i class="fa fa-cog"></i></span>
                                    </div>
                                    <div className={style.profileDescription}>
                                        <p className={style.posts}>150 Posts</p>
                                        <p className={style.friends}>1.1k Friends</p>
                                    </div>
                                </div>
                            </li>
                        </div>

                        <div className={style.line}></div>
                        <Body/>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Profile;