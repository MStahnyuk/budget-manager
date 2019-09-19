import React from 'react';
import { connect } from 'react-redux';
import Note from '../Note/Note';
import ButtonOpenForm from '../ButtonOpenForm/ButtonOpenForm';
import Total from '../Total/Total';

class Notes extends React.Component {
    render() {
        const { notes, activeCategory } = this.props;
        if (activeCategory) {
            let notesActive = notes.filter(item => (+item.categoryId === +activeCategory.id));
            return (
                <React.Fragment>
                    <h2>Notes from category "{activeCategory.value}" ({activeCategory.type})</h2>
                    <ButtonOpenForm title="Add Note" formId="formAddNote" />
                    <ul className='notes'>
                        {notesActive.map((item) => {
                            return <Note key={item.id} item={item} />
                        })}
                    </ul>
                    <Total notes={notesActive} />
                </React.Fragment>
            )
        }

        return (
            <div className="warning">Select a category to continue</div>
        )
    }
}

function mapStateToProps(state) {
    localStorage["notes"] = JSON.stringify(state.notes);
    return {
        activeCategory: state.categories.slice().filter(item => item.active)[0],
        notes: state.notes,
        currency: state.currency,
        state,
    }
}

export default connect(mapStateToProps)(Notes)