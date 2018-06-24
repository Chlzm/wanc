export const SET_TITLE = 'SET_TITLE'

//
export const setTitle = data => {
    document.title = data;
    return {
        type: SET_TITLE,
        data
    }
}