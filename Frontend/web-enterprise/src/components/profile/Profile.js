import React, { useState, useEffect } from "react";
import Header from '../header/Header'
import style from './Profile.module.css';
import Modal from "react-modal";

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


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        /*if (window.pageYOffset > 0) {
            setFixed(true);
        } else {
            setFixed(false);
        }*/
    };

    return (
        <div>
            <Header />
            <div className={style.container}>
                <div className={style.leftSidebar}>
                    <ul>
                        <li><a href="">Home</a></li>
                        <li><a href="">Profile</a></li>
                        <li><a href="">Idea</a></li>
                        <li><a href="">Comment</a></li>
                    </ul>
                </div>
                <div className={style.middleSection}>

                    <ul>
                        <li><img src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/279124471_1370043140139558_7697343296375162295_n.jpg?stp=dst-jpg_p240x240&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=D_tMB3tY9XAAX8hHXTj&tn=SLNvUmKXwpYJVKz6&_nc_ht=scontent.fhan5-9.fna&oh=00_AfAPLiyfjTk7RoIjs2FKkFIcx3ptGIuFYHF-MXtHNODAVw&oe=63F7EB97" alt="avatar" className={style.logoProfile} /></li>
                        
                        <li className={style.arialLabel}>

                        </li>
                        <div className={style.line}></div>
                        <li className={style.arialLabel}>
                            <img src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/279124471_1370043140139558_7697343296375162295_n.jpg?stp=dst-jpg_p240x240&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=D_tMB3tY9XAAX8hHXTj&tn=SLNvUmKXwpYJVKz6&_nc_ht=scontent.fhan5-9.fna&oh=00_AfAPLiyfjTk7RoIjs2FKkFIcx3ptGIuFYHF-MXtHNODAVw&oe=63F7EB97" alt="avatar" className={style.logo} />
                            <div className={style.inputContainer}>
                                <input type="text" name="comment" className={style.inputText} placeholder="Input nội dung" onClick={openModalAvatar} />
                                <span className={style.cameraIcon}><i className="fas fa-camera"></i></span>
                            </div>
                            <Modal className={style.modal1}
                                isOpen={isModalOpenAvatar}
                                onRequestClose={closeModalAvatar}
                                contentLabel="Example Modal"
                            >
                                <h1>Quân le</h1>
                                <button onClick={closeModalAvatar}>Đóng modal</button>
                            </Modal>
                        </li>
                    </ul>
                    <ul>
                        <li className={style.textInput}>
                            <div className={style.avatarNameDate}>
                                <img src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/279124471_1370043140139558_7697343296375162295_n.jpg?stp=dst-jpg_p240x240&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=D_tMB3tY9XAAX8hHXTj&tn=SLNvUmKXwpYJVKz6&_nc_ht=scontent.fhan5-9.fna&oh=00_AfAPLiyfjTk7RoIjs2FKkFIcx3ptGIuFYHF-MXtHNODAVw&oe=63F7EB97" alt="avatar" className={style.logo} />
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
                                        <Modal className={style.modalComment}
                                            isOpen={isModalOpenUpdate}
                                            onRequestClose={closeModalUpdate}
                                            contentLabel="Example Modal">
                                            <table>
                                                <tr>
                                                    <th>Company</th>
                                                    <th>Contact</th>
                                                    <th>Country</th>
                                                </tr>
                                                <tr>
                                                    <td>Alfreds Futterkiste</td>
                                                    <td>Maria Anders</td>
                                                    <td>Germany</td>
                                                </tr>
                                                <tr>
                                                    <td>Centro comercial Moctezuma</td>
                                                    <td>Francisco Chang</td>
                                                    <td>Mexico</td>
                                                </tr>
                                            </table>
                                            <div className={style.modalDiv}>
                                                <button onClick={handleDislikeClick} className={style.dislike}>Submit</button>
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
                                    <button onClick={handleLikeClick} className={style.like}><i class="fa fa-thumbs-up"></i></button>
                                    <button onClick={handleDislikeClick} className={style.dislike}><i class="fa fa-thumbs-down"></i></button>
                                    <button type="button" className={style.comment} onClick={openModal}><i class="fa fa-comment"></i></button>
                                    <Modal className={style.modalComment}
                                        isOpen={isModalOpen}
                                        onRequestClose={closeModal}
                                        contentLabel="Example Modal">
                                        <div className={style.modalDiv}>
                                            <input className={style.inputModalComment} type="text" name="comment" placeholder="Comment here" />
                                            <button onClick={handleLikeClick} className={style.like}><i class="fa fa-thumbs-up"></i></button>
                                            <button onClick={handleDislikeClick} className={style.dislike}><i class="fa fa-thumbs-down"></i></button>
                                            <button onClick={closeModal} className={style.closeComment}><i class="fa fa-close"></i></button>
                                        </div>
                                    </Modal>
                                </div>
                                <div className={style.commentSection}>
                                    <form className={style.profileForm} onSubmit={handleCommentSubmit}>
                                        <input className={style.inputComment} type="text" name="comment" placeholder="Comment here" />
                                        <span className={style.cameraIconComment}><i className="fas fa-camera"></i></span>
                                    </form>
                                    <ul>
                                        {comments.map((comment, index) => (
                                            <li key={index}>{comment}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Profile;