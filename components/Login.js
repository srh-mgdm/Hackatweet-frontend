import styles from '../styles/Login.module.css'
import Image from 'next/image';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import SignUp from './modal/SignUp';
import SignIn from './modal/SignIn';
import { useRouter } from 'next/router';


// redux
import { useDispatch } from 'react-redux';
import { login} from '../reducers/user'

function Login() {


    const [firstName, firstNameSetter] = useState('');
    const [username, usernameSetter] = useState('');
    const [password, passwordSetter] = useState('');

    const [isLogin, isLoginSetter] = useState(false)
    // const [clickSignUpBool, clickSignUpBoolSetter] = useState(false);
    const [declencerFetchSignUpBool, declencerFetchSignUpBoolSetter] = useState(false);
    const [declencerFetchSignInBool, declencerFetchSignInBoolSetter] = useState(false);
    
    // redirect url
    const router = useRouter();

    // redux
    const dispatch = useDispatch();//<-- utilse directement comme ça>


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
    const clickForModal = (isLogin) =>{
        isLoginSetter(isLogin)
        showModal()
    }
    const changeDeclencerFetchSignUpBool = (firstName, username, password) =>{
        console.log(`- dans Login.js 📣: declencerFetchSignUpBool`)
        firstNameSetter(firstName)
        usernameSetter(username)
        passwordSetter(password)
        declencerFetchSignUpBoolSetter(!declencerFetchSignUpBool)
    }
    const changeDeclencerFetchSignInBool = (username, password) =>{
        console.log(`- dans Login.js 📣: declencerFetchSignInBool`)
        usernameSetter(username)
        passwordSetter(password)
        declencerFetchSignInBoolSetter(!declencerFetchSignInBool)
    }


    useEffect(() => {
        if (declencerFetchSignUpBool) {
            console.log("***** SignUp ******")
            const bodyData = {
                name: firstName,
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
                    console.log(`data: ${data.token}`)
                    const storeUserObject = {
                        username: username,
                        token: data.token,
                        name: firstName
                    }
                    dispatch(login(storeUserObject))

                    handleCancel()

                    router.push('/home');
                });
        } else if (declencerFetchSignInBool){
            console.log(`---> declencerFetchSignInBool 🎯`)
            console.log("------- SignIn -------")
            const bodyData = {
                username: username,
                password: password,
            }
            fetch('http://localhost:3000/users/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(`reponse bien reçu 🎉`)
                    console.log(`data: ${data.result}`)
                    const storeUserObject = {
                        name: data.name ? data.name: "no name recieved form backend",
                        username: username,
                        token: data.token
                    }
                    dispatch(login(storeUserObject))

                    handleCancel()

                    router.push('/home');
                });
        }

    }, [declencerFetchSignUpBool, declencerFetchSignInBool]);

    const modal = <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} 
        footer={<></>} >

        {isLogin ? <SignIn changeDeclencerFetchSignInBool={changeDeclencerFetchSignInBool}/> : 
        <SignUp changeDeclencerFetchSignUpBool={changeDeclencerFetchSignUpBool}/> }
    </Modal>

    return (
        <div className={styles.main} >

            <div className={styles.coteGauche}>
                <Image src="/images/logoHackatweet.png" alt="Logo"
                    width={200} height={200} />
            </div>

            <div className={styles.divCoteDroite}>
                <div className={styles.divCoteDroiteSub}>
                    <div className={styles.divCoteDroiteSubImage}>
                        <Image src="/images/logoHackatweet.png" alt="Logo"
                            width={200} height={200} />
                    </div>

                    <div className={styles.divCodeDroiteSubGrosMots}>
                        <p className={styles.pGrosMots}>See what's</p>
                        <p className={styles.pGrosMots}>happening</p>
                        <p className={styles.pMoinsGrosMots}>Join Hackatweet today.</p>
                    </div>

                    <div className={styles.divDroiteButons}>
                        <div className={styles.divUnButon}>
                            <button className={styles.btnSignUp} onClick={()=> clickForModal(false)}>Sign up </button>
                        </div>
                        <div>already have an account?</div>
                        <div className={styles.divUnButon}>
                            <button className={styles.btnSignIn}onClick={()=> clickForModal(true)}>Sign in </button>
                        </div>
                    </div>
                </div>
            </div>

            {modal}


        </div>
    )

}

export default Login;