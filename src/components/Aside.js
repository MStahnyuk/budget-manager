import React from 'react';
import { connect } from 'react-redux';
import Categories from './Categories';
import Total from './Total';

class Aside extends React.Component {
    render() {
        return (
            <aside>
                <Categories />
                <Total notes={this.props.filterNotes} />
            </aside>
        )
    }
}

function getFilterNotes(notes, activeFilterButton) {
    if (activeFilterButton.id === 'all') return notes;
    return notes.filter(item => item.categoryType === activeFilterButton.id);
}

function mapStateToProps(state) {
    return {
        filterNotes: getFilterNotes(state.notes, state.switchPanel.buttonsFilter.filter(item => item.active)[0]),
    }
}

export default connect(mapStateToProps)(Aside)