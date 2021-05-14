[![dev by JamesHsu](https://img.shields.io/badge/Dev%20by-Jameshsu1125-green)](https://github.com/jameshsu1125/) [![made in Taiwan](https://img.shields.io/badge/Made%20in-Taiwan-orange)](https://github.com/jameshsu1125/)

# Installation

```sh
$ npm install lesca-sensor-motion --save
```

# Usage

```javascript
import Motion from 'lesca-sensor-motion';

const motion = new Motion();
function require_permission() {
	motion.init(
		function () {
			console.log('permission granted');

			// todo: add event after get permission.
			motion.addlistener(20, (e) => {
				// shake your mobile device. alert the gravity directly.
				alert(e);
			});
		},
		function () {
			motion.log('permission deined');
		}
	);
}

<button onClick={require_permission}></button>;
```

# Methods

| method                        | options  |         description          | default |
| :---------------------------- | :------: | :--------------------------: | ------: |
| init(granted, deined)         | granted  | call when permission granted |         |
|                               |  deined  | call when permission deined  |  void 0 |
| addlistener( force, callback) |  force   |  exceeds the value of force  |      20 |
|                               | callback | call when over gravity value |         |
| destory()                     |          |         remove event         |         |

# Properties

| Properties |  type   |          description          | default |
| :--------- | :-----: | :---------------------------: | ------: |
| each       |   int   |     time of force update      |       1 |
| delay      |   int   | time delay of callback called |    1000 |
| disable    | boolean | stop / continue event listen  |    true |
| isSuppord  | boolean | permission granted or deined  |   false |
