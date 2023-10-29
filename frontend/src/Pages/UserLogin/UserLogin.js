import classNames from 'classnames/bind';
import Button from '~/Components/Button/Button';
import { Button as ButtonChakra } from '@chakra-ui/react';
import Input from '~/Components/Input/Input';
import Title from '~/Components/Title/Title';
import googleLogo from '~/Assets/image/Logo/Google.png';
import styles from '~/Pages/UserLogin/UserLogin.module.scss';
import Line from '~/Components/Line/Line';
import { useEffect, useState } from 'react';
import LoginAPI from '~/Api/LoginAPI';
import { ShopState } from '~/context/ShopProvider';
import { useNavigate } from 'react-router-dom';
import { InputGroup, InputRightElement, useToast } from '@chakra-ui/react';
import axios from 'axios';
import LoginWithGoogle from '~/Components/LoginWithGoogle/LoginWithGoogle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faFaceGrinTongueSquint } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function UserLogin() {
    const toast = useToast();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const { setUser } = ShopState();

    const navigate = useNavigate();

    const logins = async () => {
        if (!email || !password) {
            toast({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const data = await axios.post(
                'http://localhost:8086/api/user/authenticate',
                {
                    email,
                    password,
                },
                config,
            );

            toast({
                title: 'Login successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setUser(data.data);
            localStorage.setItem('userInfo', JSON.stringify(data.data));
            console.log(data.data);
            setLoading(false);
            // // setLoading(false);
            navigate('/');
        } catch (error) {
            toast({
                title: 'Error occur!',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            console.log(error);
        }
    };

    const registerHandler = () => {
        navigate('/register');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('inner')}>
                    <Title className={cx('login-title')}>Login here</Title>

                    <div className={cx('inner-input')}>
                        <Input
                            placeholder="Email"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        ></Input>
                        <Line></Line>
                        <InputGroup>
                            <Input
                                placeholder="Password"
                                type={show ? 'text' : 'password'}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <InputRightElement className={cx('showHidePasswordBtn')} onClick={handleClick}>
                                <Button>
                                    {show ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                        <Line></Line>
                    </div>

                    <div className={cx('checkbox-section')}>
                        <div className={cx('section-remember')}></div>

                        <Button className={cx('section-forgot')}>Forgot password ?</Button>
                    </div>

                    <Button classname={cx('login-btn')} loginSystemBtn onClick={() => logins()}>
                        Login
                    </Button>
                    <Title className={cx('google-title')}>Or use your account</Title>
                    <Button className={cx('google')}>
                        {/* <img src={googleLogo} /> */}
                        <LoginWithGoogle />
                    </Button>
                </div>

                <div className={cx('register')}>
                    <div className={cx('register-title-container')}>
                        <Title className={cx('register-title')}>Welcome to parrot shop</Title>
                    </div>
                    <Button loginSystemBtn className={cx('register-btn')} onClick={registerHandler}>
                        Register
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default UserLogin;
