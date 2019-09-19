import React from 'react';
import {connect} from 'react-redux';
import ButtonFilter from './ButtonFilter';
import { deleteCompleted } from '../redux/actions/actions';

class SwichPanel extends React.Component {
    render() {
        const {itemsLeft, buttonsFilter, disabled, view, total} = this.props;
        return (
            <div className={"switchPanel view-" + view}>
                <div className="buttons">
                    {buttonsFilter.map(button => <ButtonFilter key={button.id} button={button}/>)}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        buttonsFilter: state.switchPanel.buttonsFilter,
        state,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwichPanel);