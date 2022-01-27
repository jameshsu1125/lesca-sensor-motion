[![dev by JamesHsu](https://img.shields.io/badge/Dev%20by-Jameshsu1125-green)](https://github.com/jameshsu1125/) [![made in Taiwan](https://img.shields.io/badge/Made%20in-Taiwan-orange)](https://github.com/jameshsu1125/) [![npm](https://img.shields.io/badge/npm-Jameshsu1125-red)](https://www.npmjs.com/~jameshsu1125)

# Installation

```sh
npm install lesca-sensor-motion --save
```

# Demo

[Live Demo](https://jameshsu1125.github.io/lesca-sensor-motion/)

# Usage

```javascript
import { useState, useEffect, useMemo } from 'react';
import Motion from 'lesca-sensor-motion';

// (1) waiting for permission => Must be user-triggered event and SSL required
// (2) add addListener
const Components = () => {
	const [state, setState] = useState(false);
	const motion = useMemo(() => new Motion(), []);

	const require_permission = () => {
		motion
			.permission()
			.then(() => {
				// permission granted
				setState(true);
			})
			.catch(() => {
				// permission deined
			});
	};

	useEffect(() => {
		if (state) {
			motion.addListener(20, (e) => {
				alert(e);
			});
		}
		return () => {
			motion.destory();
		};
	}, [state]);

	return <button onClick={require_permission}></button>;
};
```

# Methods

| method                        | options  |         description          | default |
| :---------------------------- | :------: | :--------------------------: | ------: |
| init(granted, deined)         | granted  | call when permission granted |         |
|                               |  deined  | call when permission deined  |         |
| addListener( force, callback) |  force   |  exceeds the value of force  |      20 |
|                               | callback | call when over gravity value |         |
| destory()                     |          |        destory event         |         |

# Properties

| Properties |  type   |          description          | default |
| :--------- | :-----: | :---------------------------: | ------: |
| each       |   int   |     time of force update      |       1 |
| delay      |   int   | time delay of callback called |    1000 |
| disable    | boolean | stop / continue event listen  |    true |
| isSuppord  | boolean | permission granted or deined  |   false |
