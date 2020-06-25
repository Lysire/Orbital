export const DELETE_EVENT = 'DELETE_EVENT';
export const CREATE_EVENT = 'CREATE_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';

export const deleteEvent = IDs => {
    return { type: DELETE_EVENT, IDs: IDs }; // pass in an array for multiple deletion
}

export const createEvent = title => {
    return {
        type: CREATE_EVENT,
        title: title
    }
}

export const updateEvent = (id, title) => {
    return {
        type: UPDATE_EVENT,
        ID: id,
        newTitle: title
    }
}