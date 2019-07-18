[![Build Status](https://api.travis-ci.org/Muramasah/with-timer-react-hoc.svg?branch=master)](https://travis-ci.org/Muramasah/with-timer-react-hoc) [![Coverage Status](https://coveralls.io/repos/github/Muramasah/with-timer-react-hoc/badge.svg?branch=master)](https://coveralls.io/github/Muramasah/with-timer-react-hoc?branch=master) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Muramasah/with-timer-react-hoc/blob/master/LICENSE)

A High Order Component to create and clear a timer.

# Table of Contents

1. [Features](#features) 
2. [Usage](#usage)
3. [Install](#install)
4. [What does this repo have](#what-does-this-repo-have)
5. [But why](#but-why)
6. [Code sections](#code-sections)
   1. [Third party dependencies](third-party-dependencies)
   2. [Internal dependencies](#internal-dependencies)
   3. [Constants](#constants)
   4. [Helpers](#helpers)
   5. [Component](#component)
      1. [Properties](#properties)
      2. [State](#state)
      3. [Private methods](#private-methods)
      4. [Life cycle](#life-cycle)
         1. [Effect handlers](#effect-handlers)
      5. [Visual nodes](#visual-nodes)
   6. [High Order Component wrapping](#high-order-component-wrapping)
   7. [Export](#export)

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
Kind of obvious, but you need to be working with React.

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

# Code sections

Inside the source and example files, you will see the next sections, here is a small explanation why.

## Third party dependencies

Here we group the **import** statements or the **require** executions to all code which isn't written by us.

## Internal dependencies

Same as the previous one but for our components.

## Constants

Values which not change during the program execution, grouped in a section to be easly moved to a configuration file if need it.

## Helpers

Usually data validators, transformers and selectors which are used only in one file. These functions have no referens to component properties or methods. The relation with te component is only about the data structure.

## Component

Component declaration, here we do our magic with visualization logic.

### Properties

These values are changed only by the component implementor, so they are like constants during the life cycle.

### State

Here we have the variables and functions or properties and methods whichs allow us to work with data changes inside the component.

### Private methods

What makes a method private? The references of a father object or function inside. If you move a private method outside the class or function to which it belongs, you'll have a runtime error.

Writting components, the private methods are those which works with properties and state values. Every line of code you write in here ends with the change of the state or the execution of a high order component's method, and React will react changing the DOM acordly.

### Life cycle

This sections contains the methods requiered by React to handle it life cyle by a class component or the hook implementation, usually the handlers for **useEffect**.

#### Effect handlers

The **useEffect** hook require a function to handle the effect in the state and may return a function which works as effect cleaner. The react team recommends to have one _effect_ for each state value which require one. You'll see two subsections here **effect** and **effect** cleaner for educational purpuses.

### Visual nodes

The return statement from a functional component or the render method from a class component contains the JSX which represents the DOM nodes. Here you write node hierarchy, attach user action, event handlers and the interaction whith the browser through React.

## High Order Component wrapping

When we work with component testing we need to be able to export different instances of it, basically to avoid testing render related process like api connections, or even this **withTimer** HOC. These process should be tested but not from a component test.

## Export

Complementary with the last section, we need to export the instances, by default we export the full ensambled component whith all it powers, redux connection, timer, etc. In another export statement we can export the instances we need in an object.

