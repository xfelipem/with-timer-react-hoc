A High Order Component to create and clear a timer.

# Table of Contents

1. [Features](#features) 
2. [Usage](#usage)
3. [External links](#external-links)

# Features

Add a setTimer and clearTimer functions and keeps the timer hidden from the component.

# Usage

Example of a component using a timer.

```js
import React from 'react';
import withTimer from 'with-timer-react-hoc';

/**
 * Original code from Pedro Duarte
 * @see https://codesandbox.io/s/84ryn6kv7l
 * @see https://84ryn6kv7l.codesandbox.io/
 * @see https://twitter.com/peduarte/status/1089930801536532480?s=20
*/
class RandomEmoji extends React.Component {
  state = { emojis: {}, emoji: "" };

  componentDidMount() {
    fetch("https://api.github.com/emojis")
      .then(response => response.json())
      .then(data => this.setState({ emojis: data }));
  }

  componentDidUpdate() {
    // Here we set the timer
    this.props.setTimer(
      () => this.setState({ emoji: this.getRandomEmoji() }),
      1000
    );
  }

  componentWillUnmount() {
    // Here we clear the timer, this code can be used in a "stop" button implementation.
    this.props.clearTimer();
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh"
        }}
      >
        <img src={this.state.emoji} width="64px" />
      </div>
    );
  }

  getRandomEmoji = () => {
    const { emojis } = this.state;
    const names = Object.keys(emojis);
    return emojis[names[(names.length * Math.random()) << 0]];
  };
}

export default RandomEmoji;

```
# External links

1. [Oficial  React HOCs documentation](https://reactjs.org/docs/higher-order-components.html)