import React from 'react';
import { connect } from 'react-redux';
import { changeSelect } from '../redux/actions/actions';

class Select extends React.Component {
    render() {
        const { categories, item, onChangeSelect, arrayChange, fieldChange } = this.props;
        function getCategoryTypeById(categoryId) {
            return categories.filter(item => +item.id === +categoryId)[0].type;
        }
        return (
            <select value={item.categoryId} 
            onChange={(event) => 
            onChangeSelect(event, item.id, fieldChange, arrayChange, getCategoryTypeById(event.target.value))
            }>
                {categories.map(item => {
                    return (<option key={item.id} value={item.id}>{item.value}</option>)
                })}
            </select>
        )
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories,
        state,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeSelect: (event, id, fieldChange, arrayChange, categoryType) => 
            dispatch(changeSelect({ arrayChange, id, value: event.target.value, fieldChange, categoryType })),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Select)