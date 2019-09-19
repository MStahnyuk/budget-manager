import React from 'react';
import {connect} from 'react-redux';
import { changeInput } from '../redux/actions/actions';
import { validate } from '@babel/types';

class Input extends React.Component {
    render() {
        const {itemId, value, fieldChange, placeholder, arrayChange, inputType} = this.props;
        return (
            <input type="text" placeholder={placeholder} value={value} onChange={(event) => this.props.onChange(event, itemId, fieldChange, arrayChange, inputType)}/>
        )
    }
}

function validateInputNumber(value) {
    const regExp = /^\d+$/;
    if(value === '') return true;
    return regExp.test(value);
}

function mapStateToProps(state) {
    return {
        state,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChange: (event, id, fieldChange, arrayChange, inputType) => {
            if (inputType === 'number') {
                if(validateInputNumber(event.target.value)) dispatch(changeInput({arrayChange, id, value: +event.target.value, fieldChange}));
            } else {
                dispatch(changeInput({arrayChange, id, value: event.target.value, fieldChange}));
            }
        },
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Input)