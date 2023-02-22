import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../constants/constants';
import Header from '../header/Header'
import style from './Category.module.css';

const Category = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [addCategoryForm, setAddCategoryForm] = useState({
    Title: '',
    Description: '',
    DateInnitiated: new Date().toISOString(),
    Status: ''
  });

  const [editingCategory, setEditingCategory] = useState({
    _id: '',
    editingTitle: '',
    editingDescription: '',
    editingDateInnitiated: null,
    editingStatus: ''
  });

  const { Title, Description, DateInnitiated, Status } = addCategoryForm;
  const { _id, editingTitle, editingDescription, editingDateInnitiated, editingStatus } = editingCategory;

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(`${apiUrl}/category/showAll`)
        if (response.data.success) {
          console.log(response.data.categories);
          setCategories(response.data.categories);
          setSelectedCategory(response.data.categories[0]);
          setEditingCategory(response.data.categories[0]);
        }
      })();
    } catch (error) {
      console.error(error.response.data.message);
    };
  }, []);

  const onChangeAddCategoryForm = event => {
    setAddCategoryForm({ ...addCategoryForm, [event.target.name]: event.target.value });
  }

  const onChangeEditCategoryForm = event => {
    setEditingCategory({ ...editingCategory, [event.target.name]: event.target.value })
  }

  const addCategory = event => {
    event.preventDefault();
    setShowAddModal(false);
    (async () => {
      try {
        const response = await axios.post(`${apiUrl}/category/newCategory`, addCategoryForm);
        if (response.data.success) {
          console.log(response.data);
          const date = new Date(response.data.category.DateInnitiated);
          response.data.category.DateInnitiated = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
          setCategories([...categories, response.data.category]);
          setAddCategoryForm({
            Title: '',
            Description: '',
            Status: ''
          })
        }
      } catch (error) {
        console.log(error.response.data)
      }
    }
    )();
  }

  const getEditingCategory = event => {
    event.preventDefault();
    setShowEditModal(true);
    console.log(selectedCategory);
    setEditingCategory({
      _id: selectedCategory._id,
      editingTitle: selectedCategory.Title,
      editingDescription: selectedCategory.Description,
      editingDateInnitiated: selectedCategory.DateInnitiated,
      editingStatus: selectedCategory.Status
    });
  }

  const editCategory = event => {
    event.preventDefault();
    setShowEditModal(false);
    (async () => {
      try {
        const response = await axios.put(`${apiUrl}/category/update/${editingCategory._id}`, { _id: _id, Title: editingTitle, Description: editingDescription, DateInnitiated: editingDateInnitiated, Status: editingStatus });
        if (response.data.success) {
          console.log(response.data);
          setSelectedCategory(response.data.category);
          const newCategories = categories.map(category => {
            if (category._id === response.data.category._id) {
              return response.data.category
            }
            return category
          })
          setCategories(newCategories);
        }
      } catch (error) {
        console.error(error.response.data);
      }
    })();
  }

  const deleteCategory = event => {
    event.preventDefault();
    (async () => {
      try {
        const response = await axios.delete(`${apiUrl}/category/delete/${selectedCategory._id}`);
        if (response.data.success) {
          const filteredCategories = categories.filter(
            (category) => category._id !== selectedCategory._id
          );
          setCategories(filteredCategories);
          setSelectedCategory(filteredCategories[0]);
        }
      } catch (error) {
        console.error(error.response.data);
      }
    })();
  }

  return (
    <div className={style.categoryWrapper}>
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
                <tbody>
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
                </tbody>
              </table>
            )}
            <div className={style.actionsWrapper}>
              <button className={style.edit} onClick={getEditingCategory}>
                <div>EDIT</div>
              </button>
              <button className={style.delete} onClick={deleteCategory}>
                <div>DELETE</div>
              </button>
              <button className={style.add} onClick={() => setShowAddModal(true)}>
                <div>ADD</div>
              </button>
            </div>
          </div>
        </div>
        <div className={style.otherCategoriesWrapper}>
          <div className={style.label}>Other categories</div>
          <ul>
            {
              Array.isArray(categories) ? categories.map((category, index) => {
                const date = new Date(category.DateInnitiated);
                category.DateInnitiated = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                return <li key={index} onClick={() => setSelectedCategory(category)}>{category.Title}</li>
              }) : <h1>error</h1>
            }
          </ul>
        </div>
      </div>

      {showAddModal && (
        <div className={style.categoryModal}>
          <div className={style.categoryModalContent}>
            <span className={style.categoryClose} onClick={() => setShowAddModal(false)}>
              &times;
            </span>
            <h1>Add Category</h1>
            <form onSubmit={addCategory}>
              <input type='text' name='Title' placeholder='Title' required value={Title} onChange={onChangeAddCategoryForm} />
              <input type='text' name='Description' placeholder='Description' required value={Description} onChange={onChangeAddCategoryForm} />
              <input type='hidden' name='DateInnitiated' value={DateInnitiated} />
              <input type='text' name='Status' placeholder='Status' required value={Status} onChange={onChangeAddCategoryForm} />
              <input type='submit' value='Add' />
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className={style.categoryModal}>
          <div className={style.categoryModalContent}>
            <span className={style.categoryClose} onClick={() => setShowEditModal(false)}>
              &times;
            </span>
            <h1>Update</h1>
            <form onSubmit={editCategory}>
              <input type='hidden' name='_id' value={_id} />
              <input type='text' name='editingTitle' placeholder='Title' required value={editingTitle} onChange={onChangeEditCategoryForm} />
              <input type='text' name='editingDescription' placeholder='Description' required value={editingDescription} onChange={onChangeEditCategoryForm} />
              <input type='hidden' name='editingDateInnitiated' value={editingDateInnitiated} />
              <input type='text' name='editingStatus' placeholder='Status' required value={editingStatus} onChange={onChangeEditCategoryForm} />
              <input type='submit' value='Save' />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;