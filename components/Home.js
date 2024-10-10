import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { useEffect, useState,useSelector } from 'react';
import Tweet from './Tweet'
import Trends from './Trends';


function Home() {
 const clickLogout=()=>{}//futur fonction callback logout

  return (
    <div>
      <main className={styles.main}>
      {/* //DIV pour contenir info/logo/button  */}
          <div className={styles.navbar} width={200} height={200} > 
              <div className={styles.logo}>
              <Image src="/images/logoHackatweet.png" alt="logo twitter" width={40} height={40}/>
              </div>
            {/* //bouton pour logout */}
            <button className={styles.bouton} onClick={()=>clickLogout()}>logout</button>
          </div>
               <div className={styles.content}>{/*main div for component tweet/lastweets */}
               <h1>Welcome Home</h1> 
                <Tweet/>
                  </div>
              <div className={styles.trends}>
                <h1>TRENDS</h1>
                <Trends/>
              </div>
      </main>
    </div>
  );
}

export default Home;
