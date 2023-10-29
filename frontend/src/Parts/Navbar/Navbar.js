import styles from '~/Parts/Navbar/Navbar.module.scss';
import classNames from 'classnames/bind';

import { Button as Buttons, ButtonGroup } from '@chakra-ui/react';

//tippy
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/Components/Popper';

//assets
import logo from '~/Assets/image/Logo/2(5).png';

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Button from '~/Components/Button/Button';
import { useEffect, useState } from 'react';
import { ShopState } from '~/context/ShopProvider';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useCartStatus } from '~/Components/CartStatusContext/CartStatusContext';
import GoogleTranslate from '~/Components/gg/gg';

const cx = classNames.bind(styles);

function Navbar() {
    const [loggedUser, setLoggedUser] = useState();
    const { user } = ShopState();

    const navigate = useNavigate();

    const { addToCartStatus } = useCartStatus();
    const { removeCartItemStatus } = useCartStatus();

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/login-user');
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    }, []);

    const activeNavs = [
        {
            title: 'PRODUCT',
        },
        {
            title: 'SERVICE',
        },
        {
            title: 'ABOUT',
        },
        {
            title: 'FAQS',
        },
    ];

    const MENU_ITEMS_PRODUCT = [
        {
            title: 'Parrot',
            to: '/parrot-product',
        },
        {
            title: 'Nest',
            to: '/species-selection',
        },
    ];

    const MENU_ITEMS_SERVICE = [
        {
            title: 'Hatching',
            to: '/hatching',
        },
        {
            title: 'Bird Care',
            to: '/birdCare',
        },
    ];

    /* {activeNavs.map((activeNav, index) => {
                                return (
                                    <Button className={cx('nav-bottom-item')} text key={index}>
                                        {activeNav.title}
                                    </Button>
                                );
                            })} */

    const [carts, setCarts] = useState([]);
    const [quanityOfCart, setQuanityOfCart] = useState(carts ? carts.length : 0);

    useEffect(() => {
        const dataJSON = localStorage.getItem('parrot');
        const data = JSON.parse(dataJSON);
        setCarts(data);
    }, [addToCartStatus]);

    useEffect(() => {
        setQuanityOfCart(carts ? carts.length : 0);
    }, [carts]);

    useEffect(() => {
        const dataJSON = localStorage.getItem('parrot');
        const data = JSON.parse(dataJSON);
        setCarts(data);
    }, [removeCartItemStatus]);

    // useEffect(() => {
    //     console.log(removeCartItemStatus);
    // }, [removeCartItemStatus]);

    // useEffect(() => {
    //     console.log(addToCartStatus);
    // }, [addToCartStatus]);

    // Hàm cập nhật local storage với dữ liệu mới
    const updateLocalStorage = (updatedCarts) => {
        localStorage.setItem('parrot', JSON.stringify(updatedCarts));
    };

    const showProfile = () => {
        navigate('/profile');
    };

    // Tạo biến để lưu tổng giá
    let totalPrice = 0;

    if (carts != null) {
        // Duyệt qua mảng carts và tính tổng giá
        carts.forEach((cartItem) => {
            // Tính giá của một cart-left-item
            const itemPrice = cartItem.price * cartItem.quantity;

            // Cộng vào tổng giá
            totalPrice += itemPrice;
        });
    } else {
        totalPrice = 0;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('nav-top')}>
                    <div className={cx('nav-top-btn-left')}>
                        {user ? (
                            <>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    w="90%"
                                    p="5px 10px 5px 10px"
                                >
                                    <Menu>
                                        <MenuButton as={Button}>
                                            <Avatar size="lg" cursor="pointer" name={user.userName} src={user.imgUrl} />
                                        </MenuButton>
                                        <MenuList mt={20} ml={20} className={cx('profile-list')}>
                                            <MenuItem padding={5} onClick={showProfile}>
                                                My Profile
                                            </MenuItem>
                                            <MenuDivider color={'#ccc'} />
                                            <MenuItem onClick={logoutHandler} padding={5}>
                                                Logout
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                    <span>{user.userName}</span>
                                </Box>

                                {/* <Button className={cx('nav-top-btn-left-register')} to="/register">
                                    View Profile
                                </Button>
                                <Button className={cx('nav-top-btn-left-login')} text to="/loginUser">
                                    Logout
                                </Button> */}
                            </>
                        ) : (
                            <>
                                <Button className={cx('nav-top-btn-left-register')} to="/register">
                                    Register
                                </Button>
                                <Button className={cx('nav-top-btn-left-login')} text to="/login-user">
                                    Login
                                </Button>
                            </>
                        )}
                    </div>
                    <Link className={cx('logo-container')} to="/">
                        <img className={cx('logo')} src={logo} alt="Logo" />
                    </Link>
                    <div className={cx('active-right')}>
                        <Button
                            text
                            className={cx('language-and-cart')}
                            leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faGlobe} />}
                        >
                            Language {/* <GoogleTranslate></GoogleTranslate> */}
                        </Button>
                        <Tippy
                            interactive
                            // delay={[0, 700]}
                            placement="bottom"
                            render={(attrs) => (
                                <div className={cx('mini-nav-result')} tabIndex="-1" {...attrs}>
                                    <PopperWrapper>
                                        <div className={cx('cart-item-container')}>
                                            <div className={cx('cart-up')}>
                                                {carts &&
                                                    carts.map((cartItem, index) => (
                                                        <div key={index} className={cx('cart-item')}>
                                                            <div className={cx('cart-item-img')}>
                                                                <img src={cartItem.img} alt="cart-item-img" />
                                                            </div>
                                                            <div className={cx('cart-item-info')}>
                                                                <p className={cx('cart-item-name')}>{cartItem.name}</p>
                                                                <p className={cx('cart-item-qty')}>{cartItem.color}</p>
                                                                <p className={cx('cart-item-qty')}>
                                                                    x{cartItem.quantity}
                                                                </p>
                                                            </div>
                                                            <div className={cx('cart-item-price')}>
                                                                <p>$ {cartItem.price}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                            <div className={cx('cart-down')}>
                                                <div className={cx('cart-down-header')}>
                                                    <div className={cx('cart-down-header-tilte')}>
                                                        <p>Subtotal</p>
                                                    </div>
                                                    <div className={cx('cart-down-header-total-price')}>
                                                        <p>$ {totalPrice.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                                <Link to="/shopping-cart">
                                                    <Buttons
                                                        colorScheme="blue"
                                                        size="lg"
                                                        width={400}
                                                        height={45}
                                                        fontSize={16}
                                                    >
                                                        View Cart
                                                    </Buttons>
                                                </Link>
                                            </div>
                                        </div>
                                    </PopperWrapper>
                                </div>
                            )}
                        >
                            <div>
                                <Button
                                    text
                                    className={cx('language-and-cart')}
                                    leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faCartShopping} />}
                                >
                                    Cart
                                    {quanityOfCart > 0 && (
                                        <div className={cx('cart-quantity')}>
                                            <p>{quanityOfCart}</p>
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </Tippy>
                    </div>
                </div>
                <div className={cx('nav-bottom')}>
                    <div className={cx('subnav')}>
                        <Link to="/parrot-product" className={cx('subnavbtn')}>
                            PARROT
                        </Link>
                    </div>
                    <div className={cx('subnav')}>
                        <Link to="/add-parrot-nest-service" className={cx('subnavbtn')}>
                            NEST
                        </Link>
                    </div>
                    <div className={cx('subnav')}>
                        <Link to="/about-us" className={cx('subnavbtn')}>
                            ABOUT
                        </Link>
                    </div>
                    <div className={cx('subnav')}>
                        <Link to="/faqs" className={cx('subnavbtn')}>
                            FAQS
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
