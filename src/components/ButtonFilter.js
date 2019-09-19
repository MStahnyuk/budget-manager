import React from 'react';
import {connect} from 'react-redux';
import { filter } from '../redux/actions/actions';

class ButtonFilter extends React.Component {
    render() {
        const { title, active, id} = this.props.button;
        return (
                <button className={'filterButton active-' + active} onClick={() => this.props.onClick(id)}>{title}</button>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        onClick: (value) => dispatch(filter(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonFilter);