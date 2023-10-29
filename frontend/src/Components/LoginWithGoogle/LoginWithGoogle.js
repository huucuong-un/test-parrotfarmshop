import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import LoginAPI from '~/Api/LoginAPI';
import RegisterAPI from '~/Api/RegisterAPI';
import { useToast } from '@chakra-ui/react';
import { ShopState } from '~/context/ShopProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginWithGoogle = () => {
    const toast = useToast();
    const { setUser } = ShopState();
    const navigate = useNavigate();

    const clientId = '365928126558-9glav4t5a2ejp26gv7orp7vsrc5qc689.apps.googleusercontent.com';
    useEffect(() => {
        gapi.load('client:auth2', () => {
            gapi.auth2.init({ clientId: clientId });
        });
    }, []);

    const responseGoogle = async (response) => {
        const data =
            (await LoginAPI.getUserByEmail(response.profileObj.email)) === ''
                ? null
                : await LoginAPI.getUserByEmail(response.profileObj.email);
        if (data == null) {
            try {
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                    },
                };
                const email = response.profileObj.email;

                const dataForUser = {
                    userName: email.split('@')[0],
                    email: response.profileObj.email, // email,
                    password: response.googleId, // password,
                    fullName: response.profileObj.name, // fullName,
                    status: true, // status,
                    roleId: 1, // roleId: 1,
                    imgUrl: response.profileObj.imageUrl,
                };
                console.log(dataForUser);

                const register = await RegisterAPI.register(dataForUser, config);
                setUser(register);
                localStorage.setItem('userInfo', JSON.stringify(register));
                console.log(register);
                navigate('/');
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
        } else {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const dataLogin = await axios.post(
                'http://localhost:8086/api/user/login-with-google/authenticate',
                {
                    email: data.email,
                    password: null,
                },
                config,
            );
            setUser(dataLogin.data);
            localStorage.setItem('userInfo', JSON.stringify(dataLogin.data));
            console.log(dataLogin.data);

            navigate('/');
        }
    };
    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                redirectUri="http://localhost:3000"
            />
        </div>
    );
};

export default LoginWithGoogle;
