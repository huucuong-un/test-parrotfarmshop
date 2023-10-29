// CartStatusContext.js
import React, { createContext, useContext, useState } from 'react';

const CartStatusContext = createContext();

export function CartStatusProvider({ children }) {
    const [addToCartStatus, setAddToCartStatus] = useState(0);
    const [removeCartItemStatus, setRemoveCartItemStatus] = useState(0);
    const [paymentStatus, setPaymentStatus] = useState(0);

    return (
        <CartStatusContext.Provider
            value={{
                addToCartStatus,
                setAddToCartStatus,
                removeCartItemStatus,
                setRemoveCartItemStatus,
                paymentStatus,
                setPaymentStatus,
            }}
        >
            {children}
        </CartStatusContext.Provider>
    );
}

export function useCartStatus() {
    return useContext(CartStatusContext);
}
