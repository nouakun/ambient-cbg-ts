## React Ambient Canvas Backgrounds

The main project [crnacura/AmbientCanvasBackgrounds](https://yuriylisovskiy.github.io/ambient-cbg).

I just re-implemented the components to make it support typescript and work with the latest reactjs.

---

git s

This module is React adaptation of [crnacura/AmbientCanvasBackgrounds](https://github.com/crnacura/AmbientCanvasBackgrounds) project with additional code refactoring and improvements.

Check the [example](https://yuriylisovskiy.github.io/ambient-cbg) web application.

### Installation
```bash
$ npm install ambient-cbg-ts
```

OR using yarn
```bash
$ yarn add ambient-cbg-ts
```

### Usage
Example:
```js
// App.js
import React, {Component} from 'react';
import './App.css';

import {Coalesce} from 'ambient-cbg'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Coalesce/>
                <h1>Hello, World!</h1>
            </div>
        );
    }
}

export default App;
```

### License
This project is licensed under the conditions of the MIT software license, see [LICENSE](LICENSE) file for more details.
