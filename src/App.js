import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Section } from './components/Section';
import Popup from './components/Popup';

function App() {
return    (
		<React.Fragment>
		    <Header/>
			<Section/>
            <Footer/>
            <Popup/>
		</React.Fragment>

	);
}


export default App;
