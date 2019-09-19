import {
    OPEN_FORM, CHANGE_INPUT, CHANGE_CATEGORY_TYPE, ADD_CATEGORY,
    REMOVE_CATEGORY, FILTER, CLOSE_FORM, CHANGE_CATEGORY_ACTIVE,
    REMOVE_NOTE, ADD_NOTE, CHANGE_IS_EDIT, CHANGE_SELECT
} from "../actions/actionTypes";

const categories = JSON.parse(localStorage.getItem("categories"))
    ? JSON.parse(localStorage.getItem("categories"))
    : [];

const notes = JSON.parse(localStorage.getItem("notes"))
    ? JSON.parse(localStorage.getItem("notes"))
    : [];

const initialState = {
    categories,
    forms: [
        { id: 'formAddCategory', valueInputTitle: '', selectedOption: 'income', active: false },
        { id: 'formAddNote', valueInputTitle: '', valueInputValue: '', categoryId: '', categoryType: 'income', active: false },
        { id: 'formEditCategory', active: false },
        { id: 'formEditNote', active: false },
    ],
    notes,
    switchPanel: {
        buttonsFilter: [
            { id: 'all', title: 'All', active: true, },
            { id: 'income', title: 'Income', active: false, },
            { id: 'expenses', title: 'Expenses', active: false, },
        ],
    },
    currency: '$',
};

function editObj(obj, field, value) {
    obj[field] = value;
    return obj;
}

function editArray(array, id, fieldName, newFieldValue = '') {
    return array.slice().map(item => {
        let newValue = (newFieldValue) ? newFieldValue : !item[fieldName];
        if (item.id === id) editObj(item, fieldName, newValue);
        return item;
    });
}

function changeInput(array, id, fieldName, newFieldValue) {
    return array.slice().map(item => {
        if (item.id === id) editObj(item, fieldName, newFieldValue);
        return item;
    });
}

function changeSelect(array, id, fieldName, newFieldValue, categoryType) {
    return array.slice().map(item => {
        if (item.id === id) {
            editObj(item, fieldName, newFieldValue);
            editObj(item, 'categoryType', categoryType);
        }
        return item;
    });
}

function getNewId(list) {
    if (list.length) {
        return +Math.max.apply(Math, list.map(function (item) { return item.id; })) + 1;
    }
    return 0;
}

function addCategory(list, value, type, active = false, display = true) {
    return {
        id: getNewId(list),
        value,
        type,
        active,
        display,
    }
}

function addNote(list, newItem) {
    return {
        id: getNewId(list),
        title: newItem.title,
        categoryType: newItem.categoryType,
        value: +newItem.value,
        categoryId: newItem.select,
    }
}

function removeItem(list, itemId) {
    return list.slice().filter(item => item.id !== itemId);
}

function filter(list, field) {
    let newList = list.slice().map(item => {
        item.display = true;
        return item;
    });

    if (field === 'all') return newList;

    return newList.map(item => {
        (item.type === field) ? item.display = true : item.display = false;
        return item;
    });
}

function resetForm(forms, formId) {
    return forms.map(item => {
        if (item.id === formId) {
            if (item.valueInputTitle) item.valueInputTitle = '';
            if (item.selectedOption) item.selectedOption = 'income';
            if (item.valueInputValue) item.valueInputValue = '';
            if (item.categoryId) item.categoryId = '';
        };
        return item;
    });
}

function changeActive(buttonsFilter, activeId) {
    return buttonsFilter.slice().map(item => {
        (item.id === activeId) ? item.active = true : item.active = false;
        return item;
    })
}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_FORM:
        case CLOSE_FORM:
            return {
                ...state,
                forms: editArray(state.forms, action.payload, 'active'),
            };

        case CHANGE_INPUT:
            return {
                ...state,
                [action.payload.arrayChange]:
                    changeInput(
                        state[action.payload.arrayChange],
                        action.payload.id,
                        action.payload.fieldChange,
                        action.payload.value),

            };

        case CHANGE_SELECT:
            return {
                ...state,
                [action.payload.arrayChange]:
                    changeSelect(
                        state[action.payload.arrayChange],
                        action.payload.id, action.payload.fieldChange,
                        action.payload.value,
                        action.payload.categoryType),

            };

        case CHANGE_CATEGORY_TYPE:
            return {
                ...state,
                [action.payload.arrayChange]: 
                    editArray(
                        state[action.payload.arrayChange], 
                        action.payload.itemId, 
                        action.payload.fieldChange, 
                        action.payload.newValue),
            };

        case ADD_CATEGORY:
            return {
                ...state,
                categories: [
                    ...state.categories,
                    addCategory(
                        state.categories, 
                        action.payload.title, 
                        action.payload.selectedOption),
                ],
                forms: resetForm(state.forms.slice(), 'formAddCategory'),
            };

        case REMOVE_CATEGORY:
            return {
                ...state,
                categories: removeItem(state.categories, action.payload),
                notes: state.notes.slice().filter(item => +item.categoryId !== +action.payload),
            };

        case FILTER: {
            return {
                ...state,
                categories: filter(state.categories, action.payload),
                switchPanel: {
                    buttonsFilter: changeActive(state.switchPanel.buttonsFilter, action.payload),
                }
            }
        }

        case CHANGE_CATEGORY_ACTIVE: {
            return {
                ...state,
                categories: changeActive(state.categories, action.payload),
            }
        }

        case REMOVE_NOTE:
            return {
                ...state,
                notes: removeItem(state.notes, action.payload),
            };

        case ADD_NOTE:
            return {
                ...state,
                notes: [
                    ...state.notes,
                    addNote(state.notes, action.payload),
                ],
                forms: resetForm(state.forms.slice(), 'formAddNote'),
            };

        case CHANGE_IS_EDIT:
            return {
                ...state,
                [action.payload.arrayEdit]: 
                    editArray(
                        state[action.payload.arrayEdit], 
                        action.payload.id, 
                        'edit'),
            };

        default:
            return state;
    }
}