import { OPEN_FORM, CHANGE_INPUT, CHANGE_CATEGORY_TYPE, ADD_CATEGORY, REMOVE_CATEGORY, FILTER, CLOSE_FORM, CHANGE_CATEGORY_ACTIVE, REMOVE_NOTE, ADD_NOTE, CHANGE_IS_EDIT, CHANGE_SELECT } from "../actions/actionTypes";

// const ENTER_KEY = 'Enter';

let  initialState = {
    'categories': [
        { 'id': 0, 'value': 'Category 1', 'type': 'income',   'active': true,  'display': true, edit: false, },
        { 'id': 1, 'value': 'Category 2', 'type': 'expenses', 'active': false, 'display': true, edit: false, },
        { 'id': 2, 'value': 'Category 3', 'type': 'expenses', 'active': false, 'display': true, edit: false, },
    ],
    'forms': [
        { 'id': 'formAddCategory', 'valueInputTitle': '', 'selectedOption': 'income', 'active': false },
        { 'id': 'formAddNote', 'valueInputTitle': '', 'valueInputValue': '', categoryId: '', categoryType: 'income',  'active': false },
        { 'id': 'formEditCategory', 'active': false },
        { 'id': 'formEditNote', 'active': false },
    ],
    'notes': [
        { 'id': 0, 'title': 'Note category 2', 'value': 100, categoryId: '0', categoryType: 'income', edit: false, },
        { 'id': 1, 'title': 'Note category 2', 'value': 200, categoryId: '0', categoryType: 'income', edit: false, },
        { 'id': 2, 'title': 'Note category 1', 'value': 300, categoryId: '1', categoryType: 'expenses', edit: false, },
        { 'id': 3, 'title': 'Note category 1', 'value': 50, categoryId: '2', categoryType: 'expenses', edit: false, },
    ],
    'switchPanel': {
        'buttonsFilter': [
            { id: 'all', title: 'All', active: true, },
            { id: 'income', title: 'Income', active: false, },
            { id: 'expenses', title: 'Expenses', active: false, },
        ],
    },
    currency: '$',
};


function resetForm(forms, formId) {
    return forms.map(item => {
        if(item.id === formId) {
            if(item.valueInputTitle) item.valueInputTitle = '';
            if(item.selectedOption) item.selectedOption = 'income';
            if(item.valueInputValue) item.valueInputValue = '';
            if(item.categoryId) item.categoryId = '';
        };
        return item;
    });
}

function editObj(obj, field, value) {
    console.log('obj, field, value', obj, field, value);
    obj[field] = value;
    return obj;
}

function  editArray(array, id, fieldName, newFieldValue = '') {
    return array.slice().map(item => {
        let newValue = (newFieldValue) ? newFieldValue : !item[fieldName];
        if(item.id === id) editObj(item, fieldName, newValue);
        return item;
    });
}

function changeInput(array, id, fieldName, newFieldValue) {
    // console.log('changeInput-array:', array);
    // console.log('changeInput-id:', id);
    // console.log('changeInput-fieldName:', fieldName);
    // console.log('changeInput-newFieldValue:', newFieldValue);
    return array.slice().map(item => {        
        if(item.id === id) editObj(item, fieldName, newFieldValue);
        return item;
    });
}

function changeSelect(array, id, fieldName, newFieldValue, categoryType) {
    // console.log('changeInput-array:', array);
    // console.log('changeInput-id:', id);
    // console.log('changeInput-fieldName:', fieldName);
    // console.log('changeInput-newFieldValue:', newFieldValue);
    return array.slice().map(item => {        
        if(item.id === id) {
            editObj(item, fieldName, newFieldValue);
            editObj(item, 'categoryType', categoryType);
        }
        return item;
    });
}

function getNewId(list) {
    if(list.length){
        return +Math.max.apply(Math, list.map(function(item) { return item.id; })) + 1;
    }
    return 0;
}

function addCategory(list, value, type, active = false,  display = true) {
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

    // console.log('list, field', list, field);

    if(field === 'all') return newList;

    if (field === 'income') {
        return newList.map(item => {
            if (item.type !== 'income') item.display = false;
            return item;
        });
    } else {
        return newList.map(item => {
            if (item.type === 'income') item.display = false;
            return item;
        });
    }
}

function changeActive(buttonsFilter, activeId) {
    return buttonsFilter.slice().map(item => {
        (item.id === activeId) ? item.active = true : item.active = false;
        return item;
    })
}


export default function rootReducer(state = initialState, action) {
    switch(action.type) {
        case OPEN_FORM:
        case CLOSE_FORM:
            return {
                ...state,
                forms: editArray(state.forms, action.payload,  'active'),
            };

        case CHANGE_INPUT:
            return {
                ...state,
                [action.payload.arrayChange]:  changeInput(state[action.payload.arrayChange], action.payload.id,  action.payload.fieldChange, action.payload.value),
                
            };

        case CHANGE_SELECT:
            return {
                ...state,
                [action.payload.arrayChange]:  changeSelect(state[action.payload.arrayChange], action.payload.id,  action.payload.fieldChange, action.payload.value, action.payload.categoryType),
                
            };

        case CHANGE_CATEGORY_TYPE:
            console.log(action.payload.arrayChange);
            return {
                ...state,
                [action.payload.arrayChange]: editArray(state[action.payload.arrayChange], action.payload.itemId,  action.payload.fieldChange, action.payload.newValue),
            };

        case ADD_CATEGORY:
            return {
                ...state,
                categories: [
                    ...state.categories,
                    addCategory(state.categories, action.payload.title, action.payload.selectedOption),
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
                [action.payload.arrayEdit]:  editArray(state[action.payload.arrayEdit], action.payload.id, 'edit'),
                
            };
    
        


        
        default:
            return state;
    }
}