import React, { useState, useEffect } from "react";
import Header from '../header/Header'
import style from './Profile.module.css';
import Modal from "react-modal";
import Sidebar from "../sidebar/Sidebar";
import Body from "../body/Body";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

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
                                        <Modal className={style.EditProfile}
                                            isOpen={isModalOpenUpdate}
                                            onRequestClose={closeModalUpdate}
                                            contentLabel="Example Modal"
                                        >
                                            {/*How to create form edit profile with avatar */}
                                            <div className={style.modalEditProfile}>
                                                <div className={style.avatarEditProfile}>
                                                    <li><img src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/279124471_1370043140139558_7697343296375162295_n.jpg?stp=dst-jpg_p240x240&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=D_tMB3tY9XAAX8hHXTj&tn=SLNvUmKXwpYJVKz6&_nc_ht=scontent.fhan5-9.fna&oh=00_AfAPLiyfjTk7RoIjs2FKkFIcx3ptGIuFYHF-MXtHNODAVw&oe=63F7EB97" alt="avatar" className={style.logoEditProfile} /></li>
                                                </div>
                                                <div className={style.modalEdit}>
                                                    <div className={style.modalName}>
                                                        <label>Name: </label>
                                                        <input type="text" placeholder="" className={style.inputModalProfile} />
                                                    </div>
                                                    <div className={style.modalGender}>
                                                        <label>Gender: </label>
                                                        <select className={style.inputModalProfileGender}>
                                                            <option value="1">Male</option>
                                                            <option value="2">Female</option>
                                                        </select>
                                                    </div>
                                                    <div className={style.modalName}>
                                                        <label>Phone Number: </label>
                                                        <input type="text" placeholder="" className={style.inputModalProfile} />
                                                    </div>
                                                    <div className={style.modalName}>
                                                        <label>Date of Birth: </label>
                                                        <input type="date" placeholder="" className={style.inputModalProfile} />
                                                    </div>
                                                    <div className={style.modalName}>
                                                        <label>Email: </label>
                                                        <input type="text" placeholder="" className={style.inputModalProfile} />
                                                    </div>
                                                    <div className={style.modalName}>
                                                        <label>Department: </label>
                                                        <select className={style.inputModalProfileDepartment}>
                                                            <option value="1">IT</option>
                                                            <option value="2">Marketing</option>
                                                            <option value="3">Sale</option>
                                                            <option value="4">HR</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={style.btnSubmitCancel}>
                                                <div className={style.btnSubmit}>
                                                    <button type="button" class="btn btn-success" onClick={closeModalUpdate}>Submit</button>
                                                </div>
                                                <div className={style.btnCancel}>
                                                    <button type="button" class="btn btn-danger" onClick={closeModalUpdate}>Cancel</button>
                                                </div>
                                            </div>
                                        </Modal>
                                        <div class={style.dropdownSetting}>
                                            <div class={style.dropdownToggleSetting}>
                                                <div className={style.iconSetting}>
                                                    <i class="fa fa-cog">
                                                        <div class={style.dropdownMenuSetting}>
                                                            <a href="#">Profile</a>
                                                            <a href="#">Settings</a>
                                                            <a href="#">Download file CSV</a>
                                                            <a href="#">Download all idea</a>
                                                        </div>
                                                    </i>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.profileDescription}>
                                        <p className={style.posts}>150 Posts</p>
                                        <p className={style.friends}>2000 <i class="fa fa-thumbs-up"></i></p>
                                        <p className={style.friends}>2000 <i class="fa fa-thumbs-down"></i></p>
                                    </div>
                                </div>
                            </li>
                        </div>

                        <div className={style.line}></div>
                        <Body />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Profile;