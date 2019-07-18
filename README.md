[![Build Status](https://api.travis-ci.org/Muramasah/with-timer-react-hoc.svg?branch=master)](https://travis-ci.org/Muramasah/with-timer-react-hoc) [![Coverage Status](https://coveralls.io/repos/github/Muramasah/with-timer-react-hoc/badge.svg?branch=master)](https://coveralls.io/github/Muramasah/with-timer-react-hoc?branch=master) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Muramasah/with-timer-react-hoc/blob/master/LICENSE)

A High Order Component to create and clear a timer.

# Table of Contents

1. [Features](#features) 
2. [Usage](#usage)
3. [Install](#install)
4. [What does this repo have](#what-does-this-repo-have)
5. [But why](#but-why)

# Features

Add a [setTimer](https://github.com/Muramasah/with-timer-react-hoc/blob/55f2923778187856dce05efdb4f24b99bac31026/src/withTimer/index.js#L34) and [clearTimer](https://github.com/Muramasah/with-timer-react-hoc/blob/55f2923778187856dce05efdb4f24b99bac31026/src/withTimer/index.js#L26) functions and keeps the [timer](https://github.com/Muramasah/with-timer-react-hoc/blob/55f2923778187856dce05efdb4f24b99bac31026/src/withTimer/index.js#L17) hidden from the component.

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

// Wrapping the component with the HOC
export default withTimer(RandomEmoji);

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

# What does this repo have

1. Continous integration with [Travis](https://travis-ci.org) and [Coveralls](https://coveralls.io/).
2. [Webpack](https://webpack.js.org) and [babel](https://babeljs.io/) setup to share isolated components.
3. [Jest](https://jestjs.io/) configuration with code coverage.
4. An example of a [High Order Component](https://reactjs.org/docs/higher-order-components.html) in React.
5. Asynchronous code using [hooks](https://reactjs.org/docs/hooks-intro.html), two cases API call and timer execution.
6. An example of a [functional component](https://reactjs.org/docs/components-and-props.html#function-and-class-components) using [useState](https://reactjs.org/docs/hooks-state.html) and [useEffect](https://reactjs.org/docs/hooks-effect.html) hooks.
7. Descriptions of each part of the written code.

# But why

## A timer in a HOC

The HOCs are recommended by the react team to be used in the implementation of [Cross-Cutting Concerns](https://reactjs.org/docs/higher-order-components.html#use-hocs-for-cross-cutting-concerns). The timer is not part of a visualization logic. This kind of logic always answer to "what needs to be to displayed?", but the timer answer to "when do display it?" like an user action.

## The proyect setup

The setup and configuration will be the base for a template to create isolated components and small React apps with TDD and CI.