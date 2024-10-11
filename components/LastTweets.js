import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styles from '../styles/LastTweets.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

function LastTweets({ refreshTweets }) {
  const [countLike,setcountLike] = useState(0)
  const [tweets, setTweets] = useState([]);

  const updateLikeTweet =(()=> {
    console.log(countLike)
    setcountLike( countLike +1)
    if(countLike>=1)
    { setcountLike( countLike -1)}
  }
    )

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
      .catch(error => {
        console.error('Error:', error);
      });
  }, [refreshTweets]);

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
  const toggleLike = (tweetId, isLiked) => {
    setTweets(prevTweets =>
      prevTweets.map(tweet => {
        if (tweet._id === tweetId) {
          let updatedTweet = {
            _id: tweet._id,
            tweetMessage: tweet.tweetMessage,
            createdAt: tweet.createdAt,
            users: tweet.users,
            likesCounter: tweet.likesCounter,
            isLiked: tweet.isLiked,
          };

         
          if (isLiked) {
            updatedTweet.isLiked = false;
            updatedTweet.likesCounter = tweet.likesCounter - 1;
          } else {
            updatedTweet.isLiked = true;
            updatedTweet.likesCounter = tweet.likesCounter + 1;
          }

          return updatedTweet;
        }
        return tweet;
      })
    );
  };
  let tweetList;
  if (tweets.length === 0) {
    tweetList = <p>No tweets yet</p>;
  } else {
    tweetList = tweets.map((tweet, index) => {
      let userContent;

      if (tweet.users && tweet.users.length > 0) {
        const user = tweet.users[0];
        userContent = (
          <>
          <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
            <strong className={styles.name}>{user.name}</strong>
            <span className={styles.username}>@{user.username}</span>
          </>
        );
      } else {
        userContent = <span>Unknown User</span>;
      }



      return (
        <div key={index} className={styles.tweet}>
          <div className={styles.tweetHeader}>
            {userContent}
            <span className={styles.time}>{moment(tweet.createdAt).fromNow()}</span>
          </div>
          <p>{formatTweetText(tweet.tweetMessage)}</p>
          <div className={styles.tweetFooter}>
            <button
              className={styles.likeButton}
              onClick={() => toggleLike(tweet._id, tweet.isLiked)}
            >
              <FontAwesomeIcon
                icon={tweet.isLiked ? solidHeart : regularHeart}
                style={{ color: tweet.isLiked ? 'red' : 'white' }}
              />{' '}
              {tweet.likesCounter}
            </button>
          </div>
        </div>
      );
    });
  }

  return <div className={styles.tweetsContainer}>{tweetList}</div>;
}

export default LastTweets;
