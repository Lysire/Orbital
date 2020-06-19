import { CATEGORIES } from '../../data/dummy-data';

// initial state to use for categories
const initialState = {
    availableCategories: CATEGORIES
}; 

export default (state = initialState, action) => {
    return state;
};