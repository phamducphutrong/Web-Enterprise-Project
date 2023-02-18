import React, { useState, useEffect } from "react";
import Header from '../header/Header'
import style from './Homepage.module.css';

function Homepage() {

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
                        <li>Home</li>
                        <li>Profile</li>
                        <li>Idea</li>
                        <li>Comment</li>
                    </ul>
                </div>
                <div className={style.middleSection}>
                    <h2 className={style.post}>Posts</h2>
                    <ul>
                        <li className={style.arialLabel}>
                            <img src="https://scontent.fhan1-1.fna.fbcdn.net/v/t39.30808-6/279124471_1370043140139558_7697343296375162295_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=BEaMNFz7QxcAX8AUCBi&_nc_ht=scontent.fhan1-1.fna&oh=00_AfAui5DKlW7l4nLJw6oE3WLHxZoYJnDlmi_rHtzlnaZGDw&oe=63F30095" alt="avatar" className={style.logo} />
                            <input type="text" name="comment" className={style.inputText} placeholder="Input nội dung" />
                            {/*<span>
                                <i class="fa fa-camera" aria-hidden="true"></i>
    </span>*/}
                        </li>
                        <div className={style.line}>
                        </div>
                    </ul>
                    <ul>
                        <li className={style.textInput}>
                            <div className={style.avatarNameDate}>
                                <img src="https://scontent.fhan1-1.fna.fbcdn.net/v/t39.30808-6/279124471_1370043140139558_7697343296375162295_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=BEaMNFz7QxcAX8AUCBi&_nc_ht=scontent.fhan1-1.fna&oh=00_AfAui5DKlW7l4nLJw6oE3WLHxZoYJnDlmi_rHtzlnaZGDw&oe=63F30095" alt="avatar" className={style.logo} />
                                <div className={style.nameDate}>
                                    <div className={style.nameDisplay}>Quân Lê</div>
                                    <div className={style.dateDisplay}>1 hour ago</div>
                                </div>
                            </div>
                            <div className={style.content}>
                                In the above code, the import keywords are used to import the Apple() and Windows() functions, exported by the "America.js" file.
                                Also, we need to wrap the functions or values inside the curly braces { } and must have to put the same name as defined from where they
                                are being exported. That’s why these imports are called Named export. We can not change the name of the imported bindings aka (Functions/Values/Classes).
                                But also we can import multiple bindings into a single line of code, separated by commas(,)
                            </div>
                            <img className={style.imgBody} src="https://scontent.fhan1-1.fna.fbcdn.net/v/t39.30808-6/279124471_1370043140139558_7697343296375162295_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=BEaMNFz7QxcAX8AUCBi&_nc_ht=scontent.fhan1-1.fna&oh=00_AfAui5DKlW7l4nLJw6oE3WLHxZoYJnDlmi_rHtzlnaZGDw&oe=63F30095" />
                            <div className={style.line}></div>
                            <div className={style.likeDislikeComment}>
                                <div className={style.interactionButtons}>
                                    <button onClick={handleLikeClick} className={style.like}><i class="fa fa-thumbs-up"></i></button>
                                    <button onClick={handleDislikeClick} className={style.dislike}><i class="fa fa-thumbs-down"></i></button>
                                    <button onSubmit={handleCommentSubmit} className={style.comment}><i class="fa fa-comment"></i></button>
                                </div>
                                <div className={style.commentSection}>
                                    <form onSubmit={handleCommentSubmit}>
                                        <textarea className={style.inputComment} type="text" name="comment" placeholder="Comment here" />
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
                <div className={style.rightSidebar}>
                    <ul>
                        <li>Category 4</li>
                        <li>Category 5</li>
                        <li>Category 6</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Homepage;