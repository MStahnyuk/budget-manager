import React from 'react';
import {connect} from 'react-redux';
import { removeCategory, changeCategoryActive } from '../redux/actions/actions';
import ButtonEdit from './ButtonEdit';

class Category extends React.Component {
    render() {
        const {id, value, type} = this.props.item;
        return (
            <li className={"category " + this.props.active + type} onClick={() => this.props.onChangeCategoryActive(id)}>
                <div >{value}</div>
                <div className="buttons">
                    <ButtonEdit itemId={id} arrayEdit='categories' formId="formEditCategory"/>
                    <button onClick={() => this.props.onRemoveItem(id)}><i className="fa fa-times"></i></button>
                </div>
            </li>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        active: props.item.active ? 'active ' : '',
        state,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onRemoveItem: (id) => dispatch(removeCategory(id)),
        onChangeCategoryActive: (id) => dispatch(changeCategoryActive(id)),
    }
}


    
export default connect(mapStateToProps, mapDispatchToProps)(Category)