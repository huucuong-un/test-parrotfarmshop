import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShopContext = createContext();

const ShopProvider = ({ children }) => {
    const [user, setUser] = useState();
    // const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);

        // if (!userInfo) navigate('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ShopContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export const ShopState = () => {
    return useContext(ShopContext);
};

export default ShopProvider;
