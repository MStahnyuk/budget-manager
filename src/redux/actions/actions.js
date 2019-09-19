import { OPEN_FORM, CHANGE_INPUT, CHANGE_CATEGORY_TYPE, ADD_CATEGORY, REMOVE_CATEGORY, FILTER, CLOSE_FORM, CHANGE_CATEGORY_ACTIVE, REMOVE_NOTE, ADD_NOTE, CHANGE_SELECT, CHANGE_IS_EDIT } from "./actionTypes";

export function openForm(formValue) {
    return {
        type: OPEN_FORM,
        payload: formValue,
    }
}

export function closeForm(formValue) {
    return {
        type: CLOSE_FORM,
        payload: formValue,
    }
}

export function changeInput(formValue) {
    return {
        type: CHANGE_INPUT,
        payload: formValue,
    }
}

export function changeCategoryType(object) {
    return {
        type: CHANGE_CATEGORY_TYPE,
        payload: object,
    }
}

export function addCategory(value) {
    return {
        type: ADD_CATEGORY,
        payload: value,
    }
}

export function removeCategory(categoryId) {
    return {
        type: REMOVE_CATEGORY,
        payload: categoryId,
    }
}

export function filter(field) {
    return {
        type: FILTER,
        payload: field,
    }
}

export function changeCategoryActive(categoryId) {
    return {
        type: CHANGE_CATEGORY_ACTIVE,
        payload: categoryId,
    }
}

export function removeNote(noteId) {
    return {
        type: REMOVE_NOTE,
        payload: noteId,
    }
}

export function addNote(newNote) {
    return {
        type: ADD_NOTE,
        payload: newNote,
    }
}

export function changeSelect(object) {
    return {
        type: CHANGE_SELECT,
        payload: object,
    }
}

export function changeIsEdit(value) {
    return {
        type: CHANGE_IS_EDIT,
        payload: value,
    }
}

