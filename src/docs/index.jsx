import React from 'react';
import { render } from 'react-dom';
import MyClass from './../lib/index';

import './styles.css';

function Demo() {
	return (
		<>
			<MyClass />
		</>
	);
}

render(<Demo />, document.getElementById('app'));
