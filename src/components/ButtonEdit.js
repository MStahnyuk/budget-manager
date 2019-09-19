import React from 'react';
import {connect} from 'react-redux';
import {openForm, changeIsEdit} from '../redux/actions/actions';

class ButtonEdit extends React.Component {
    render() {        
        const { arrayEdit, itemId, formId } = this.props;

        return (
            <button onClick={() => this.props.editItem(arrayEdit, itemId, formId)}><i className="fa fa-edit"></i></button>
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
        editItem: (arrayEdit, itemId, formId) => {
            dispatch(changeIsEdit({arrayEdit, id: itemId}));
            dispatch(openForm(formId));
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ButtonEdit)