export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

export const deleteCategory = IDs => {
    return { type: DELETE_CATEGORY, IDs: IDs }; // pass in an array for multiple deletion
}

export const createCategory = title => {
    return {
        type: CREATE_CATEGORY,
        title: title
    }
}

export const updateCategory = (id, title) => {
    return {
        type: UPDATE_CATEGORY,
        ID: id,
        newTitle: title
    }
}