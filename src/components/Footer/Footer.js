import React from 'react';
import { connect } from 'react-redux';
import './Footer.scss';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="container">
                    <p>Сontrol your income and expenses</p>
                    <p>Created by <a href="https://github.com/MStahnyuk" target="_blank" rel="noopener noreferrer">MStahnyuk</a></p>
                </div>
            </footer>
        )
    }
}

export default connect()(Footer)