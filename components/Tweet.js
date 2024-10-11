import React from 'react'
import { useState } from 'react'
import LastTweets from './LastTweets';
import styles from '../styles/Tweet.module.css';
import { useSelector } from 'react-redux';

function Tweet() {
    const [tweetText, setTweetText] = useState('');
    // const [userId, setUserId] = useState('6707a650de6f4a5baf38e691'); //for testing before using the Redux
    const [refreshTweets, setRefreshTweets] = useState(false);
    const maxCharacters = 280;
    const user = useSelector((state) => state.user.value)

    const handleChange = (event) => {
        setTweetText(event.target.value);
    };

    const handleTweet = () => {
        if (!user.token) return; // if the user is not logged in , the tweet can not be sent
        const tweetMessage = tweetText;

        // extraction hashtages from tweettext in array format
        const hashtags = tweetText.match(/#[\w]+/g) || [];

        fetch('http://localhost:3000/tweets/addTweet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.token, tweetMessage, hashtags:hashtags.join(',') })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Tweet added:', data);
            setTweetText('');
            setRefreshTweets(prev => !prev)
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
                disabled={!user.token} // the textarea is disabled when the user is not logged in
            />
            <div className={styles.btnContainer}>
            <span className={styles.remaining}>{maxCharacters - tweetText.length}/{maxCharacters} </span>
            <button
                onClick={handleTweet}
                disabled={!user.token || tweetText.length === 0}
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
            <LastTweets refreshTweets={refreshTweets} />

        </div>
    );
}

export default Tweet;
