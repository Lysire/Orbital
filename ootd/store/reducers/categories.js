import { CATEGORIES } from '../../data/dummy-data';
import { DELETE_CATEGORY, CREATE_CATEGORY, UPDATE_CATEGORY } from '../actions/categories';
import Category from '../../classes/category';

// initial state to use for categories
// TODO: Create another state for users
const initialState = {
    availableCategories: CATEGORIES,
    latestCatID: 'c4', // hardcode for now, generate using server later
}; 

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CATEGORY:
            const num = Number.parseInt(state.latestCatID.substr(1), 10) + 1;
            const newID = 'c' + num.toString();
            const newCategory = new Category(newID, action.title, '#851dfb');
            return {
                ...state,
                availableCategories: state.availableCategories.concat(newCategory),
                latestCatID: newID
            };
        case UPDATE_CATEGORY:
            const catIndex = state.availableCategories.findIndex(cat => cat.id === action.ID);
            const updatedCategory = new Category(action.catID, action.newTitle, '#851dfb');
            const updatedCategories = [...state.availableCategories];
            updatedCategories[catIndex] = updatedCategory;
            return {
                ...state,
                availableCategories: updatedCategories
            };
        case DELETE_CATEGORY:
            const num = Number.parseInt(state.latestCatID.substr(1), 10) + 100; 
            return {
                ...state,
                availableCategories: state.availableCategories.filter(
                    cat => action.IDs.indexOf(cat) < 0
                ),
                latestCatID: action.IDs.indexOf(latestCatID) < 0 ? 'c' + num.toString() : latestCatID
            };
    }
    return state;
};