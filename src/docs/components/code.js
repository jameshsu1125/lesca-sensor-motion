import HTMLReactParser from 'html-react-parser';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import './code.less';

const Code = ({ code, theme }) => {
	return (
		<pre>
			<code>{HTMLReactParser(Prism.highlight(code, Prism.languages[theme], theme))}</code>
		</pre>
	);
};

Code.defaultProps = {
	code: `import { useState } from 'react';`,
	theme: 'javascript',
};

export default Code;
