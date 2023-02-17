import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../constants/constants';
import Header from '../header/Header'
import style from './Category.module.css';
import addIcon from '../../assets/images/add.png'
import deleteIcon from '../../assets/images/delete.png'

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    try {
      async function fetchData() {
        const response = await axios.get(`${apiUrl}/category/showAll`)
        if (response.data.success) {
          console.log(response.data.categories)
          setCategories(response.data.categories);
          setSelectedCategory(response.data.categories[0])
        }
      }
      fetchData();
    } catch (error) {
      console.error(error.response.data.message);
    };
  }, []);

  return (
    <div className={style.wrapper}>
      <Header />
      <div className={style.body}>
        <div className={style.otherFunctionsWrapper}>
          <div className={style.otherFunctions}>Cái này để categories của các chức năng khác</div>
        </div>
        <div className={style.infomationWrapper}>
          <div className={style.information}>
            <div className={style.categoryName}>Specification</div>
            {selectedCategory && (
              <table>
                <tr>
                  <th>Title</th>
                  <td>{selectedCategory.Title}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{selectedCategory.Description}</td>
                </tr>
                <tr>
                  <th>Initiated Date</th>
                  <td>{selectedCategory.DateInnitiated}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{selectedCategory.Status}</td>
                </tr>
              </table>
            )}
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
            {
              Array.isArray(categories) ? categories.map((category, index) => {
                return <li key={index} onClick={() => setSelectedCategory(category)}>{category.Title}</li>
              }) : <h1>error</h1>
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Category;