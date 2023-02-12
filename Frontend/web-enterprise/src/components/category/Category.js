import { useState } from 'react';
import style from './Category.module.css';
import logo from '../../assets/images/logo.jpg'
import notifyIcon from '../../assets/images/notify.png'
import dropdownIcon from '../../assets/images/dropdown.png'
import addIcon from '../../assets/images/add.png'
import deleteIcon from '../../assets/images/delete.png'

function Category() {
  const [key, setKey] = useState('search');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(key);
  }

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.logoAndName}>
          <div className={style.logoWrapper}>
            <img src={logo} className={style.logo} alt="logo" />
          </div>
          <div className={style.nameWrapper}>
            <div className={style.name}>Phú Trọng</div>
          </div>
        </div>

        <div className={style.searchWrapper}>
          <form onSubmit={handleSubmit}>
            <input type="text" className={style.search} value={key} onChange={(e) => setKey(e.target.value)} />
          </form>
        </div>
        <div className={style.notifyAndDropdown}>
          <button className={style.notify}><img src={notifyIcon} alt="notify" /></button>
          <button className={style.dropdown}><img src={dropdownIcon} alt="dropdown" /></button>
        </div>
      </div>
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
          <div>Other categories</div>
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