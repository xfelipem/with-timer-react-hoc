[![Build Status](https://api.travis-ci.org/Muramasah/with-timer-react-hoc.svg?branch=master)](https://travis-ci.org/Muramasah/with-timer-react-hoc) [![Coverage Status](https://coveralls.io/repos/github/Muramasah/with-timer-react-hoc/badge.svg?branch=master)](https://coveralls.io/github/Muramasah/with-timer-react-hoc?branch=master) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Muramasah/with-timer-react-hoc/blob/master/LICENSE)

A High Order Component to create and clear a timer.

# Table of Contents

1. [Features](#features) 
2. [Usage](#usage)
3. [Install](#install)
4. [External links](#external-links)
5. [What does this repo have][What-does-this-repo-have]

# Features

Add a setTimer and clearTimer functions and keeps the timer hidden from the component.

# Usage

Example of a class component implementing the HOC. If you prefere an example using hooks take a look [here](https://github.com/Muramasah/with-timer-react-hoc/blob/master/example/RandomEmoji/index.js)

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
# Install

NPM
```
npm i with-timer-react-hoc

```
Yarn
```
yarn add with-timer-react-hoc
```

# External links

1. [Oficial  React HOCs documentation](https://reactjs.org/docs/higher-order-components.html)

# What does this repo have

1. Continous integration with [Travis](https://travis-ci.org) and [Coveralls](https://coveralls.io/).
2. Webpack and babel setup to share isolated components.
3. Jest configuration with code coverage.
4. An example of a High Order Function.
5. An example of a functional component using useState and useEffect hooks.
6. Asynchronous code using hooks, two cases API call and timer execution.
7. Descriptions of each part of the written code.
