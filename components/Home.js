import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { useEffect, useState,} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tweet from './Tweet'
import Trends from './Trends';
import {logout} from '../reducers/user'
import { useRouter } from 'next/router';

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user.value);
 
const router =useRouter();


  const clickLogout=()=>{
  dispatch(logout());
  router.push('/')
 } 
  // fonction callback logout

const refreshHome =()=>{
  
  console.log('click');
  router.push('/home');
}

  return (
    <div>
      <main className={styles.main}>
      {/* //DIV pour contenir info/logo/button  */}
          <div className={styles.navbar} width={200} height={200} > 
              <div className={styles.divlogo}>
              <Image  className={styles.logo} src="/images/logoHackatweet.png" alt="logo twitter" width={40} height={40} onClick={()=>refreshHome()} />
              </div>
            {/* //bouton pour logout */}<div>
              <p className={styles.info}>{user.username} {user.name}</p>
              
            

            <button className={styles.bouton} onClick={()=>clickLogout()}>logout</button>
            </div>
          </div>
               <div className={styles.content}>{/*main div for component tweet/lastweets */}
               <h1 className={styles.info}>Welcome Home</h1> 
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
