import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import style from './Profile.module.css';
import { apiUrl, PROFILE_INFORMATION } from "../../constants/constants";
import Header from '../header/Header'
import Sidebar from "../sidebar/Sidebar";
import Body from "../body/Body";
import axios from "axios";

Modal.setAppElement("#root");

function Profile() {
    const profile_information = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const convertedDoB = new Date(profile_information.DoB);
    profile_information.DoB = convertedDoB.toISOString().substr(0, 10);
    const [profileIdeas, setProfileIdeas] = useState([]);
    const [updateProfileForm, setUpdateProfileForm] = useState({
        Name: profile_information.Name,
        Gender: profile_information.Gender,
        PhoneNumber: profile_information.PhoneNumber,
        DoB: profile_information.DoB,
        Email: profile_information.Email,
        Department: profile_information.Department,
        Avatar: profile_information.Avatar
    });
    const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [comments, setComments] = useState([]);

    const onChangeUpdateProfileForm = event => {
        setUpdateProfileForm({ ...updateProfileForm, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${apiUrl}/idea/profile/${profile_information._id}`);
                if (response.data.success) {
                    console.log(response.data.ideas);
                    setProfileIdeas(response.data.ideas);
                }
            } catch (error) {
                console.log(error.response.data);
            }
        })();
    }, [])

    const updateProfile = () => {
        setShowUpdateProfileModal(false);

    }

    const handleLikeClick = () => {
        setLikes(likes + 1);
    }

    const handleDislikeClick = () => {
        setDislikes(dislikes + 1);
    }

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        const comment = event.target.elements.comment.value;
        setComments([...comments, comment]);
        event.target.elements.comment.value = '';
    }

    return (
        <>
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
                                            <p className={style.nameProfile}>{updateProfileForm.Name}</p>
                                            <button className={style.btnEditProfile} onClick={() => setShowUpdateProfileModal(true)}>Edit Profile</button>
                                            <Modal className={style.EditProfile} isOpen={showUpdateProfileModal} onRequestClose={() => setShowUpdateProfileModal(false)}>
                                                <form onSubmit={updateProfile}>
                                                    <div className={style.modalEditProfile}>
                                                        <div className={style.avatarEditProfile}>
                                                            <li><img src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/279124471_1370043140139558_7697343296375162295_n.jpg?stp=dst-jpg_p240x240&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=D_tMB3tY9XAAX8hHXTj&tn=SLNvUmKXwpYJVKz6&_nc_ht=scontent.fhan5-9.fna&oh=00_AfAPLiyfjTk7RoIjs2FKkFIcx3ptGIuFYHF-MXtHNODAVw&oe=63F7EB97" alt="avatar" className={style.logoEditProfile} /></li>
                                                        </div>
                                                        <div className={style.modalEdit}>
                                                            <div className={style.modalName}>
                                                                <label>Name: </label>
                                                                <input type="text" name="Name" value={updateProfileForm.Name} className={style.inputModalProfile} onChange={onChangeUpdateProfileForm} />
                                                            </div>
                                                            <div className={style.modalGender}>
                                                                <label>Gender: </label>
                                                                <select value={updateProfileForm.Gender} name='Gender' className={style.inputModalProfileGender} onChange={onChangeUpdateProfileForm} >
                                                                    <option value="Male">Male</option>
                                                                    <option value="Female">Female</option>
                                                                </select>
                                                            </div>
                                                            <div className={style.modalName}>
                                                                <label>Phone Number: </label>
                                                                <input type="text" name="PhoneNumber" value={updateProfileForm.PhoneNumber} className={style.inputModalProfile} onChange={onChangeUpdateProfileForm} />
                                                            </div>
                                                            <div className={style.modalName}>
                                                                <label>Date of Birth: </label>
                                                                <input type="date" name="DoB" value={updateProfileForm.DoB} className={style.inputModalProfile} onChange={onChangeUpdateProfileForm} />
                                                            </div>
                                                            <div className={style.modalName}>
                                                                <label>Email: </label>
                                                                <input type="text" name="Email" value={updateProfileForm.Email} className={style.inputModalProfile} onChange={onChangeUpdateProfileForm} />
                                                            </div>
                                                            <div className={style.modalName}>
                                                                <label>Department: </label>
                                                                <select value={updateProfileForm.Department} className={style.inputModalProfileDepartment} onChange={onChangeUpdateProfileForm} >
                                                                    <option value="HR">HR</option>
                                                                    <option value="Marketing">Marketing</option>
                                                                    <option value="Sale">Sale</option>
                                                                    <option value="IT">IT</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={style.btnSubmitCancel}>
                                                        <div className={style.btnSubmit}>
                                                            <button type="submit" className="btn btn-success" >Submit</button>
                                                        </div>
                                                        <div className={style.btnCancel}>
                                                            <button type="button" className="btn btn-danger" onClick={() => setShowUpdateProfileModal(false)}>Cancel</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </Modal>
                                            <div className={style.dropdownSetting}>
                                                <div className={style.dropdownToggleSetting}>
                                                    <div className={style.iconSetting}>
                                                        <i className="fa fa-cog">
                                                            <div className={style.dropdownMenuSetting}>
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
                                            <p className={style.posts}>{profileIdeas.length} Posts</p>
                                            <p className={style.friends}>2000 <i className="fa fa-thumbs-up"></i></p>
                                            <p className={style.friends}>2000 <i className="fa fa-thumbs-down"></i></p>
                                        </div>
                                    </div>
                                </li>
                            </div>
                            <div className={style.line}></div>
                            {/* <Body /> */}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;