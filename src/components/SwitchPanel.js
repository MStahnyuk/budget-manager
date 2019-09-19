import React from 'react';
import {connect} from 'react-redux';
import ButtonFilter from './ButtonFilter';

class SwichPanel extends React.Component {
    render() {
        const {buttonsFilter, view} = this.props;
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

export default connect(mapStateToProps)(SwichPanel);