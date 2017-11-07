# v-feedback

#### touch feedback directive for vue2.0 

![gif preview](example.gif)

## Example npm
```
npm install v-feedback
```

```javascript
import vFeedback from 'v-feedback';
Vue.use(VFeedback);
```

## Example script
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1"/>
  <title>Example</title>
  <style type="text/css">
    p {
      margin-top: 10px;
      border: 1px solid gray;
      line-height: 60px;
      border-radius: 6px;
      text-align: center;
    }

    .e-feedback {
      background-color: lightskyblue;
    }

    /* with custom class */
    .my-className {
      background-color: pink;
    }
  </style>
</head>
<body>

<div id="app">
  <!-- default class "e-feedback" -->
  <p v-feedback>with default class</p>

  <!-- with custom class "my-className" -->
  <p v-feedback="'my-className'">with custom class</p>
</div>
<script src="https://unpkg.com/vue"></script>
<script src="../dist/index.js"></script>
<script>
  new Vue({el: '#app'});
</script>
</body>
</html>

```
