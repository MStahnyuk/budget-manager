import React from 'react';
import { connect } from 'react-redux';
import './Total.scss';

class Total extends React.Component {
    render() {
        const { total, currency } = this.props;
        const type = (total >= 0) ? 'income' : 'expenses';
        return (
            <div className="total">
                Total: <span className={'cost ' + type}>{Math.abs(total)}{currency}</span>
            </div>
        )
    }
}

function getTotal(notes) {
    return notes.reduce((sum, current) => {
        if (current.categoryType === 'income') return sum + current.value;
        return sum - current.value;
    }, 0);
}

function mapStateToProps(state, props) {
    return {
        total: getTotal(props.notes),
        currency: state.currency,
        state,
    }
}

export default connect(mapStateToProps)(Total);