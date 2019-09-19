import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="container">
                    <h1>Budget Manager</h1>
                </div>
            </header>
        )
    }
}


export default connect()(Header)