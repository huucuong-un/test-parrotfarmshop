import classNames from 'classnames/bind';
import styles from '~/Pages/Payment/Payment.module.scss';

import StartPartPage from '~/Components/StartPartPage/StartPartPage';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link, useLocation } from 'react-router-dom';
import OrderAPI from '~/Api/OrderAPI';
import PromotionAPI from '~/Api/PromotionAPI';
import DeliveryInformationAPI from '~/Api/DeliveryInformationAPI';
import DeliveryInformation from '../DeliveryInformation/DeliveryInformation';
import { ShopState } from '~/context/ShopProvider';
import { Box, Button, Image } from '@chakra-ui/react';
import Paypal from '~/Assets/image/Payment/Paypal.svg';
import VnPay from '~/Assets/image/Payment/vnpay-seeklogo.com.svg';
import { useCartStatus } from '~/Components/CartStatusContext/CartStatusContext';
import axios from 'axios';
import VnpayAPI from '~/Api/VnpayAPI';
import ParrotSpeciesColorAPI from '~/Api/ParrotSpeciesColorAPI';
import { Text } from '@chakra-ui/react';
import ParrotAPI from '~/Api/ParrotAPI';
import ParrotCoupleAPI from '~/Api/ParrotCoupleAPI';
import NestUsageHistoryAPI from '~/Api/NestUsageHistoryAPI';
import NestAPI from '~/Api/NestAPI';

const cx = classNames.bind(styles);

