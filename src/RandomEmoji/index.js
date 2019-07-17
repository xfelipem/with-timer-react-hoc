// THIRD PARTY DEPENDENCIES
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// INTERNAL DEPENDENCIES
import withTimer from '../withTimer';

// CONSTANTS
const API_URL = 'https://api.github.com/emojis';
const DEFAULT_INTERVAL = 1000;
const STYLES = {
  CONTAINER: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  EMOJI: {
    width: '64px'
  }
};

// SELECTORS
const selectRandomEmoji = (emojis) => {
  const names = Object.keys(emojis);

  return emojis[names[(names.length * Math.random()) << 0]];
};

// COMPONENT
const RandomEmoji = (props) => {
  // PROPERTIES
  const { clearTimer, setTimer } = props;

  // STATE
  const [emojis, setEmojis] = useState({});
  const [emoji, setEmoji] = useState('');

  // PRIVATE METHODS
  const mutateEmoji = () => setEmoji(selectRandomEmoji(emojis));
  const mutateEmojis = serverEmojis => {
    setEmojis(serverEmojis);
    mutateEmoji();
  };

  // LIFE CYCLE
  const fetchEmojisEffectHandler = () => {
    // EFFECT
    axios.get(API_URL)
      .then(response => response.json())
      .then(mutateEmojis);

    // EFFECTS CLEANER
    /** We do not needmutateEmojismutateEmojis this to return any effect cleaner */
  }
  const setTimerEffectHandler = () => {
    // EFFECT
    setTimer(mutateEmoji, DEFAULT_INTERVAL); /** Here we set the timer */

    // EFFECTS CLEANER
    return clearTimer /** Here we return the cleaner function. */
  }

  useEffect(fetchEmojisEffectHandler);
  useEffect(setTimerEffectHandler);

  // VISUAL NODES
  return (
    <div style={STYLES.CONTAINER}>
      <img src={emoji} style={STYLES.EMOJI} />
    </div>
  );
};

const RandomEmojiWithTimer = withTimer(RandomEmoji);

// EXPORT
export { RandomEmoji, RandomEmojiWithTimer };
export default RandomEmojiWithTimer;
