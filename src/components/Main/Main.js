import React from 'react';
import {connect} from 'react-redux';
import Notes from '../Notes/Notes';

class Main extends React.Component {
    render() {
        return (
            <main>
                <div className="container">
                    <Notes/>
                </div>
            </main>
        )
    }
}

export default connect()(Main)