import React, { useState, useEffect } from 'react';
import moment from 'moment'; // کتابخانه برای مدیریت زمان
import styles from '../styles/LastTweets.module.css'; // استایل‌های CSS

function LastTweets({ refreshTweets }) {
  const [tweets, setTweets] = useState([]);

  // دریافت توییت‌ها از API
  useEffect(() => {
    fetch('http://localhost:3000/tweets')
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setTweets(data.tweets); // توییت‌ها را تنظیم کنید
        } else {
          console.error('Error fetching tweets');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [refreshTweets]);

  // تابع برای استایل‌دهی به هشتگ‌ها
  function formatTweetText(tweetText) {
    // بررسی اینکه آیا tweetText وجود دارد
    if (!tweetText) {
      return <span>No text available</span>; // در صورت عدم وجود متن
    }

    return tweetText.split(' ').map((word, index) => {
      if (word.startsWith('#')) {
        // اگر کلمه هشتگ باشد، رنگ آبی اضافه کن
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

  // متغیر برای نگهداری لیست توییت‌ها
  let tweetList;

  // اگر توییتی وجود نداشته باشد
  if (tweets.length === 0) {
    tweetList = <p>No tweets yet</p>;
  } else {
    // اگر توییت وجود داشته باشد
    tweetList = tweets.map((tweet, index) => (
      <div key={index} className={styles.tweet}>
        <div className={styles.tweetHeader}>
          {/* بررسی وجود کاربران قبل از دسترسی به اطلاعات */}
          {(() => {
            if (tweet.users && tweet.users.length > 0) {
              const user = tweet.users[0];
              return (
                <>
                  {/* نمایش نام کاربر */}
                  <strong>{user.name}</strong>
                  {/* نمایش نام کاربری */}
                  <span className={styles.username}>@{user.username}</span>
                </>
              );
            } else {
              // پیام در صورت عدم وجود کاربر
              return <span>Unknown User</span>;
            }
          })()}
          {/* زمان ارسال توییت */}
          <span className={styles.time}>{moment(tweet.createdAt).fromNow()}</span>
        </div>
        {/* متن توییت با هشتگ آبی */}
        <p>{formatTweetText(tweet.tweetMessage)}</p>
        <div className={styles.tweetFooter}>
          {/* دکمه لایک */}
          <button className={styles.likeButton}>❤️ {tweet.likesCounter}</button>
        </div>
      </div>
    ));
  }

  // نمایش لیست توییت‌ها
  return <div className={styles.tweetsContainer}>{tweetList}</div>;
}

export default LastTweets;
