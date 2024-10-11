import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styles from '../styles/LastTweets.module.css';

function LastTweets({ refreshTweets }) {
  const [tweets, setTweets] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3000/tweets')
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setTweets(data.tweets);
        } else {
          console.error('Error fetching tweets');
        }
      })

  }, [refreshTweets]);

  // for styles hashtags
  function formatTweetText(tweetText) {

    if (!tweetText) {
      return <span>No text available</span>;
    }

    return tweetText.split(' ').map((word, index) => {
      if (word.startsWith('#')) {

        return (
          <span key={index} style={{ color: '#1DA1F2' }}>
            {word + ' '}
          </span>
        );
      } else {
        return word + ' ';
      }
    });
  }


  let tweetList;
 // consider if the tweet is exist or not
  if (tweets.length === 0) {
    tweetList = <p>No tweets yet</p>;
  } else {
    tweetList = tweets.map((tweet, index) => {
      let userContent;

      //Check for user existence and display user information
      if (tweet.users && tweet.users.length > 0) {
        const user = tweet.users[0];
        userContent = (
          <>
            <strong>{user.name}</strong>
            <span className={styles.username}>@{user.username}</span>
          </>
        );
      } else {
        userContent = <span>Unknown User</span>;
      }

      return (
        <div key={index} className={styles.tweet}>
          <div className={styles.tweetHeader}>
           //Display user information
            {userContent}
           //Show when the tweet was created
            <span className={styles.time}>{moment(tweet.createdAt).fromNow()}</span>
          </div>

          //Show tweet message and hashtags
          <p>{formatTweetText(tweet.tweetMessage)}</p>

          <div className={styles.tweetFooter}>
            <button className={styles.likeButton}>❤️ {tweet.likesCounter}</button>
          </div>
        </div>
      );
    });
  }

  return <div className={styles.tweetsContainer}>{tweetList}</div>;
}

export default LastTweets;
