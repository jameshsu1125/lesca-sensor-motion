[![NPM](https://img.shields.io/badge/NPM-ba443f?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/) [![React](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/) [![React](https://img.shields.io/badge/-ReactJs-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://zh-hant.reactjs.org/) [![React](https://img.shields.io/badge/Less-1d365d?style=for-the-badge&logo=less&logoColor=white)](https://lesscss.org/) [![React](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://www.w3schools.com/html/) [![React](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3schools.com/css/) [![NPM](https://img.shields.io/badge/DEV-Jameshsu1125-9cf?style=for-the-badge)](https://www.npmjs.com/~jameshsu1125)

# Why use it?

collect `device-motion` to a useful value. Include user permission and event listener.

#### [Live Demo](https://jameshsu1125.github.io/lesca-sensor-motion/)

# Installation

```sh
npm install lesca-sensor-motion --save
```

## Usage

As a Node module:

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
			motion.addEventListener(20, (e) => {
				alert(e);
			});
		}
		return () => {
			motion.destory();
		};
	}, [state]);

	return <button onClick={require_permission}>click me</button>;
};
```

## Development

### Methods

| method | description | return |
| :-- | :-: | --: |
| .permission() | require user permission | [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) |
| .addEventListener(`force`:_number_, `handler`:_function_) | exceeds the value of force | 20 |
| .destory() | destory event | void |

### Properties

| Properties           |          description          | default |
| :------------------- | :---------------------------: | ------: |
| .each: _int_         |     time of force update      |       1 |
| .delay:_int_         | time delay of callback called |    1000 |
| .disable:_boolean_   | stop / continue event listen  |    true |
| .isSuppord:_boolean_ | permission granted or deined  |   false |

### Features

- maintain if necessary
