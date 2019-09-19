import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Section } from './components/Section/Section';
import Popup from './components/Popup/Popup';

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
