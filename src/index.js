/**
 * THIRD PARTY DEPENDENCIES
 */
import React from 'react';
/**
 * VARIABLE DECLARATION
 */
const DEFAULT_WAIT_INTERVAL = 500;
/**
 * COMPONENT DECLARATION
 */
const withTimer = (WrappedComponent, waitInterval = DEFAULT_WAIT_INTERVAL) => {
  let timer = null;

  return props => (
    <WrappedComponent
      clearTimer={() => clearTimeout(timer)}
      setTimer={(callback, ...rest) => {
        timer = setTimeout(() => callback(...rest), waitInterval);
      }}
      {...props}
    />
  );
};

/**
 * EXPORT
 */
export default withTimer;
