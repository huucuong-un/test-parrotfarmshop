import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Inputs from '~/Components/Input/Input';
import Line from '~/Components/Line/Line';
import Button from '~/Components/Button/Button';

import { Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import RegisterAPI from '~/Api/RegisterAPI';
import DeliveryInformationAPI from '~/Api/DeliveryInformationAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Register() {
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [fullName, setFullName] = useState(firstName + ' ' + lastName);
    const [phoneNumber, setPhoneNumber] = useState();
    const [status, setStatus] = useState(false);
    const [address, setAddress] = useState('');

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const submitHandler = async () => {
        setLoading(true);
        if (!userName || !email || !password || !confirmPassword) {
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

        if (password !== confirmPassword) {
            toast({
                title: 'Password do no match',
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
            setStatus(true);
            setFullName(firstName + ' ' + lastName);
            setName(userName);
            const dataForUser = {
                userName,
                email,
                password,
                fullName,
                status: true,
                roleId: 1,
            };
            const register = await RegisterAPI.register(dataForUser, config);

            const dataForDeliveryInfo = {
                name,
                phoneNumber,
                address,
                userId: register.userId,
                status: true,
                pickingStatus: true,
            };

            const deliveryInfo = await DeliveryInformationAPI.addNewDeliveryInfo(dataForDeliveryInfo, config);

            toast({
                title: 'Register successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });

            localStorage.setItem('userInfo', JSON.stringify(dataForUser));
            setLoading(false);
            console.log(register);
            console.log(deliveryInfo);
        } catch (error) {
            toast({
                title: 'Error occur!',
                // description: error.register.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* Form */}
                <div className={cx('inner')}>
                    {/* Container 2 */}
                    <div className={cx('input-container')}>
                        <div>
                            <Inputs
                                placeholder="Username"
                                type="text"
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            ></Inputs>
                            <Line></Line>
                        </div>
                        <div>
                            <Inputs
                                placeholder="Email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            ></Inputs>
                            <Line></Line>
                        </div>
                        <div>
                            <Inputs
                                placeholder="Phone number"
                                type="number"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            ></Inputs>
                            <Line></Line>
                        </div>

                        <div>
                            <Inputs
                                placeholder="Address"
                                type="text"
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            ></Inputs>
                            <Line></Line>
                        </div>

                        <div className={cx('dob-container')}>
                            <div className={cx('dob-title')}>
                                <h2>Date of birth</h2>
                            </div>

                            {/* <Inputs dob type={'date'} placeholder="Date of birth"></Inputs> */}
                            <Input className={cx('dob-date')} type="date" />
                        </div>
                    </div>
                    {/*End container 1  */}
                    {/* Container 2 */}
                    <div className={cx('input-container')}>
                        <div>
                            <Inputs
                                placeholder="Firstname"
                                type="text"
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            ></Inputs>
                            <Line></Line>
                        </div>

                        <div>
                            <Inputs
                                placeholder="Lastname"
                                type="text"
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            ></Inputs>
                            <Line></Line>
                        </div>

                        <div>
                            <InputGroup>
                                <Inputs
                                    placeholder="Password"
                                    type={show ? 'text' : 'password'}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <InputRightElement onClick={handleClick} className={cx('showPasswordBtn')}>
                                    <Button size="xl">
                                        {show ? (
                                            <FontAwesomeIcon icon={faEyeSlash} />
                                        ) : (
                                            <FontAwesomeIcon icon={faEye} />
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>

                            <Line></Line>
                        </div>

                        <div>
                            <InputGroup>
                                <Inputs
                                    placeholder="Confirm password"
                                    type={show ? 'text' : 'password'}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <InputRightElement className={cx('showPasswordBtn')} onClick={handleClick}>
                                    <Button size="sm">
                                        {show ? (
                                            <FontAwesomeIcon icon={faEyeSlash} />
                                        ) : (
                                            <FontAwesomeIcon icon={faEye} />
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>

                            <Line></Line>
                        </div>

                        {/* <div className={cx('gender-container')}>
                            <h2>Gender</h2>
                            <div className={cx('gender-input')}>
                                <div className={cx('gender-input-item')}>
                                    <input type="radio" name="check" />
                                    <label>Female</label>
                                </div>
                                <div className={cx('gender-input-item')}>
                                    <input type="radio" name="check" />
                                    <label>Male</label>
                                </div>
                                <div className={cx('gender-input-item')}>
                                    <input type="radio" name="check" />
                                    <label>Others</label>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className={cx('register-container')}></div>
                    <Button className={cx('register-btn')} register onClick={() => submitHandler()} to="">
                        Register
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Register;
