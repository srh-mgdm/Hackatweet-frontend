import React from 'react'
import { useState } from 'react'

import styles from '../styles/Tweet.module.css';

function Tweet() {
    const [tweetText, setTweetText] = useState('');
    const [userId, setUserId] = useState('6707a650de6f4a5baf38e691');
    const maxCharacters = 280;

    const handleChange = (event) => {
        setTweetText(event.target.value);
    };

    const handleTweet = () => {

        const tweetMessage = tweetText;

        // extraction hashtages from tweettext in array format
        const hashtags = tweetText.match(/#[\w]+/g) || [];

        fetch('http://localhost:3000/tweets/addTweet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, tweetMessage, hashtags:hashtags.join(',') })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Tweet added:', data);
            setTweetText('');
        })
        .catch(error => {
            console.error('Error adding tweet:', error);
        });
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
