import styles from '../styles/Login.module.css'
import Image from 'next/image';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';


function Login() {

    const [firstName, firstNameSetter] = useState('');
    const [username, usernameSetter] = useState('');
    const [password, passwordSetter] = useState('');
    const [clickSignUpBool, clickSignUpBoolSetter] = useState(false);

    // Pour le modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const clickSignUp = () => {
        console.log(`-on a cliqué 📢`)
        console.log(`firstName: ${firstName}`)
        console.log(`username: ${username}`)
        console.log(`password: ${password}`)
        clickSignUpBoolSetter(true)
    }


    useEffect(() => {
        if (clickSignUpBool){
            const bodyData = {
                firstName: firstName,
                username: username,
                password: password,
            }

            fetch('http://localhost:3000/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData)
            })
              .then(response => response.json())
              .then(data => {
                console.log(`reponse bien reçu 🎉`)
                console.log(`data: ${data.result}`)
              });
        }

      }, [clickSignUpBool]);



    return (
        <div className={styles.main} >

            <div className={styles.coteGauche}>
                <Image src="/images/logoHackatweet.png" alt="Logo"
                    width={200} height={200} />
            </div>

            <div className={styles.coteDroite}>

                <div className={styles.divDroiteButons}>
                    <div className={styles.divUnButon}>
                        <button className={styles.btnLogin} onClick={showModal}>Sign up </button>
                    </div>
                    <div>already have an account?</div>
                    <div className={styles.divUnButon}>
                        <button className={styles.btnLogin}>Sign in </button>
                    </div>
                </div>

            </div>


            <Modal title="Sign Up" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={<></>}
            >

                <div className={styles.mainSignUpModal}>
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

            </Modal>

        </div>
    )

}

export default Login;