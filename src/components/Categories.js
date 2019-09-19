import React from 'react';
import { connect } from 'react-redux';
import Category from './Category';
import ButtonOpenForm from './ButtonOpenForm';
import SwitchPanel from './SwitchPanel';

class Categories extends React.Component {
    render() {
        const { categories } = this.props;
        return (
            <React.Fragment>
                <h2>Categories</h2>
                <ButtonOpenForm title="Add Category" formId="formAddCategory" />
                <SwitchPanel />
                <ul className='categories'>
                    {categories.filter(item => item.display).map((item) => {
                        return <Category key={item.id} item={item} />
                    })}
                </ul>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    localStorage["categories"] = JSON.stringify(state.categories);
    return {
        categories: state.categories,
        state,
    }
}


export default connect(mapStateToProps)(Categories)