function Payment() {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [listOrder, setListOrder] = useState([]);
    const location = useLocation();
    const receivedData = location.state;
    console.log(receivedData);
    const navigate = useNavigate();
    const [payStatus, setPayStatus] = useState(false);
    const [selectedDelivery, setSelectedDelivery] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [originTotalPrice, setOriginTotalPrice] = useState(0);
    const [loggedUser, setLoggedUser] = useState();
    const { paymentStatus, setPaymentStatus } = useCartStatus;
    const [discount, setDiscount] = useState(0);
    const [promotion, setPromotion] = useState(null);
    // const { paymentStatus, setPaymentStatus } = useCartStatus;
    const [orderInfo, setOrderInfo] = useState({
        id: 1,
        createdDate: '2023-10-17',
        userID: 2, // Thay thế bằng giá trị thực tế của userID
        deliveryInformationId: null, // Thay thế bằng giá trị thực tế của deliveryInformationId
        promotionID: null, // Thay thế bằng giá trị thực tế của promotionID
        status: true, // Thay thế bằng giá trị thực tế của status
        totalPrice: 100.0, // Thay thế bằng giá trị thực tế của totalPrice
        quantity: 0, // Thay thế bằng giá trị thực tế của quantity
        vnp_OrderInfo: 'Parrot', // Thay thế bằng thông tin đặt hàng thực tế
        vnp_OrderType: '20000', // Thay thế bằng giá trị thực tế của vnp_OrderType
        vnp_TxnRef: null, // Thay thế bằng giá trị thực tế của vnp_TxnRef
    });

    const [checkNest, setCheckNest] = useState(false);

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    }, []);
    useEffect(() => {
        console.log(loggedUser);
    }, [loggedUser]);
    useEffect(() => {
        console.log(orderInfo);
    }, [orderInfo]);

    const { user } = ShopState();

    const handlePaymentSelection = (paymentMethod) => {
        setPaymentMethod(paymentMethod);
        console.log(paymentMethod);
    };

    const handlePayStatus = async () => {
        setPayStatus(true);
        console.log('click');
    };
    const handlePromotionCode = async () => {
        const code = {
            code: document.getElementById('promotionCode').value,
        };
        console.log(code);
        const codeValue = await PromotionAPI.getCode(code);
        if (codeValue.value > 0) {
            setDiscount(originTotalPrice * codeValue.value);
            console.log(codeValue.value);
            setPromotion(codeValue.id);
        } else {
            console.log('code not exist');
        }
    };

    useEffect(() => {
        setTotalPrice(originTotalPrice - discount);
    }, [discount]);
    useEffect(() => {
        setListOrder(receivedData);
    }, []);

    useEffect(() => {
        console.log(payStatus);
    }, [payStatus]);

    useEffect(() => {
        if (receivedData) {
            setListOrder(receivedData);
        }
    }, [receivedData]);

    useEffect(() => {
        try {
            if (listOrder[0].isNest) {
                setCheckNest(true);
            }
        } catch (error) {
            console.error(error);
        }
    }, [listOrder]);

    useEffect(() => {
        console.log(receivedData);
    }, []);

    useEffect(() => {
        console.log(checkNest);
    }, [checkNest]);

    useEffect(() => {
        const updateListOrder = async () => {
            let totalPrice = 0;
            listOrder.forEach((item) => {
                totalPrice += item.price * item.quantity;
                let imgTemp = ParrotSpeciesColorAPI.getImagesByColorId(item.colorID);

                imgTemp.then((result) => {
                    item.img = result[0].imageUrl;
                });
            });
            setTotalPrice(totalPrice);
            setOriginTotalPrice(totalPrice);
        };

        if (listOrder.colorID) {
            updateListOrder();
        }
    }, [listOrder]);

    useEffect(() => {
        const addOrders = async () => {
            if (checkNest == false) {
                try {
                    const cartList = listOrder.map((item, index) => ({
                        speicesId: item.colorID, // Sử dụng item.colorID thay vì receivedData.colorID
                        quantity: item.quantity,
                        type: 'parrot',
                    }));
                    const data = {
                        orderDTO: {
                            // userID: 1,
                            deliveryInformationId: selectedDelivery.id,
                            promotionID: promotion,
                            userID: user.userId,
                            status: 'pending',
                        },
                        cartList: cartList,
                    };

                    // await DeliveryInformationAPI.updatePickingStatus(1, selectedDelivery);

                    await DeliveryInformationAPI.updatePickingStatus(selectedDelivery);
                    const addOrder = await OrderAPI.add(data);

                    const response = await VnpayAPI.add(addOrder);
                    console.log(addOrder);
                    console.log(response);
                    window.location.href = response;
                    if (response.status === 200) {
                        console.log('Payment Sucessful');
                    } else {
                        console.error('payment not successful ', response.status);
                    }

                    console.log('Order added:', addOrder);
                    console.log(data);
                } catch (error) {
                    console.error(error);
                }
            } else {
                try {
                    const addFirstParrot = await ParrotAPI.add(listOrder[0].firstParrot);
                    const addSecondParrot = await ParrotAPI.add(listOrder[0].secondParrot);
                    const addParrotCouple = await ParrotCoupleAPI.add({
                        parrotMaleId: addFirstParrot.gender === true ? addFirstParrot.id : addSecondParrot.id,
                        parrotFemaleId: addSecondParrot.gender === false ? addSecondParrot.id : addFirstParrot.id,
                        status: true,
                    });
                    const getNestBySpeciesID = await NestAPI.findOneBySpeciesId({
                        speciesId: listOrder[0].id,
                    });
                    const addNestUsageHistory = await NestUsageHistoryAPI.add({
                        parrotCoupleId: addParrotCouple.id,
                        nestId: getNestBySpeciesID.id,
                        startDate: null,
                        endDate: null,
                    });
                    const cartList = listOrder.map((item, index) => ({
                        speicesId: addNestUsageHistory.id, // Sử dụng item.colorID thay vì receivedData.colorID
                        quantity: 1,
                        type: 'nest',
                    }));
                    const data = {
                        orderDTO: {
                            // userID: 1,
                            deliveryInformationId: selectedDelivery.id,
                            promotionID: promotion,
                            userID: user.userId,
                            status: 'pending',
                        },
                        cartList: cartList,
                    };

                    // await DeliveryInformationAPI.updatePickingStatus(1, selectedDelivery);

                    await DeliveryInformationAPI.updatePickingStatus(selectedDelivery);
                    const addOrder = await OrderAPI.add(data);

                    const response = await VnpayAPI.add(addOrder);
                    console.log(addOrder);
                    console.log(response);
                    window.location.href = response;
                    if (response.status === 200) {
                        console.log('Payment Sucessful');
                    } else {
                        console.error('payment not successful ', response.status);
                    }

                    console.log('Order added:', addOrder);
                    console.log(data);
                } catch (error) {
                    console.error(error);
                }
            }
            // setPaymentStatus((prev) => prev + 1);
        };

        if (payStatus) {
            addOrders();
            // navigate('/paid-success');
        }
    }, [payStatus]);

    useEffect(() => {
        console.log(listOrder);
    }, [listOrder]);

    const handlePayment = async () => {
        try {
            const data = {
                id: orderInfo.id,
                createdDate: orderInfo.createdDate,
                userID: orderInfo.userID,
                deliveryInformationId: orderInfo.deliveryInformationId,
                promotionID: orderInfo.promotionID,
                status: orderInfo.status,
                totalPrice: orderInfo.totalPrice,
                quantity: orderInfo.quantity,
                vnp_OrderInfo: orderInfo.vnp_OrderInfo,
                vnp_OrderType: orderInfo.vnp_OrderType,
                vnp_TxnRef: orderInfo.vnp_TxnRef,
            };
            const response = await VnpayAPI.add(data);

            console.log(response);
            window.location.href = response;
            if (response.status === 200) {
                console.log('Payment Sucessful');
            } else {
                console.error('payment not successful ', response.status);
            }

            // setPaymentStatus(true);
        } catch (error) {
            console.error('Error:', error);
            // setPaymentStatus(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <StartPartPage payment>Payment</StartPartPage>

            <div className={cx('payment', 'row')}>
                <div className={cx('payment-method', 'col-md-8')}>
                    <div className={cx('payment-method-title')}>
                        <p>Payment method</p>
                    </div>

                    <div className={cx('payment-method-item-container')}>
                        <button className={cx('payment-method-item')} onClick={() => handlePayment()}>
                            <Box width="100%" height="24px">
                                <Image src={Paypal} margin="auto auto" height="100%"></Image>
                            </Box>
                        </button>
                        <button className={cx('payment-method-item')} onClick={() => handlePaymentSelection('vnpay')}>
                            <Box width="100%" height="24px">
                                <Image src={VnPay} margin="auto auto" height="100%"></Image>
                            </Box>
                        </button>
                    </div>
                    <div className={cx('delivery-info-component')}>
                        <DeliveryInformation
                            selectedDelivery={selectedDelivery}
                            setSelectedDelivery={setSelectedDelivery}
                        />
                    </div>
                </div>
                <div className={cx('payment-detail', 'col-md-4')}>
                    <Box className={cx('payment-detail-container')}>
                        {listOrder &&
                            listOrder.map((item, index) => (
                                <div key={index} className={cx('payment-detail-items')}>
                                    <Text fontWeight={600}>{checkNest ? 'Nest' : 'Parrot'} Service</Text>
                                    <div className={cx('payment-detail-items-info')}>
                                        <div className={cx('payment-detail-items-img')}>
                                            <img src={item.img} alt="product" />
                                        </div>
                                        <p className={cx('payment-detail-items-quantity')}>
                                            x{checkNest ? 1 : item.quantity}
                                        </p>
                                        <p className={cx('payment-detail-items-price')}>
                                            $ {checkNest ? item.nestPrice.price : item.price * item.quantity}
                                        </p>
                                    </div>
                                </div>
                            ))}

                        <div className={cx('payment-detail-promotions')}>
                            <input
                                className={cx('payment-detail-promotions-input')}
                                id="promotionCode"
                                type="text"
                                placeholder="Discount code"
                            />
                            <button onClick={() => handlePromotionCode()}>Apply</button>
                        </div>

                        <div className={cx('payment-detail-money')}>
                            <div className={cx('payment-detail-money-item')}>
                                <p className={cx('payment-detail-money-item-title')}>Subtotal</p>
                                <p className={cx('payment-detail-money-item-price')}>$ {originTotalPrice}</p>
                            </div>

                            <div className={cx('payment-detail-money-item')}>
                                <p className={cx('payment-detail-money-item-title')}>Discount</p>
                                <p className={cx('payment-detail-money-item-price')}>$ {discount}</p>
                            </div>

                            <div className={cx('payment-detail-money-item', 'total')}>
                                <p className={cx('payment-detail-money-item-title', 'bold')}>Total</p>
                                <p className={cx('payment-detail-money-item-price')}>$ {totalPrice}</p>
                            </div>
                        </div>
                        <Button
                            colorScheme="blue"
                            height="50px"
                            width="100%"
                            className={cx('pay-btn')}
                            fontSize="16px"
                            onClick={() => handlePayStatus()}
                        >
                            Pay
                        </Button>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default Payment;
