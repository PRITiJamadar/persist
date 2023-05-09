//import { Action } from "redux";
export function setTheme(theme) {
    return { type: 'SET_THEME', payload: theme };
}

export function setPage(page) {
    return { type: 'SET_PAGE', payload: page };
}

export function setData(data) { return { type: 'SET_DATA', payload: data }; }

//export default Action;