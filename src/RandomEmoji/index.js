// THIRD PARTY DEPENDENCIES
import React from 'react';
import axios from 'axios';

// INTERNAL DEPENDENCIES
import withTimer from '../withTimer';

// CONSTANTS DECLARATION
const API_URL = 'https://api.github.com/emojis';

// PRIVATE METHOD DECLARATION
const selectRandomEmoji = (emojis) => {
  const names = Object.keys(emojis);

  return emojis[names[(names.length * Math.random()) << 0]];
};

// COMPONENT DECLARATION

/**
 * Original code from Pedro Duarte
 * @see https://codesandbox.io/s/84ryn6kv7l
 * @see https://84ryn6kv7l.codesandbox.io/
 * @see https://twitter.com/peduarte/status/1089930801536532480?s=20
*/
class RandomEmoji extends React.Component {
  state = { emojis: {}, emoji: '' };

  componentDidMount() {
    axios.get(API_URL)
      .then(response => response.json())
      .then(emojis => this.setState({ emojis, emoji: selectRandomEmoji(emojis) }));
  }

  componentDidUpdate() {
    // Here we set the timer
    this.props.setTimer(
      () => this.setState({ emoji: selectRandomEmoji(this.state.emojis) }),
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
};

const RandomEmojiWithTimer = withTimer(RandomEmoji);

// EXPORT
export { RandomEmoji, RandomEmojiWithTimer };
export default RandomEmojiWithTimer;
