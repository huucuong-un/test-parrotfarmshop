import { Button, ButtonGroup } from '@chakra-ui/react';

import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import ParrotAPI from '~/Api/ParrotAPI';
import { useCartStatus } from '~/Components/CartStatusContext/CartStatusContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { logDOM } from '@testing-library/react';

import classNames from 'classnames/bind';
import styles from '~/Pages/ShoppingCart/ShoppingCart.module.scss';

const cx = classNames.bind(styles);

function ShoppingCart() {
    const [carts, setCarts] = useState([]);
    const [choosenCart, setChoosenCart] = useState([]);
    const [updatedCarts, setUpdatedCarts] = useState([]);
    const [checkboxState, setCheckboxState] = useState({});
    const { removeCartItemStatus, setRemoveCartItemStatus } = useCartStatus();

    useEffect(() => {
        const getDataFromLocalStorage = () => {
            const dataJSON = localStorage.getItem('parrot');
            const data = JSON.parse(dataJSON);
            if (data) {
                setCarts(data);
            }
        };

        getDataFromLocalStorage();
    }, []);

    useEffect(() => {
        if (carts.length > 0) {
            const getCountAvailableParrotId = async () => {
                try {
                    const tempUpdatedCarts = [];
                    for (const item of carts) {
                        const availableParrot = await ParrotAPI.countAvailableParrotId(item.colorID);
                        const updatedCartItem = {
                            ...item,
                            available: availableParrot,
                        };
                        tempUpdatedCarts.push(updatedCartItem);
                    }
                    setUpdatedCarts(tempUpdatedCarts);
                    console.log(updatedCarts);
                } catch (error) {
                    console.error(error);
                }
            };

            getCountAvailableParrotId();
        }
    }, [carts]);

    // useEffect(() => {
    //     setCarts(updatedCarts);
    // }, [updatedCarts]);

    const handleIncreaseQuantity = (index) => {
        const temUpdatedCarts = [...updatedCarts];
        const cartItem = temUpdatedCarts[index];
        console.log(cartItem);
        if (cartItem.quantity < cartItem.available) {
            cartItem.quantity += 1;
            setCarts(updatedCarts);
            // Cập nhật local storage
            updateLocalStorage(updatedCarts);
        } else {
            // Hiển thị thông báo hoặc thực hiện hành động khác khi quantity vượt quá available
            console.log('Số lượng đã đạt tối đa');
        }
    };

    // Hàm giảm số lượng
    const handleDecreaseQuantity = (index) => {
        const updatedCarts = [...carts];
        if (updatedCarts[index].quantity > 1) {
            updatedCarts[index].quantity -= 1;
            setCarts(updatedCarts);
            // Cập nhật local storage
            updateLocalStorage(updatedCarts);
        }
    };

    // Hàm cập nhật local storage với dữ liệu mới
    const updateLocalStorage = (updatedCarts) => {
        localStorage.setItem('parrot', JSON.stringify(updatedCarts));
    };

    let totalPrice = 0;

    if (carts != null) {
        // Duyệt qua mảng carts và tính tổng giá cho các cartItem đã được kiểm tra (checked)
        carts.forEach((cartItem) => {
            const checkbox = document.getElementById(`checkbox-${cartItem.id}`);
            if (checkbox) {
                if (checkbox.checked) {
                    // Tính giá của một cart-left-item đã được kiểm tra
                    const itemPrice = cartItem.price * cartItem.quantity;

                    // Cộng vào tổng giá
                    totalPrice += itemPrice;
                }
            }
        });
    } else {
        totalPrice = 0;
    }

    let totalItem = 0;

    if (carts != null) {
        // Duyệt qua mảng carts và tính tổng giá cho các cartItem đã được kiểm tra (checked)
        carts.forEach((cartItem) => {
            const checkbox = document.getElementById(`checkbox-${cartItem.id}`);

            if (checkbox) {
                if (checkbox.checked) {
                    // Cộng vào tổng giá
                    totalItem += 1;
                }
            }
        });
    } else {
        totalPrice = 0;
    }

    // const handleCheckBoxOnClick = (cartItem) => {
    //     const checkbox = document.getElementById(`checkbox-${cartItem.id}`);
    //     if (checkbox) {
    //         if (checkbox.checked) {
    //             // Nếu checkbox đã được kiểm tra, thêm dữ liệu vào choosenCart
    //             setChoosenCart([...choosenCart, cartItem]);
    //         } else {
    //             // Nếu checkbox đã bị uncheck, loại bỏ dữ liệu khỏi choosenCart
    //             const updatedChoosenCart = choosenCart.filter((item) => item.id !== cartItem.id);
    //             setChoosenCart(updatedChoosenCart);
    //         }
    //         console.log(choosenCart);
    //     }

    //     console.log(carts);
    // };

    const handleCheckBoxOnClick = (cartItem) => {
        const updatedCheckboxState = { ...checkboxState };
        updatedCheckboxState[cartItem.id] = !updatedCheckboxState[cartItem.id];
        setCheckboxState(updatedCheckboxState);

        if (updatedCheckboxState[cartItem.id]) {
            // Nếu checkbox đã được đánh dấu, thêm dữ liệu vào choosenCart
            setChoosenCart([...choosenCart, cartItem]);
        } else {
            // Nếu checkbox đã bị bỏ đánh dấu, loại bỏ dữ liệu khỏi choosenCart
            const updatedChoosenCart = choosenCart.filter((item) => item.id !== cartItem.id);
            setChoosenCart(updatedChoosenCart);
        }

        console.log(choosenCart);
    };

    useEffect(() => {
        console.log(choosenCart);
    }, [choosenCart]);

    // const handleRemoveCart = async (index) => {
    //     // Sử dụng filter để tạo một mảng mới loại bỏ đối tượng tại chỉ mục index
    //     const temUpdatedCarts = carts.filter((_, i) => i !== index);

    //     // Cập nhật mảng carts với mảng mới đã loại bỏ đối tượng
    //     setUpdatedCarts(temUpdatedCarts);

    //     // Cập nhật Local Storage để đồng bộ hóa dữ liệu
    //     updateLocalStorage(temUpdatedCarts);

    //     // Tính toán lại thông tin available cho các cartItem còn lại
    //     const updatedCartsWithAvailable = temUpdatedCarts.map((cartItem) => {
    //         // Thực hiện logic để cập nhật available cho cartItem ở đây
    //         const availableParrot = ParrotAPI.countAvailableParrotId(cartItem.colorID);
    //         return {
    //             ...cartItem,
    //             available: availableParrot,
    //         };
    //     });

    const handleRemoveCart = async (index, id) => {
        // const checkbox = document.getElementById(`checkbox-${id}`);
        setRemoveCartItemStatus((prev) => prev + 1);
        const updatedChoosenCart = choosenCart.filter((item) => item.id !== id);
        setChoosenCart(updatedChoosenCart);
        // Sử dụng filter để tạo một mảng mới loại bỏ đối tượng tại chỉ mục index
        const temUpdatedCarts = carts.filter((_, i) => i !== index);

        // Cập nhật mảng carts với mảng mới đã loại bỏ đối tượng
        setUpdatedCarts(temUpdatedCarts);

        // Cập nhật Local Storage để đồng bộ hóa dữ liệu
        updateLocalStorage(temUpdatedCarts);

        const promises = temUpdatedCarts.map((cartItem) => ParrotAPI.countAvailableParrotId(cartItem.colorID));

        // Tính toán lại thông tin available cho các cartItem còn lại
        try {
            // Chờ cho tất cả các Promise được giải quyết
            const availableParrots = await Promise.all(promises);

            // Tạo mảng mới đã cập nhật available
            const updatedCartsWithAvailable = temUpdatedCarts.map((cartItem, i) => ({
                ...cartItem,
                available: availableParrots[i],
            }));

            // Cập nhật state của carts với mảng mới đã cập nhật available
            setCarts(updatedCartsWithAvailable);
        } catch (error) {
            console.error(error);
        }

        // Cập nhật thông tin available cho tất cả các cartItem còn lại
    };

    return (
        <div className={cx('wrapper')}>
            <StartPartPage>Shopping Cart</StartPartPage>

            <div className={cx('inner', 'row')}>
                <div className={cx('inner-left', 'col-lg-9')}>
                    <div className={cx('cart-left-header')}>
                        <div className={cx('cart-left-header-title')}>
                            <h1>My Cart</h1>
                        </div>
                        <div className={cx('cart-left-header-total-quantity')}>
                            <p>{carts ? carts.length : 0} items</p>
                        </div>
                    </div>
                    {updatedCarts &&
                        updatedCarts.map((cartItem, index) => (
                            <div key={index} className={cx('carft-left-item')}>
                                <div className={cx('carft-left-item-checkbox-container')}>
                                    {cartItem.available === 0 || cartItem.quantity > cartItem.available ? (
                                        <input type="checkbox" disabled className={cx('carft-left-item-checkbox')} />
                                    ) : (
                                        <input
                                            id={`checkbox-${cartItem.id}`}
                                            className={cx('carft-left-item-checkbox')}
                                            type="checkbox"
                                            checked={checkboxState[cartItem.id]}
                                            onChange={() =>
                                                handleCheckBoxOnClick({
                                                    id: index,
                                                    img: cartItem.img,
                                                    name: cartItem.name,
                                                    quantity: cartItem.quantity,
                                                    price: cartItem.price,
                                                    color: cartItem.color,
                                                    colorID: cartItem.colorID,
                                                })
                                            }
                                        />
                                    )}
                                </div>
                                <div className={cx('cart-left-item-image')}>
                                    <img src={cartItem.img} alt="cart-left-item-img" />
                                </div>

                                <div className={cx('cart-left-item-info')}>
                                    <div className={cx('cart-left-item-info-name')}>
                                        <p>{cartItem.name}</p>
                                    </div>

                                    <div className={cx('cart-left-item-info-color')}>
                                        <p>{cartItem.color}</p>
                                    </div>
                                </div>

                                <div className={cx('cart-left-item-price')}>
                                    <p>$ {cartItem.price}</p>
                                </div>
                                <div className={cx('cart-left-item-quantity-btn')}>
                                    <div className={cx('cart-left-item-quantity-btn-input')}>
                                        <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                                        <input type="number" value={cartItem.quantity} />
                                        <button onClick={() => handleIncreaseQuantity(index)}>+</button>
                                    </div>
                                    <div className={cx('cart-left-item-available')}>
                                        <p>{cartItem.available} Available</p>
                                    </div>
                                </div>

                                <div className={cx('cart-left-item-price-with-quantity')}>
                                    <p>$ {cartItem.quantity * cartItem.price}</p>
                                </div>

                                <div className={cx('carft-left-item-remove-btn')}>
                                    <button onClick={() => handleRemoveCart(index, cartItem.id)}>x</button>
                                </div>
                            </div>
                        ))}
                </div>

                <div className={cx('inner-right', 'col-lg-3')}>
                    <div className={cx('cart-right-header')}>
                        <h2>Summary</h2>
                    </div>

                    <div className={cx('cart-right-content')}>
                        <div className={cx('cart-right-total')}>
                            <div className={cx('cart-right-total-product')}>
                                <p>{totalItem} item</p>
                            </div>

                            <div className={cx('cart-right-total-price')}>
                                <p>$ {totalPrice.toFixed(2)}</p>
                            </div>
                        </div>

                        {/* <div className={cx('cart-right-code')}>
                            <p>Give Code</p>
                            <div className={cx('input-container')}>
                                <input type="text" placeholder="Enter code..." />
                                <div className={cx('icon')}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </div>
                            </div>
                        </div> */}

                        <div className={cx('cart-right-final')}>
                            <div className={cx('cart-right-final-title')}>
                                <p>Total Price</p>
                            </div>
                            <div className={cx('cart-right-final-price')}>
                                <p>$ {totalPrice.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('check-out-btn')}>
                        {choosenCart.length === 0 ? (
                            <Link to="">
                                <Button
                                    className={cx('check-out-disable')}
                                    colorScheme="yellow"
                                    size="lg"
                                    width={300}
                                    height={20}
                                    fontSize={16}
                                    disabled
                                >
                                    Check Out
                                </Button>
                            </Link>
                        ) : (
                            <Link to="/payment" state={choosenCart}>
                                <Button colorScheme="yellow" size="lg" width={300} height={20} fontSize={16}>
                                    Check Out
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;
