import { useEffect } from 'react';
import HTMLReactParser from 'html-react-parser';
import Prism from 'prismjs';

import './components.less';
import 'prismjs/themes/prism.css';

const Navation = () => {
	useEffect(() => {}, []);
	return (
		<div className='Navation'>
			<div className='logo' />
		</div>
	);
};

const Code = ({ code, theme = 'javascript' }) => {
	return (
		<pre>
			<code>{HTMLReactParser(Prism.highlight(code, Prism.languages.javascript, theme))}</code>
		</pre>
	);
};
export { Navation, Code };
