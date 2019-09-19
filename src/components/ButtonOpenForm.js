import React from 'react';
import {connect} from 'react-redux';
import {openForm} from '../redux/actions/actions';

class ButtonAdd extends React.Component {
    render() {        
        const { formId, title } = this.props;

        return (
            <button className="btn-add" onClick={() => this.props.onOpenForm(formId)}><i className="fa fa-plus"></i> {title}</button>
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
        onOpenForm: (formId) => dispatch(openForm(formId)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ButtonAdd)