import React from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import { changeCategoryType, addCategory, openForm } from '../redux/actions/actions';

class FormAddCategory extends React.Component {
    render() {
        const { active, form, onRadioChange, onAddCategory, onCloseForm } = this.props;

        return (
            <form className={"form " + active}>
                <h2>Form Add Category</h2>
                <label>
                    Category name:
                    <Input placeholder='Category name' fieldChange={'valueInputTitle'} 
                    value={form.valueInputTitle} itemId={form.id} arrayChange='forms' />
                </label>

                <div className="label">Category type:</div>
                <div className="options">
                    <label className="label-radio">
                        <input name="type" type="radio" value="income"
                            checked={form.selectedOption === 'income'}
                            onChange={(event) => onRadioChange(event, 'forms', 'selectedOption', form.id)} />
                        <div className="checkboxText">Income</div>
                    </label>
                    <label className="label-radio">
                        <input name="type" type="radio" value="expenses"
                            checked={form.selectedOption !== 'income'}
                            onChange={(event) => onRadioChange(event, 'forms', 'selectedOption', form.id)} />
                        <div className="checkboxText">Expenses</div>
                    </label>
                </div>

                <button className="btn-add" 
                onClick={(event) => { onAddCategory(event, form.valueInputTitle, form.selectedOption, form.id) }}>
                    <i className="fa fa-plus"></i> Create Category
                </button>
                <button className="close" onClick={(event) => onCloseForm(event, form.id)}>
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
        onAddCategory: (event, title, selectedOption, formId) => {
            event.preventDefault();
            dispatch(addCategory({ title, selectedOption }));
            dispatch(openForm(formId));
        },
        onCloseForm: (event, formId) => {
            event.preventDefault();
            dispatch(openForm(formId))
        },
        onRadioChange: (event, arrayChange, fieldChange, itemId) => {
            dispatch(changeCategoryType({ arrayChange: arrayChange, newValue: event.target.value, fieldChange, itemId }))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAddCategory)