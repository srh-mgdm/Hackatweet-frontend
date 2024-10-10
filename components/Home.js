import styles from '../styles/Home.module.css';
import Image from 'next/image';

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
               <div className={styles.content}> {/*main div for component tweet/lastweets */}
                <h1 className={styles.title}> Welcome to <a href="https://nextjs.org">Next.js!</a></h1>
                </div>
            <div className={styles.trends}>koedzfpjpeuiarfhpnaoidk,cjaefncjdnskqlmLoremkz,dako;zpofkoirjeafnuijdk</div>
      </main>
    </div>
  );
}

export default Home;
