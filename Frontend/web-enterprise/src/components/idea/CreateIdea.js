import React, { useEffect, useState } from "react";
import style from "./CreateIdea.module.css";
import axios from "axios";
import { apiUrl, USER_ID } from "../../constants/constants";

export default function CreateIdea() {
    const userId = localStorage.getItem(USER_ID)
    const [openIdea, setOpenIdea] = useState(false);
    const [createIdeaForm, setCreateIdeaForm] = useState({
        Title: '',
        Description: '',
        UserId: userId,
        CategoryId: ''
    });
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('')

    useEffect(() => {
        try {
            (async () => {
                const response = await axios.get(`${apiUrl}/category/showAll`)
                if (response.data.success) {
                    console.log(response.data.categories);
                    setCategories(response.data.categories);
                    setSelectedCategoryId(response.data.categories[0]._id);
                }
            })();
        } catch (error) {
            console.error(error.response.data.message);
        };
    }, []);

    const onInputChange = event => {
        setCreateIdeaForm({ ...createIdeaForm, [event.target.name]: event.target.value });
    }

    const createIdea = (event) => {
        event.preventDefault();
        setOpenIdea(false);
        (async () => {
            try {
                const response = await axios.post(`${apiUrl}/idea/`, createIdeaForm);
                if (response.data.success) {
                    console.log(response.data);
                    setCreateIdeaForm({
                        Title: '',
                        Description: '',
                        UserId: userId,
                        CategoryId: ''
                    })
                }
            } catch (error) {
                console.log(error.response.data)
            }
        }
        )();
    }
    const { Title, Description, CategoryId } = createIdeaForm;
    const [isChecked, setIsChecked] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    function handleCheckboxChange(event) {
        setIsChecked(event.target.checked);
    }

    function handleChange(event) {
        const selectedOptionCate = event.target.value;
    }
    return (
        <>
            <li className={style.arialLabel}>
                <img src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/279124471_1370043140139558_7697343296375162295_n.jpg?stp=dst-jpg_p240x240&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=D_tMB3tY9XAAX8hHXTj&tn=SLNvUmKXwpYJVKz6&_nc_ht=scontent.fhan5-9.fna&oh=00_AfAPLiyfjTk7RoIjs2FKkFIcx3ptGIuFYHF-MXtHNODAVw&oe=63F7EB97" alt="avatar" className={style.logoAvatar} />
                <div className={style.inputContainer}>
                    <input type="text" name="comment" className={style.inputText} placeholder="Input nội dung" onClick={() => setOpenIdea(true)} />
                    <span className={style.cameraIcon}><i className="fas fa-camera"></i></span>
                </div>
            </li>
            {openIdea && (
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
                            <div className={style.CreateIdeaAvt}>
                                <img src="https://th.bing.com/th/id/OIP.4xZbB1ML4raovv9lcrnXTQHaEK?w=311&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" className={style.avtIdea} />
                            </div>
                            <div className={style.CreateIdeaName}>Phương Anh</div>

                            <div className={style.dropdownMode}>
                                <div class={style.dropdown_content}>
                                    <select className={style.selectCate} onChange={handleChange}>
                                        <option value="option1">1</option>
                                        <option value="option2">2</option>
                                        <option value="option3">3</option>
                                    </select>
                                </div>
                            </div>
                            <div className={style.formTitle}>                             
                                <input type='text' className={style.addTile} name='Title' placeholder="Title" onChange={onInputChange} />
                                </div> 


                            <div className={style.gach}></div>
                        </div>
                        {/* Cuối */}
                        <form onSubmit={createIdea}>
                            <div className={style.CreateIdeaFooter}>
                                <div className={style.footerLeft}>
                                    <div className={style.inputIdea}>

                                        {/* <input type='text' name='Title' placeholder="Title" onChange={onInputChange} /> */}
                                        <textarea rows={10} className={style.InputForm} name='Description' placeholder="What is happening..." onChange={onInputChange}></textarea>
                                        <select value={selectedCategoryId} name='CategoryId' onChange={onInputChange}>
                                            {categories.map((category) => (
                                                <option key={category._id} value={category._id}>
                                                    {category.Title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className={style.addInfor}>
                                        <label className={style.lbPublic}>
                                            <input className={style.public} type="radio" name="option" value="A" checked={selectedOption === 'A'} onChange={handleOptionChange} />
                                            Public
                                        </label>
                                        <label className={style.lbPublic}>
                                            <input className={style.anonymous} type="radio" name="option" value="B" checked={selectedOption === 'B'} onChange={handleOptionChange} />
                                            Anonymous
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
                                            />  I agree to Terms and Conditions
                                           

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

                                    <button
                                        className={style.closeModalCreateIdea}
                                        onClick={() => setOpenIdea(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}