import React from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import { changeCategoryType, changeIsEdit, openForm } from '../redux/actions/actions';

class FormEditCategory extends React.Component {
    render() {
        const { active, form, onRadioChange, item } = this.props;
        if (item) {
            return (
                <form className={"form " + active}>
                    <h2>Form Edit Category</h2>
                    <label>
                        Category name:
                        <Input placeholder='Category name' fieldChange={'value'} value={this.props.item.value} itemId={item.id} arrayChange='categories' />
                    </label>

                    <div className="radio-label">Category type:</div>
                    <div className="options">
                        <label className="label-radio">
                            <input name="type" type="radio" value="income"
                                checked={item.type === 'income'}
                                onChange={(event) => onRadioChange(event, 'categories', 'type', item.id)} />
                            <div className="checkboxText">Income</div>
                        </label>
                        <label className="label-radio">
                            <input name="type" type="radio" value="expenses"
                                checked={item.type !== 'income'}
                                onChange={(event) => onRadioChange(event, 'categories', 'type', item.id)} />
                            <div className="checkboxText">Expenses</div>
                        </label>
                    </div>

                    <button className="close" 
                    onClick={(event) => this.props.onCloseForm(event, 'categories', this.props.item.id, form.id)}>
                        <i className="fa fa-times"></i>
                    </button>
                </form>
            )
        }
        return null
    }
}

function mapStateToProps(state) {
    return {
        item: state.categories.filter(item => item.edit)[0],
        state,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onCloseForm: (event, arrayEdit, itemId, formId) => {
            event.preventDefault();
            dispatch(changeIsEdit({ arrayEdit, id: itemId }));
            dispatch(openForm(formId));
        },
        onRadioChange: (event, arrayChange, fieldChange, itemId) => {
            dispatch(changeCategoryType({ arrayChange: arrayChange, newValue: event.target.value, fieldChange, itemId }))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FormEditCategory)