import styles from '../styles/Login.module.css'
import Image from 'next/image';
import { Button, Modal } from 'antd';
import { useState } from 'react';


function Login() {

    const [firstName, firstNameSetter] = useState('');

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
                        <button className={styles.btnLogin}>Sign ip </button>
                    </div>
                </div>

            </div>


            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className={styles.mainSignUpModal}>
                <input onChange={(e) => firstNameSetter(e.target.value)} value={firstName}/>

                <button className={styles.btnLogin}>Sign ip </button>
                </div>

            </Modal>



        </div>
    )

}

export default Login;