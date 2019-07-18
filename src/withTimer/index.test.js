// THIRD PARTY DEPENDENCIES
import React from 'react';
import renderer from 'react-test-renderer';

// INTERNAL DEPENDENCIES
import RandomEmoji from '../../example/RandomEmoji';

test('An Emoji is displayed', () => {
  const component = renderer.create(<RandomEmoji />);
  let tree = component.toJSON();
  
  expect(tree).toMatchSnapshot();
});