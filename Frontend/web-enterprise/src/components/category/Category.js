import { useState } from 'react';
import style from './Category.module.css';
import addIcon from '../../assets/images/add.png'
import deleteIcon from '../../assets/images/delete.png'
import Nav from '../navigation/Nav'

function Category() {

  return (
    <div className={style.wrapper}>
      <Nav/>
      <div className={style.body}>
        <div className={style.otherFunctionsWrapper}>
          <div className={style.otherFunctions}>Cái này để categories của các chức năng khác</div>
        </div>
        <div className={style.infomationWrapper}>
          <div className={style.information}>
            <div className={style.categoryName}>Education</div>
            <table>
              <tr>
                <th>Content</th>
                <td>abcd</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>abcd</td>
              </tr>
              <tr>
                <th>Innitiated Date</th>
                <td>abcd</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>abcd</td>
              </tr>
            </table>
            <div className={style.actionsWrapper}>
              <button className={style.add}>
                <img src={addIcon} alt='add' />
                <div>ADD</div>
              </button>
              <button className={style.delete}>
                <img src={deleteIcon} alt='delete' />
                <div>DELETE</div>
              </button>
            </div>
          </div>
        </div>
        <div className={style.otherCategoriesWrapper}>
          <div className={style.label}>Other categories</div>
          <ul>
            <li>Game</li>
            <li>Love</li>
            <li>IT</li>
            <li>Crypto</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Category;