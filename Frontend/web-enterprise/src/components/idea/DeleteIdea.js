import React, { useState} from "react";
import style from "./Delete.Module.css";

export default function DeleteIdea(){
    const [openModalDeleteIdea, setOpenDeleteIdea] = useState(false);

    return (
        <>
         <a className={style.btnDeleteIdea} href="#" type="button"  onClick={() => setOpenDeleteIdea(true)}>Delete Idea</a>
         {openModalDeleteIdea &&(
            <div className={style.modalDeleteIdea}>
                <div className={style.modalContentDeleteIdea}>    
                    <h2 className={style.containerDelete}>Delete Idea</h2>          
                    <p className={style.contextDeleteIdea}>Are you sure you want to delete your idea? This action cannot be undone.</p>
                    <button className={style.bntDeleteIdea}>Delete</button>
                    <button className={style.bntcancelIdea} onClick={() => setOpenDeleteIdea(false)}>Cancel</button>
                </div>
            </div>
         )}
            
        </>
    );
}






