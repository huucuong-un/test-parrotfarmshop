import classNames from 'classnames/bind';
import styles from './ChangePasswordForm.module.scss';

import Input from '~/Components/Input/Input';
import Title from '~/Components/Title/Title';
import Button from '~/Components/Button/Button';
import Line from '~/Components/Line/Line';

//hook
import { useState } from 'react';

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeLowVision, faEye } from '@fortawesome/free-solid-svg-icons';
import { useToast } from '@chakra-ui/react';
import { ShopState } from '~/context/ShopProvider';
import axios from 'axios';
import LoginAPI from '~/Api/LoginAPI';

const cx = classNames.bind(styles);

function ChangePasswordForm() {
    const toast = useToast();
    const { user } = ShopState();

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [passwordNew, setPasswordNew] = useState('');
    const [confirmPasswordNew, setConfirmPasswordNew] = useState('');

    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showConfirmPasswordNew, setShowConfirmPasswordNew] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibilityNew = () => {
        setShowPasswordNew(!showPasswordNew);
    };

    const togglePasswordVisibilityConFirmNew = () => {
        setShowConfirmPasswordNew(!showConfirmPasswordNew);
    };

    const handleClick = async () => {
        if (!password || !passwordNew || !confirmPasswordNew) {
            toast({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            return;
        }
        if (passwordNew !== confirmPasswordNew) {
            toast({
                title: 'Password does not match',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
            const data = await LoginAPI.changePassword(
                {
                    currentUsername: user.userName,
                    currentPassword: password,
                    newPassword: passwordNew,
                    confirmNewPassword: confirmPasswordNew,
                },
                config,
            );

            toast({
                title: 'Change password successfully!!',
                // description: error.register.message,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });

            console.log(data);
        } catch (error) {
            toast({
                title: 'Error occur!',
                // description: error.register.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('inner')}>
                    <Title className={cx('title-login')}>Change password</Title>
                    <div className={cx('notification-container')}>
                        {/* <div className={cx('notification')}>
                            <Title children={'Your password has been changed successfully'}></Title>
                        </div> */}
                    </div>

                    <div className={cx('password-container')}>
                        <div className={cx('input-line')}>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={'Enter current password'}
                                required
                            ></Input>
                            <Line></Line>
                        </div>
                        <i className={cx('check')}>
                            {showPassword ? (
                                <FontAwesomeIcon onClick={togglePasswordVisibility} icon={faEyeLowVision} />
                            ) : (
                                <FontAwesomeIcon onClick={togglePasswordVisibility} icon={faEye} />
                            )}
                        </i>
                    </div>

                    <div className={cx('password-container')}>
                        <div className={cx('input-line')}>
                            <Input
                                type={showPasswordNew ? 'text' : 'password'}
                                value={passwordNew}
                                onChange={(e) => setPasswordNew(e.target.value)}
                                placeholder={'Enter new password'}
                                required
                            ></Input>
                            <Line></Line>
                        </div>
                        <i className={cx('check')}>
                            {showPasswordNew ? (
                                <FontAwesomeIcon onClick={togglePasswordVisibilityNew} icon={faEyeLowVision} />
                            ) : (
                                <FontAwesomeIcon onClick={togglePasswordVisibilityNew} icon={faEye} />
                            )}
                        </i>
                    </div>
                    <div className={cx('password-container')}>
                        <div className={cx('input-line')}>
                            <Input
                                type={showConfirmPasswordNew ? 'text' : 'password'}
                                placeholder={'Confirm new password'}
                                onChange={(e) => setConfirmPasswordNew(e.target.value)}
                                value={confirmPasswordNew}
                                required
                            ></Input>
                            <Line></Line>
                        </div>
                        <i className={cx('check')}>
                            {showConfirmPasswordNew ? (
                                <FontAwesomeIcon onClick={togglePasswordVisibilityConFirmNew} icon={faEyeLowVision} />
                            ) : (
                                <FontAwesomeIcon onClick={togglePasswordVisibilityConFirmNew} icon={faEye} />
                            )}
                        </i>
                    </div>

                    <div className={cx('change-btn')}>
                        <Button loginSystemBtn onClick={handleClick}>
                            Confirm
                        </Button>
                    </div>

                    <Button className={cx('login-btn')}>Forgot password?</Button>
                </div>
            </div>
        </div>
    );
}

export default ChangePasswordForm;
