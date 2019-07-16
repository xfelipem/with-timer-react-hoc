// THIRD PARTY DEPENDENCIES
import React from 'react';

// CONSTANTS DECLARATION
const DEFAULT_WAIT_INTERVAL = 500;

// COMPONENT DECLARATION

/**
 * High order function which makes the child component able to create and destroy a timer.
 * 
 * @param {Component} ChildComponent component to be wrapped.
 * @param {Number} waitInterval timer interval in miliseconds.
 */
const withTimer = (ChildComponent, waitInterval = DEFAULT_WAIT_INTERVAL) => {
  // PRIVATE PROPERTIES DECLARATION
  let timer = null;

  // PRIVATE METHODS DECLARATION

  /**
   * Clears a timer.
   * 
   * @returns {undefined} void.
   */
  const clearTimer = () => clearTimeout(timer);
  /**
   * Method to set a timer. The callback will receive the parameters passed as rest.
   * 
   * @param {function} callback Function to be executed after the interval.
   * @param  {...any} rest Parameters passed to the callback function.
   * @returns {undefined} void.
   */
  const setTimer = (callback, ...rest) => {
    timer = setTimeout(() => callback(...rest), waitInterval);
  };
  /**
   * Wrapped component, take into account that if the child component has clearTimer and setTimer
   * properties these will be overridden with the HOC props. 
   * 
   * @param {Object} props Component properties.
   */
  const ComponentWithTimer = (props) => (
    <ChildComponent clearTimer={clearTimer} setTimer={setTimer} {...props} />
  );

  return ComponentWithTimer;
};

// EXPORT
export default withTimer;
