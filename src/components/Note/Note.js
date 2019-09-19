import React from 'react';
import { connect } from 'react-redux';
import { removeNote } from '../../redux/actions/actions';
import ButtonEdit from '../ButtonEdit/ButtonEdit';
import './Note.scss';

class Note extends React.Component {
    render() {
        const { id, title, value, categoryType } = this.props.item;
        return (
            <li className={"note"}>
                <div className={"note-value " + categoryType}>
                    ( <span className={"cost " + categoryType}>{value + this.props.currency}</span> ) {title}
                </div>
                <div className="buttons">
                    <ButtonEdit itemId={id} arrayEdit='notes' formId="formEditNote" />
                    {<button onClick={() => this.props.onRemoveItem(id)}><i className="fa fa-times"></i></button>}
                </div>
            </li>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        currency: state.currency,
        state,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onRemoveItem: (id) => dispatch(removeNote(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)