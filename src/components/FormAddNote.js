import React from 'react';
import {connect} from 'react-redux';
import Select from './Select';
import { addNote, openForm } from '../redux/actions/actions';
import Input from './Input';

class FormAddNote extends React.Component {
    render() {
        const {active, form,  onCreateNote, onCloseForm } = this.props;

        return (
            <form className={"form " + active}>
                <h2>Form Add Note</h2>
                <label>
                    Title:
                    <Input placeholder='Note name' fieldChange={'valueInputTitle'} value={form.valueInputTitle} itemId={form.id} arrayChange='forms' />
                
                </label>

                <label>
                    Value:
                    <Input placeholder='Note value' inputType='number' fieldChange={'valueInputValue'} value={form.valueInputValue} itemId={form.id} arrayChange='forms'/>
                
                </label>

               
                <label>
                    Category:                
                    <Select item={form} arrayChange='forms' fieldChange='categoryId'/>
                </label>
                <button className="btn-add" onClick={(event) => onCreateNote(event, form.valueInputTitle, form.valueInputValue, form.categoryId, form.categoryType, form.id,)}>
                    <i className="fa fa-plus"></i> Create Note
                </button>
                <button  className="close" onClick={(event)=> onCloseForm(event, form.id)}>
                    <i className="fa fa-times"></i>
                </button> 
            </form>
            
        )
    }
}

function mapStateToProps(state) {
    return {
        state,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onCreateNote: (event, title, value, select, categoryType, formId) => {
            event.preventDefault();
            dispatch(addNote({title, value, select, categoryType}));
            dispatch(openForm(formId));
        },
        onCloseForm: (event, formId) => {
            event.preventDefault();
            dispatch(openForm(formId))
        },
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(FormAddNote)