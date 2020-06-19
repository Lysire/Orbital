import { EVENTS } from '../../data/dummy-data';

// initial state to use for categories
const initialState = {
    availableEvents: EVENTS
}; 

export default (state = initialState, action) => {
    return state;
};