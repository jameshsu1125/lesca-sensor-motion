import React from 'react';
import { render } from 'react-dom';
import Motion from './../lib/index';

import './styles.css';

function require_permission() {
	Motion.init(
		function () {
			// permission granted
			console.log('permission granted');

			Motion.addEvent(20, (e) => {
				// shake your mobile device. alert the gravity directly.
				alert(e);
			});
		},
		function () {
			// permission deined
			console.log('permission deined');
		}
	);
}

function disable_switch() {
	Motion.disable = !Motion.disable;
}

function Demo() {
	return (
		<>
			<button onClick={require_permission}>permission require</button>
			<button onClick={disable_switch}>permission disable switch</button>
		</>
	);
}

render(<Demo />, document.getElementById('app'));
