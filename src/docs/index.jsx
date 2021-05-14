import React from 'react';
import { render } from 'react-dom';
import Motion from './../lib/index';
import './styles.css';

const motion = new Motion();

function require_permission() {
	motion.init(
		function () {
			// permission granted
			console.log('permission granted');

			motion.addlistener(20, (e) => {
				// shake your mobile device. alert the force directly.
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
	motion.disable = !motion.disable;
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
