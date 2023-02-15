import React, { useState } from "react";
import Header from '../header/Header'
import "./Homepage.css";

function Homepage() {

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [comments, setComments] = useState([]);

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

    return (
        <div>
            <Header />
            <div className="container">
                <div className="left-sidebar">
                    <ul>
                        <li>Home</li>
                        <li>Category 2</li>
                        <li>Category 3</li>
                    </ul>
                </div>
                <div className="middle-section">
                    <h2>Posts</h2>
                    <ul>
                        <li className="arial-label">
                            <img src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/279124471_1370043140139558_7697343296375162295_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Aa58ZvsOtyQAX-xk8VM&tn=XxsEV1fe8eY9p6hm&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDn_60rxz8p9jtoQpQwPwCq2XiC5kVvUBauvK4Lxcn4Yw&oe=63ED11D5" alt="avatar" class="avatar" />
                            <input type="text" name="comment" className="input-text" placeholder="Input nội dung"/>
                        </li>
                        <li>
                            
                        </li>
                        <div className="line">
                        </div>
                    </ul>
                    <ul>
                        <li className="text-input">
                            In the above code, the import keywords are used to import the Apple() and Windows() functions, exported by the "America.js" file.
                            Also, we need to wrap the functions or values inside the curly braces { } and must have to put the same name as defined from where they
                            are being exported. That’s why these imports are called Named export. We can not change the name of the imported bindings aka (Functions/Values/Classes).
                            But also we can import multiple bindings into a single line of code, separated by commas(, )
                            <div className="like-dislike">
                                <div className="interaction-buttons">
                                    <button onClick={handleLikeClick} className="like"><i class="fa fa-thumbs-up"></i></button>
                                    <button onClick={handleDislikeClick} className="dislike"><i class="fa fa-thumbs-down"></i></button>
                                </div>
                                <div className="comment-section">
                                    <form onSubmit={handleCommentSubmit}>
                                        <input type="text" name="comment" placeholder="Comment here" />
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
                <div className="right-sidebar">
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