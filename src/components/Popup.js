import React from 'react';
import {connect} from 'react-redux';
import FormAddCategory from './FormAddCategory';
import FormAddNote from './FormAddNote';
import { closeForm } from '../redux/actions/actions';
import FormEditCategory from './FormEditCategory';
import FormEditNote from './FormEditNote';

class Popup extends React.Component {
    render() {
        const {activeForm, form} = this.props;
        let id = '';
        if(activeForm) id = activeForm.id;

        return (
            <div className={(activeForm) ? 'popup active ' : 'popup'}>         
                <div className="formWrapper">

                    <FormAddCategory form={form('formAddCategory')} 
                    active={(activeForm && activeForm.id === 'formAddCategory') ? 'active ': ''}/>

                    <FormAddNote form={form('formAddNote')} 
                    active={(activeForm && activeForm.id === 'formAddNote') ? 'active ': ''}/>

                    <FormEditCategory form={form('formEditCategory')} 
                    active={(activeForm && activeForm.id === 'formEditCategory') ? 'active ': ''}/> 

                    <FormEditNote form={form('formEditNote')} 
                    active={(activeForm && activeForm.id === 'formEditNote') ? 'active ': ''}/>

                </div>  
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeForm: state.forms.slice().filter(item => item.active)[0],
        form: (id) => state.forms.slice().filter(item => item.id === id)[0],
        state,
        
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onCloseForm: (formId) => dispatch(closeForm(formId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup)