[![dev by JamesHsu](https://img.shields.io/badge/Dev%20by-Jameshsu1125-green)](https://github.com/jameshsu1125/) [![made in Taiwan](https://img.shields.io/badge/Made%20in-Taiwan-orange)](https://github.com/jameshsu1125/)

# Installation

```sh
$ npm install lesca-sensor-motion --save
```

# Usage

```javascript
import Motion from 'lesca-sensor-motion';

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

<button onClick={require_permission}></button>;
```

# Methods

| method                       | options  |         description          | default |
| :--------------------------- | :------: | :--------------------------: | ------: |
| init(granted, deined)        | granted  | call when permission granted |         |
|                              |  deined  | call when permission deined  |         |
| addEvent( gravity, callback) | gravity  | exceeds the value of gravity |      20 |
|                              | callback | call when over gravity value |         |
| destory()                    |          |         remove event         |         |

# Properties

| Properties     |  type   |          description          | default |
| :------------- | :-----: | :---------------------------: | ------: |
| each_time      |   int   |    time of gravity update     |       1 |
| delay_callback |   int   | time delay of callback called |    1000 |
| disable        | boolean | stop / continue event listen  |    true |
| isSuppord      | boolean | permission granted or deined  |   false |
