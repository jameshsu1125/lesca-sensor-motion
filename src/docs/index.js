import React, { useState, useEffect, useMemo } from 'react';
import Qrcode from 'lesca-react-qrcode';
import { render } from 'react-dom';
import Motion from '../lib/index';
import './styles.less';

function Demo() {
	const [state, setState] = useState(false);
	const [message, setMessage] = useState('waitting for permission...');

	const motion = useMemo(() => new Motion(), []);

	const require_permission = () => {
		motion.init(
			() => {
				// permission granted
				setMessage('permission granted');
				setState(true);
			},
			() => {
				// permission deined
				setMessage('permission deined');
			}
		);
	};

	const disable_switch = () => {
		motion.disable = !motion.disable;
		setMessage(motion.disable ? 'disable' : 'enable');
	};

	useEffect(() => {
		// require permission
		if (state) {
			motion.addlistener(20, (e) => {
				// shake your mobile device. alert the force directly.
				setMessage(`detect motion = ${e}`);
			});
		}
		return () => {
			motion.destory();
		};
	}, [state]);

	return (
		<>
			<div>
				<h1>install</h1>
				<p>npm install lesca-sensor-motion --save</p>
			</div>
			<div>
				<Qrcode content={window.location.href} size='300' />
				<p>test on your mobile device</p>
			</div>
			<div>
				<code>{message}</code>
				<button onClick={require_permission}>permission require</button>
			</div>
			{state && (
				<div>
					<button onClick={disable_switch}>permission disable switch</button>
				</div>
			)}
		</>
	);
}

render(<Demo />, document.getElementById('app'));
