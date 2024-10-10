import React from 'react'
import { useEffect, useState } from 'react';
import styles from '../../styles/SignUp.module.css';
import Image from 'next/image';

function SignIn() {

    const [username, usernameSetter] = useState('');
    const [password, passwordSetter] = useState('');

    const clickSignUp = () => {
        console.log(`-on a cliqué 📢: clickSignIn`)
    }

    return (
        <div className={styles.mainSignInModal}>

            <div className={styles.divLogoImage}>
                <Image src="/images/logoHackatweet.png" alt="Logo"
                    width={200} height={200} />
            </div>

            <div className={styles.divModalInput}>
                <input placeholder='username' onChange={(e) => usernameSetter(e.target.value)} />
            </div>
            <div className={styles.divModalInput}>
                <input placeholder='password' onChange={(e) => passwordSetter(e.target.value)} />
            </div>

            <button className={styles.btnLogin} onClick={() => clickSignUp()}>Sign In </button>
        </div>
    );
}


export default SignIn;