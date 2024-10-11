import React from 'react'
import { useEffect, useState } from 'react';
import styles from '../../styles/SignUp.module.css';
import Image from 'next/image';
//import SignUp from './SignUp';
//import home from '../../pages/homes';


function SignIn(props) {

    const [username, usernameSetter] = useState('');
    const [password, passwordSetter] = useState('');

    const clickSignIn = () => {
        console.log(`-on a cliqué 📢: clickSignIn`);//if(!username && password){ return SignUp}else{
        //const switchPage =()=> {
    // <Link href='../pages/home'> </Link>;}
        console.log(`-on a cliqué 📢: clickSignIn`)
        props.changeDeclencerFetchSignInBool(username,password)
    }

    return (
        <div className={styles.mainSignInModal}>

            <div className={styles.divLogoImage}>
                <Image src="/images/logoHackatweet.png" alt="Logo"
                    width={200} height={200} />
            </div>

            <div className={styles.divPMoinsGrosMots}>

                <p className={styles.pMoinsGrosMots}>Connect to Hackatweet</p>
            </div>
            <div className={styles.divModalInput}>
                <input placeholder='username' onChange={(e) => usernameSetter(e.target.value)} />
            </div>
            <div className={styles.divModalInput}>
                <input placeholder='password' onChange={(e) => passwordSetter(e.target.value)} />
            </div>

            <button className={styles.btnLogin} onClick={() => clickSignIn()}>Sign In </button>
        </div>
    );
}


export default SignIn;