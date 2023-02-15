export const categoryReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case 'CATEGORIES_LOADED_SUCCESS':
            return {
                ...state, categories: payload, categoriesLoading: false
            }
        default:
            return state
    }
}