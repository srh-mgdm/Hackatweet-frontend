import React from 'react'
import { useEffect, useState } from 'react';
import styles from '../../styles/SignUp.module.css';
import Image from 'next/image';

function SignUp(props) {

    const [firstName, firstNameSetter] = useState('');
    const [username, usernameSetter] = useState('');
    const [password, passwordSetter] = useState('');

    const clickSignUp = () => {
        console.log(`-on a cliqué 📢: clickSignUp`)
        // showModal()
        // console.log(`firstName: ${firstName}`)
        // console.log(`username: ${username}`)
        // console.log(`password: ${password}`)
        // clickSignUpBoolSetter(true)
        // props.changeClickSignUpBool(firstName, username,password)
        props.changeDeclencerFetchSignUpBool(firstName, username,password)
    }


    return (
    <div className={styles.mainSignUpModal}>

<div className={styles.divLogoImage}>
                <Image src="/images/logoHackatweet.png" alt="Logo"
                    width={200} height={200} />
            </div>

            <div className={styles.divPMoinsGrosMots}>

                <p className={styles.pMoinsGrosMots}>Create your Hackatweet account</p>
            </div>

        <div className={styles.divModalInput}>
            <input placeholder='firstName' onChange={(e) => firstNameSetter(e.target.value)} />
        </div>
        <div className={styles.divModalInput}>
            <input placeholder='username' onChange={(e) => usernameSetter(e.target.value)} />
        </div>
        <div className={styles.divModalInput}>

            <input placeholder='password' onChange={(e) => passwordSetter(e.target.value)} />
        </div>

        <button className={styles.btnLogin} onClick={() => clickSignUp()}>Sign up </button>
    </div>
    );
}


export default SignUp;