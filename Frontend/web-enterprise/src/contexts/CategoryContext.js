import { createContext, useReducer } from "react"
import {categoryReducer} from '../reducers/categoryReducer'
import {apiUrl} from './constants'
import axios from 'axios'

export const CategoryContext = createContext()

const CategoryContextProvider = ({children}) => {
    //state
    const [categoryState, dispatch] = useReducer(categoryReducer, {
        categories: [],
        categoriesLoading: true
    })

    //get all categories
    const getCategories = async () => {
        try {
            const response = await axios.get(`${apiUrl}/category`)
            if (response.data.success) {
                dispatch({type: 'CATEGORIES_LOADED_SUCCESS', payload: response.data.categories})
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: 'Server error'}
        }
    }

    //category context data
    const categoryContextData = (categoryState, getCategories)

    return (
        <CategoryContext.Provider value={categoryContextData}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider