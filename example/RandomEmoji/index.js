// THIRD PARTY DEPENDENCIES
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// INTERNAL DEPENDENCIES
import withTimer from '../../src/withTimer';

// CONSTANTS
const API_URL = 'https://api.github.com/emojis';
const DEFAULT_INTERVAL = 1000;

// HELPERS

/**
 * Validator, checks if the object is empty
 * 
 * @param {Object}
 * @returns {bool}
 */
const isObjectEmpty = object => Object.entries(object).length === 0;
/**
 * Selector, picks a random emoji from a map of emojis.
 * 
 * @param {Object} emojis map of emojis links sorted by name.
 */
const selectRandomEmoji = (emojis) => {
  if(emojis.length)
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
    if (isObjectEmpty(emojis)) {
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
    // EFFECT CLEANER
    /** We do not need to return any effect cleaner */
  }
  const setTimerEffectHandler = () => {
    // EFFECT
    setTimer(mutateEmoji, DEFAULT_INTERVAL); /** Here we set the timer */

    // EFFECT CLEANER
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

// HOC Wrapping
const RandomEmojiWithTimer = withTimer(RandomEmoji);

// EXPORT
export { RandomEmoji, RandomEmojiWithTimer };
export default RandomEmojiWithTimer;
