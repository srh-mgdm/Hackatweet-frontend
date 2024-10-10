import React from 'react'
import { useState } from 'react'

import styles from '../styles/Tweet.module.css';

function Tweet() {
    const [tweetText, setTweetText] = useState('');
    const maxCharacters = 280;

    const handleChange = (event) => {
        setTweetText(event.target.value);
    };

    const handleTweet = () => {
        console.log('Tweet:', tweetText);
        setTweetText('');
    };

    return (

        <div className={styles.container}>
            <textarea
                value={tweetText}
                onChange={handleChange}
                maxLength={maxCharacters}
                placeholder="What's happening?"
                className={styles.textarea}
            />
            <div className={styles.btnContainer}>
            <span className={styles.remaining}>{maxCharacters - tweetText.length}/{maxCharacters} </span>
            <button
                onClick={handleTweet}
                disabled={tweetText.length === 0}
                style={{
                    backgroundColor: tweetText.length === 0 ? '#ccc' : '#1DA1F2', //backgroundColor of Tweet buttom
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px 15px',
                    cursor: tweetText.length === 0 ? 'not-allowed' : 'pointer',
                    marginLeft: '10px',
                }}
            >
                Tweet
            </button>
            </div>

        </div>
    );
}

export default Tweet;
