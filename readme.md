[![dev by JamesHsu](https://img.shields.io/badge/Dev%20by-Jameshsu1125-green)](https://github.com/jameshsu1125/) [![made in Taiwan](https://img.shields.io/badge/Made%20in-Taiwan-orange)](https://github.com/jameshsu1125/)

# Installation

```sh
$ npm install lesca-sensor-motion --save
```

# Usage

```javascript
import Motion from 'lesca-sensor-motion';

clicked();
{
	Motion.init(() => {
		// IOS 14+ require permission
		Motion.addEvent(20, (e) => {
			// add Event to get gravity
			alert(e);
		});
	});
}

<button onClick={this.clicked}></button>;
```

# Methods

| Methods                  |             options              | default |
| :----------------------- | :------------------------------: | ------: |
| init(callback)           | callback when permission granted |         |
| addEvent( v=20,callback) |   v: power of Motion, callback   |  v = 20 |
| destory()                |          remove events           |         |
| disable(true)            |         .disable = true          |    true |
