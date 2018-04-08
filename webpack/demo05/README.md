

## React use ES6

1.创建组件

```javascript
// The ES5 way
var Photo = React.createClass({
  handleDoubleTap: function(e) { … },
  render: function() { … },
});
```

```JavaScript
// The ES6+ way
class Photo extends React.Component {
  handleDoubleTap(e) { … }
  render() { … }
}
```

```JavaScript
// The ES5 way
var EmbedModal = React.createClass({
  componentWillMount: function() { … },
});
```

```JavaScript
// The ES6+ way
class EmbedModal extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
  }
}				

```

```JavaScript
// The ES5 way
var Video = React.createClass({
  getDefaultProps: function() {
    return {
      autoPlay: false,
      maxLoops: 10,
    };
  },
  getInitialState: function() {
    return {
      loopsRemaining: this.props.maxLoops,
    };
  },
  propTypes: {
    autoPlay: React.PropTypes.bool.isRequired,
    maxLoops: React.PropTypes.number.isRequired,
    posterFrameSrc: React.PropTypes.string.isRequired,
    videoSrc: React.PropTypes.string.isRequired,
  },
});
```

```JavaScript
// The ES6+ way
class Video extends React.Component {
  static defaultProps = {
    autoPlay: false,
    maxLoops: 10,
  }
  static propTypes = {
    autoPlay: React.PropTypes.bool.isRequired,
    maxLoops: React.PropTypes.number.isRequired,
    posterFrameSrc: React.PropTypes.string.isRequired,
    videoSrc: React.PropTypes.string.isRequired,
  }
  state = {
    loopsRemaining: this.props.maxLoops,
  }
}
```











