// I know this goes against the DRY principle but this will be reworked
// at a later time. The working prototype has to be ready soon so.

import { EVENTS } from '../../data/dummy-data';
import { DELETE_EVENT, CREATE_EVENT, UPDATE_EVENT } from '../actions/event';
import Category from '../../classes/category';

// initial state to use for events
// TODO: Create another state for users
const initialState = {
    availableEvents: EVENTS,
    latestEvID: 'e1', // hardcode for now, generate using server later
}; 

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_EVENT:
            const num = Number.parseInt(state.latestCatID.substr(1), 10) + 1;
            const start = state.latestEvID.charAt(0);
            const newID = start + num.toString();
            const newCategory = new Category(newID, action.title, '#fb1d93');
            return {
                ...state,
                availableEvents: state.availableEvents.concat(newCategory),
                latestEvID: newID
            };
        case UPDATE_EVENT:
            const eventIndex = state.availableEvents.findIndex(cat => cat.id === action.ID);
            const updatedEvent = new Category(action.catID, action.newTitle, '#fb1d93');
            const updatedEvents = [...state.availableEvents];
            updatedEvents[eventIndex] = updatedEvent;
            return {
                ...state,
                availableEvents: updatedEvents
            };
        case DELETE_EVENT: // clothes IDs should only change on delete
            return {
                ...state,
                availableCategories: state.availableCategories.filter(
                    cat => cat.id !== action.latestCatID
                )
            };
    }
    return state;
};