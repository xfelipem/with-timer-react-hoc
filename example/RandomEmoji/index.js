// THIRD PARTY DEPENDENCIES
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// INTERNAL DEPENDENCIES
import withTimer from '../../src/withTimer';

// CONSTANTS
const API_URL = 'https://api.github.com/emojis';
const DEFAULT_INTERVAL = 1000;

// HELPERS
const isEmpty = object => Object.entries(object).length === 0;

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
  const mutateEmojis = serverEmojis => setEmojis(serverEmojis);

  // LIFE CYCLE
  const fetchEmojisEffectHandler = () => {
    // EFFECT
    if (isEmpty(emojis)) {
      axios.get(API_URL)
        .then(({ data }) => {
          if (!data) {
            throw new Error();
          }

          mutateEmojis(data);
        })
        .catch(() => mutateEmojis({
          argentina: 'https://github.githubassets.com/images/icons/emoji/unicode/1f1e6-1f1f7.png?v8'
        }));
    }
    // EFFECTS CLEANER
    /** We do not need to return any effect cleaner */
  }
  const setTimerEffectHandler = () => {
    // EFFECT
    setTimer(mutateEmoji, DEFAULT_INTERVAL); /** Here we set the timer */

    // EFFECTS CLEANER
    return clearTimer /** Here we return the cleaner function. */
  }

  useEffect(fetchEmojisEffectHandler);
  useEffect(setTimerEffectHandler);

  if (emoji === '') {
    return null;
  }

  // VISUAL NODES
  return (
    <img alt='emoji' src={emoji} />
  );
};

const RandomEmojiWithTimer = withTimer(RandomEmoji);

// EXPORT
export { RandomEmoji, RandomEmojiWithTimer };
export default RandomEmojiWithTimer;
