import React, { useState } from "react";
import style from "./CreateIdea.module.css";


export default function CreateIdea() {
    const [openIdea, setOpenIdea] = useState(false);

    return (
        <>
            <button
                className={style.btnModalCreateIdea}
                onClick={() => setOpenIdea(true)}
            >
                Open
            </button>

            {openIdea && (
                <div className={style.modalCreateIdea}>
                    <div className={style.modalBodyCreateIdea}>
                        <div className={style.modalInnerCreateIdea}>
                            {/* đầu */}
                            <div className={style.CreateIdeaHeader}>
                                <h1>Create Idea </h1>
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
                        <div className={style.CreateIdeaFooter}>
                            <div className={style.footerLeft}>
                                <div className={style.inputIdea}>
                                    <textarea rows={10} className={style.InputForm} placeholder="What's happening..."></textarea>
                                </div>
                                <div className={style.addInfor}>
                                    <h3 className={style.add}>Add to your posts</h3>
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
                                <div className={style.submitIdea1}>
                                    <form className={style.submitIdea2}>
                                        <button className={style.submitIdea3} type="submit">
                                            Create Idea
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className={style.footerRight}>
                                <div className={style.addImage}>
                                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png" width="28" height="28" className={style.addImage} />
                                </div>
                                <div className={style.addImage2}>
                                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/MqTJr_DM3Jg.png" width="28" height="28" className={style.addImage2} />
                                </div>
                                <div className={style.addImage}>
                                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/uywzfiZad5N.png" width="28" height="28" className={style.addImage3} />
                                </div>
                                <div className={style.addImage2}>
                                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/_cAtN_ZFj9c.png" width="28" height="28" className={style.addImage4} />
                                </div>
                                <button
                                    className={style.closeModalCreateIdea}
                                    onClick={() => setOpenIdea(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}