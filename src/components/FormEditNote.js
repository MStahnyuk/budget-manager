import React from 'react';
import { connect } from 'react-redux';
import Select from './Select';
import { addNote, changeIsEdit, openForm } from '../redux/actions/actions';
import Input from './Input';

class FormEditNote extends React.Component {
    render() {
        const { active, form, item, onCloseForm } = this.props;
        if (item) {
            return (
                <form className={"form " + active}>
                    <h2>Form Edit Note</h2>

                    <label>
                        Note Title:
                            <Input placeholder='Note name' 
                            fieldChange={'title'} value={item.title} itemId={item.id} arrayChange='notes' />
                    </label>

                    <label>
                        Note Value:
                            <Input placeholder='Note name' inputType='number'
                            fieldChange={'value'} value={item.value} itemId={item.id} arrayChange='notes' />
                    </label>

                    <label>
                        Note category:
                            <Select item={item} fieldChange='categoryId' arrayChange='notes' />
                    </label>
                    <button className="close"
                    onClick={(event) => onCloseForm(event, 'notes', this.props.item.id, form.id)}>
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
        item: state.notes.filter(item => item.edit)[0],
        state,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onCreateNote: (event, title, value, select) => {
            event.preventDefault();
            dispatch(addNote({ title, value, select }));
        },
        onCloseForm: (event, arrayEdit, itemId, formId) => {
            event.preventDefault();
            dispatch(changeIsEdit({ arrayEdit, id: itemId }));
            dispatch(openForm(formId));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormEditNote)