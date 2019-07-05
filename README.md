# vue-random-text
ランダムテキストとその使用例を実装した。

[DEMO](https://tktr90755.github.io/vue-random-text/) 

## Usage
```js
import TypewriterEvent from '@/assets/js/libs/tk90755/events/TypewriterEvent.js'
import Typewriter from '@/assets/js/libs/tk90755/display/animations/Typewriter.js'

let typewriter = new Typewriter(this.text, this.kind)
let onInit =()=>{
    this.myText = typewriter.currentText;
    console.log("onInit: " + typewriter.currentText);
}
let onUpdate =()=>{
    this.myText = typewriter.currentText;
    console.log("onUpdate: " + typewriter.currentText);
}
let onComplete =()=>{
    this.myText = typewriter.currentText;
    console.log("onComplete: " + typewriter.currentText);
}
typewriter.onInit = onUpdate;
typewriter.onUpdate = onInit;
typewriter.onComplete = onComplete;
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
