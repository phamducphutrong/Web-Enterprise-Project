import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import CreateIdea from "../idea/CreateIdea";
import style from './Body.module.css';
import axios from 'axios';

Modal.setAppElement("#root");

function Body() {
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

    const [isModalOpen, setIsModalOpen] = useState(false); // state cho việc mở và đóng modal

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    return (
        <ul>
            <CreateIdea />
            <div className={style.line}></div>
            <li className={style.textInput}>
                <div className={style.avatarNameDate}>
                    <img src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/279124471_1370043140139558_7697343296375162295_n.jpg?stp=dst-jpg_p240x240&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=D_tMB3tY9XAAX8hHXTj&tn=SLNvUmKXwpYJVKz6&_nc_ht=scontent.fhan5-9.fna&oh=00_AfAPLiyfjTk7RoIjs2FKkFIcx3ptGIuFYHF-MXtHNODAVw&oe=63F7EB97" alt="avatar" className={style.logoAvatar} />
                    <div className={style.nameDateDot}>
                        <div className={style.nameDate}>
                            <div className={style.nameDisplay}>Quân Lê</div>
                            <div className={style.dateDisplay}>1 hour ago</div>
                        </div>
                        <div className={style.dot}><h1 type="button" onClick={openModalUpdateDeleteIdea}>...</h1></div>
                        <Modal className={style.modalComment}
                            isOpen={isModalOpenUpdateDeleteIdea}
                            onRequestClose={closeModalUpdateDeleteIdea}
                            contentLabel="Example Modal">
                            <a href="#" type="button" onClick={openModalUpdate}>Update Idea</a>
                            <Modal className={style.modalUpdate}
                                isOpen={isModalOpenUpdate}
                                onRequestClose={closeModalUpdate}
                                contentLabel="Example Modal">
                                <section class="ftco-section">
                                    <div class="container">
                                        <div class="row justify-content-center">
                                            <div class="col-md-6 text-center mb-5">
                                                <h2 class="heading-section">Table #01</h2>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="table-wrap">
                                                    <table class="table">
                                                        <thead class="thead-primary">
                                                            <tr>
                                                                <th>Title</th>
                                                                <th>Description</th>
                                                                <th>Last Edition</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Mark</td>
                                                                <td>In the above code, the import keywords are used to import the Apple() and Windows() functions, exported by the "America.js" file.
                                                                    Also, we need to wrap the functions or values inside the curly braces { } and must have to put the same name as defined from where they
                                                                    are being exported. That’s why these imports are called Named export. We can not change the name of the imported bindings aka (Functions/Values/Classes).
                                                                    But also we can import multiple bindings into a single line of code, separated by commas(,)</td>
                                                                <td>In the above code, the import keywords are used to import the Apple() and Windows() functions, exported by the "America.js" file.
                                                                    Also, we need to wrap the functions or values inside the curly braces { } and must have to put the same name as defined from where they
                                                                    are being exported. That’s why these imports are called Named export.
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <div className={style.modalDiv}>
                                    <button className={style.dislike}>Submit</button>
                                    <button onClick={closeModalUpdate} className={style.closeComment}><i class="fa fa-close"></i></button>
                                </div>
                            </Modal>
                            <a href="#">Delete Idea</a>
                            <a href="#">Download .CSV</a>
                            <div className={style.modalDiv}>
                                <button onClick={closeModalUpdateDeleteIdea} className={style.closeComment}><i class="fa fa-close"></i></button>
                            </div>
                        </Modal>
                    </div>
                </div>
                <div className={style.content}>
                    In the above code, the import keywords are used to import the Apple() and Windows() functions, exported by the "America.js" file.
                    Also, we need to wrap the functions or values inside the curly braces { } and must have to put the same name as defined from where they
                    are being exported. That’s why these imports are called Named export. We can not change the name of the imported bindings aka (Functions/Values/Classes).
                    But also we can import multiple bindings into a single line of code, separated by commas(,)
                </div>
                <img className={style.imgBody} src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/279124471_1370043140139558_7697343296375162295_n.jpg?stp=dst-jpg_p240x240&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=D_tMB3tY9XAAX8hHXTj&tn=SLNvUmKXwpYJVKz6&_nc_ht=scontent.fhan5-9.fna&oh=00_AfAPLiyfjTk7RoIjs2FKkFIcx3ptGIuFYHF-MXtHNODAVw&oe=63F7EB97" />
                <div className={style.line}></div>
                <div className={style.likeDislikeComment}>
                    <div className={style.interactionButtons}>
                        <button className={style.like}><i class="fa fa-thumbs-up"></i></button>
                        <button className={style.dislike}><i class="fa fa-thumbs-down"></i></button>
                        <button type="button" className={style.comment} onClick={openModal}><i class="fa fa-comment"></i></button>
                        <Modal className={style.modalComment}
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            contentLabel="Example Modal">
                            <div className={style.modalDiv}>
                                <img src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/279124471_1370043140139558_7697343296375162295_n.jpg?stp=dst-jpg_p240x240&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=D_tMB3tY9XAAX8hHXTj&tn=SLNvUmKXwpYJVKz6&_nc_ht=scontent.fhan5-9.fna&oh=00_AfAPLiyfjTk7RoIjs2FKkFIcx3ptGIuFYHF-MXtHNODAVw&oe=63F7EB97" alt="avatar" className={style.logoAvatarComment} />
                                <input className={style.inputModalComment} type="text" name="comment" placeholder="Comment here" />
                                <button className={style.like}><i class="fa fa-thumbs-o-up"></i></button>
                                <button className={style.dislike}><i class="fa fa-thumbs-o-down"></i></button>
                                <button className={style.dislike}><i class="fa fa-user-o"></i></button>
                                <button onClick={closeModal} className={style.closeComment}><i class="fa fa-close"></i></button>
                            </div>
                        </Modal>
                    </div>
                    <div className={style.commentSection}>
                        <form className={style.homepageForm}>
                            <input className={style.inputComment} type="text" name="comment" placeholder="Comment here" />
                            <span className={style.cameraIconComment}><i className="fas fa-camera"></i></span>
                        </form>
                    </div>
                </div>
            </li>
        </ul>
    );
};

export default Body;