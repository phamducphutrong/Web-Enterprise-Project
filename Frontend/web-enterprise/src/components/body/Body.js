import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import UpdateIdea from "../idea/UpdateIdea";
import style from './Body.module.css';
import axios from 'axios';
import { apiUrl, USER_ID } from "../../constants/constants";

Modal.setAppElement("#root");

function Body() {
    const userId = localStorage.getItem(USER_ID) // lấy id của người dùng (userId)
    const [showActionsModal, setShowActionsModal] = useState(false); // trạng thái của modal hiển thị các hành động (update, delete, download CSV)
    const [showAddModal, setShowAddModal] = useState(false); // trạng thái của modal hiển thị form add
    const [showUpdateModal, setShowUpdateModal] = useState(false); // trạng thái của modal hiển thị form update
    const [showCommentModal, setShowCommentModal] = useState(false); // trạng thái của modal hiển thị form comment
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [ideas, setIdeas] = useState([]);
    const [categories, setCategories] = useState([]);
    const [createIdeaForm, setCreateIdeaForm] = useState({
        Title: '',
        Description: '',
        UserId: userId,
        CategoryId: null
    });

    const [updateIdeaForm, setUpdateIdeaForm] = useState({
        updating_id: '',
        updatingTitle: '',
        updatingDescription: ''
    });

    const [deleteIdeaId, setDeleteIdeaId] = useState('');

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    useEffect(() => {
        try {
            (async () => {
                const response = await axios.get(`${apiUrl}/idea/home`);
                if (response.data.success) {
                    console.log(response.data);
                    setIdeas(response.data.ideas);
                    setCategories(response.data.categories);
                    setSelectedCategoryId(response.data.categories[0]._id);
                    setCreateIdeaForm({
                        Title: '',
                        Description: '',
                        UserId: userId,
                        CategoryId: response.data.categories[0]._id
                    });
                }
            })();
        } catch (error) {
            console.log(error.response.data);
        }
    }, []);

    const onChangeCreateIdeaForm = event => {
        setCreateIdeaForm({ ...createIdeaForm, [event.target.name]: event.target.value });
    }

    const onChangeUpdateIdeaForm = event => {
        setUpdateIdeaForm({ ...updateIdeaForm, [event.target.name]: event.target.value });
    }

    const createIdea = (event) => {
        event.preventDefault();
        setShowAddModal(false);
        (async () => {
            try {
                const response = await axios.post(`${apiUrl}/idea/`, createIdeaForm);
                if (response.data.success) {
                    console.log(response.data.idea);
                    setCreateIdeaForm({
                        Title: '',
                        Description: '',
                        UserId: userId,
                        CategoryId: null
                    });
                    setIdeas([...ideas, response.data.idea]);
                }
            } catch (error) {
                console.log(error.response.data)
            }
        }
        )();
    }

    const showActionsModalAndGetCurrentIdea = idea => {
        setShowActionsModal(true);
        setUpdateIdeaForm({
            updating_id: idea._id,
            updatingTitle: idea.Title,
            updatingDescription: idea.Description
        });
        setDeleteIdeaId(idea._id);
    }

    const updateIdea = event => {
        event.preventDefault();
        setShowUpdateModal(false);
        setShowActionsModal(false);
        (async () => {
            try {
                const response = await axios.put(`${apiUrl}/idea/${updateIdeaForm.updating_id}`, { Title: updateIdeaForm.updatingTitle, Description: updateIdeaForm.updatingDescription });
                if (response.data.success) {
                    console.log(response.data);
                    const newIdeas = ideas.map(idea => {
                        if (idea._id === response.data.idea._id) {
                            idea.Title = response.data.idea.Title;
                            idea.Description = response.data.idea.Description;
                        }
                        return idea;
                    });
                    setIdeas(newIdeas);
                }
            } catch (error) {
                console.error(error.response.data);
            }
        })();
    }

    const deleteIdea = () => {
        setShowDeleteModal(false);
        setShowActionsModal(false);
        (async () => {
            try {
                const response = await axios.delete(`${apiUrl}/idea/${deleteIdeaId}`);
                if (response.data.success) {
                    const afterDeletedIdeas = ideas.filter(idea => idea._id !== deleteIdeaId);
                    setIdeas(afterDeletedIdeas);
                }
            } catch (error) {
                console.error(error.response.data);
            }
        })();
    }

    const [isChecked, setIsChecked] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    function handleCheckboxChange(event) {
        setIsChecked(event.target.checked);
    }



    return (
        <>
            <ul className={style.homepageUl}>
                <li className={style.arialLabel}>
                    <img src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/279124471_1370043140139558_7697343296375162295_n.jpg?stp=dst-jpg_p240x240&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=D_tMB3tY9XAAX8hHXTj&tn=SLNvUmKXwpYJVKz6&_nc_ht=scontent.fhan5-9.fna&oh=00_AfAPLiyfjTk7RoIjs2FKkFIcx3ptGIuFYHF-MXtHNODAVw&oe=63F7EB97" alt="avatar" className={style.logoAvatar} />
                    <div className={style.inputContainer}>
                        <input type="text" name="comment" className={style.inputText} placeholder="Input nội dung" onClick={() => setShowAddModal(true)} />
                        <span className={style.cameraIcon}><i className="fas fa-camera"></i></span>
                    </div>
                </li>
                <div className={style.line}></div>
                {
                    ideas.map((idea, index) => {
                        return (
                            <li className={style.textInput} key={index}>
                                <div className={style.avatarNameDate}>
                                    <img src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/279124471_1370043140139558_7697343296375162295_n.jpg?stp=dst-jpg_p240x240&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=D_tMB3tY9XAAX8hHXTj&tn=SLNvUmKXwpYJVKz6&_nc_ht=scontent.fhan5-9.fna&oh=00_AfAPLiyfjTk7RoIjs2FKkFIcx3ptGIuFYHF-MXtHNODAVw&oe=63F7EB97" alt="avatar" className={style.logoAvatar} />
                                    <div className={style.nameDateDot}>
                                        <div className={style.nameDate}>
                                            {idea.userPost.map((user, index) => (
                                                <div key={index}>
                                                    <p>{user.Name}</p>
                                                </div>
                                            ))}
                                            <div className={style.dateDisplay}>1 hour ago</div>
                                        </div>
                                        <div className={style.dot}><h1 type="button" onClick={() => showActionsModalAndGetCurrentIdea(idea)}>...</h1></div>
                                        <Modal className={style.modalComment} isOpen={showActionsModal} onRequestClose={() => setShowActionsModal(false)}>
                                            <button onClick={() => setShowUpdateModal(true)}>Update Idea</button>
                                            <button onClick={() => setShowDeleteModal(true)}>Delete</button>
                                            <a href="#">Download .CSV</a>
                                            <div className={style.modalDiv}>
                                                <button onClick={() => setShowActionsModal(false)} className={style.closeComment}><i class="fa fa-close"></i></button>
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                                <div className={style.content}>{idea.Description}</div>
                                <img className={style.imgBody} src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/279124471_1370043140139558_7697343296375162295_n.jpg?stp=dst-jpg_p240x240&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=D_tMB3tY9XAAX8hHXTj&tn=SLNvUmKXwpYJVKz6&_nc_ht=scontent.fhan5-9.fna&oh=00_AfAPLiyfjTk7RoIjs2FKkFIcx3ptGIuFYHF-MXtHNODAVw&oe=63F7EB97" />
                                <div className={style.line}></div>
                                <div className={style.likeDislikeComment}>
                                    <div className={style.interactionButtons}>
                                        <button className={style.like}><i class="fa fa-thumbs-up"></i></button>
                                        <button className={style.dislike}><i class="fa fa-thumbs-down"></i></button>
                                        <button type="button" className={style.comment} onClick={() => setShowCommentModal(true)}><i class="fa fa-comment"></i></button>
                                        <Modal className={style.modalComment} isOpen={showCommentModal} onRequestClose={() => setShowCommentModal(false)}>
                                            <div className={style.modalDiv}>
                                                <img src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/279124471_1370043140139558_7697343296375162295_n.jpg?stp=dst-jpg_p240x240&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=D_tMB3tY9XAAX8hHXTj&tn=SLNvUmKXwpYJVKz6&_nc_ht=scontent.fhan5-9.fna&oh=00_AfAPLiyfjTk7RoIjs2FKkFIcx3ptGIuFYHF-MXtHNODAVw&oe=63F7EB97" alt="avatar" className={style.logoAvatarComment} />
                                                <input className={style.inputModalComment} type="text" name="comment" placeholder="Comment here" />
                                                <button className={style.like}><i class="fa fa-thumbs-up"></i></button>
                                                <button className={style.dislike}><i class="fa fa-thumbs-down"></i></button>
                                                <button onClick={() => setShowCommentModal(false)} className={style.closeComment}><i class="fa fa-close"></i></button>
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
                        )
                    })
                }
            </ul>

            {showAddModal && (
                <div className={style.modalCreateIdea}>
                    <div className={style.modalBodyCreateIdea}>
                        <div className={style.modalInnerCreateIdea}>
                            {/* đầu */}
                            <div className={style.CreateIdeaHeader}>
                                <h1 className={style.CreateIdea}>Create Idea </h1>
                            </div>
                        </div>
                        {/* Thân */}
                        <div className={style.CreateIdeaContent}>
                            <div className={style.CreateIdeaContentTop}>
                                <img src="https://th.bing.com/th/id/OIP.4xZbB1ML4raovv9lcrnXTQHaEK?w=311&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" className={style.CreateIdeaAvt} />
                                <div className={style.CreateIdeaName}>Phương Anh</div>
                            </div>
                            <hr className={style.gach}></hr>
                        </div>
                        {/* Cuối */}
                        <form onSubmit={createIdea}>
                            <div className={style.CreateIdeaFooter}>
                                <div className={style.footerLeft}>
                                    <div className={style.inputIdea}>
                                        <input type='text' name='Title' placeholder="Title" onChange={onChangeCreateIdeaForm} />
                                        <textarea rows={10} className={style.InputForm} name='Description' placeholder="Description" onChange={onChangeCreateIdeaForm}></textarea>
                                        <select value={selectedCategoryId} name='CategoryId' onChange={onChangeCreateIdeaForm}>
                                            {categories.map((category, index) => (
                                                <option key={index} value={category._id}>
                                                    {category.Title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className={style.addInfor}>
                                        <label>
                                            <input className={style.add} type="radio" name="option" value="A" checked={selectedOption === 'A'} onChange={handleOptionChange} />
                                            Công khai
                                        </label>
                                        <label>
                                            <input className={style.Ccate} type="radio" name="option" value="B" checked={selectedOption === 'B'} onChange={handleOptionChange} />
                                            Ẩn danh
                                        </label>
                                        {/* {selectedOption === 'A' ? <p>Option A is selected</p> : <p>Option B is selected</p>} */}


                                        <div className={style.changeColor}>
                                            <img src="https://www.facebook.com/images/composer/SATP_Aa_square-2x.png" className={style.imgChange} />
                                        </div>
                                        <div className={style.footerLeftIcon}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className={style.condition}>
                                        <label className={style.agreeCondition}>
                                            <input className={style.agreeCon}
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={handleCheckboxChange}
                                            />
                                            <div className={style.text}>
                                                I agree to Terms and Conditions
                                            </div>

                                        </label>
                                    </div>
                                    <div className={style.submitIdea1}>
                                        <div className={style.submitIdea2}>
                                            <button className={style.submitIdea3} type="submit">
                                                Create Idea
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.footerRight}>
                                    <button className={style.closeModalCreateIdea} onClick={() => setShowAddModal(false)}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showUpdateModal && (
                <div className={style.modalCreateIdea}>
                    <div className={style.modalBodyCreateIdea}>
                        <div className={style.modalInnerCreateIdea}>
                            {/* đầu */}
                            <div className={style.CreateIdeaHeader}>
                                <h1 className={style.CreateIdea}>Update Idea </h1>
                            </div>
                        </div>
                        {/* Thân */}
                        <div className={style.CreateIdeaContent}>
                            <div className={style.CreateIdeaAvt}>
                                <img src="https://th.bing.com/th/id/OIP.4xZbB1ML4raovv9lcrnXTQHaEK?w=311&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" className={style.avtIdea} />
                            </div>
                            <div className={style.CreateIdeaName}>Phương Anh</div>
                            <div className={style.gach}></div>
                        </div>
                        {/* Cuối */}
                        <form onSubmit={updateIdea}>
                            <div className={style.CreateIdeaFooter}>
                                <div className={style.footerLeft}>
                                    <input type='hidden' name="updating_id" value={updateIdeaForm.updating_id} />
                                    <div className={style.formTitle}>
                                        <input type="text" className={style.addTile} name="updatingTitle" value={updateIdeaForm.updatingTitle} onChange={onChangeUpdateIdeaForm} />
                                    </div>
                                    <div className={style.inputIdea}>
                                        <textarea rows={10} className={style.InputForm} name="updatingDescription" value={updateIdeaForm.updatingDescription} onChange={onChangeUpdateIdeaForm}></textarea>
                                    </div>
                                    <div className={style.addInfor}>
                                        <label>
                                            <input className={style.public} type="radio" name="option" value="A" checked={selectedOption === 'A'} onChange={handleOptionChange} />
                                            Public
                                        </label>
                                        <label className={style.chooseB}>
                                            <input className={style.Anonymous} type="radio" name="option" value="B" checked={selectedOption === 'B'} onChange={handleOptionChange} />
                                            Anonymous
                                        </label>
                                        <div className={style.changeColor}>
                                            <img src="https://www.facebook.com/images/composer/SATP_Aa_square-2x.png" className={style.imgChange} />
                                        </div>
                                        <div className={style.footerLeftIcon}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className={style.submitIdea1}>
                                        <div className={style.submitIdea2}>
                                            <button className={style.submitIdea3} type="submit">Update Idea</button>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.footerRight}>
                                    <button className={style.closeModalCreateIdea} onClick={() => setShowUpdateModal(false)}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className={style.modalDeleteIdea}>
                    <div className={style.modalContentDeleteIdea}>
                        <h2 className={style.containerDelete}>Delete Idea</h2>
                        <p className={style.contextDeleteIdea}>Are you sure you want to delete your idea? This action cannot be undone.</p>
                        <button className={style.bntDeleteIdea} onClick={deleteIdea}>Delete</button>
                        <button className={style.bntcancelIdea} onClick={() => setShowDeleteModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Body;