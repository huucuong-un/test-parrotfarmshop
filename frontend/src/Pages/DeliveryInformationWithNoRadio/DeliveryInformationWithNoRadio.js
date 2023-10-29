import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Table, Box, Center, Flex, Radio, Square, Text, textDecoration } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DeliveryInformationAPI from '~/Api/DeliveryInformationAPI';
import classNames from 'classnames/bind';
import styles from '~/Pages/DeliveryInformationWithNoRadio/DeliveryInformationWithNoRadio.module.scss';

const cx = classNames.bind(styles);

const DeliveryInformationWithNoRadio = ({ userId }) => {
    const [deliveryInfo, setDeliveryInfo] = useState([]);

    const [reloadStatus, setReloadStatus] = useState(true);

    // Load initial state from localStorage or use an empty array if no data is saved
    useEffect(() => {
        const getAllDeliveryInfoByCustomerId = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const data = await DeliveryInformationAPI.getAll(userId, config);

                setDeliveryInfo(data);

                // console.log(data[index].id);
            } catch (error) {
                console.error(error);
            }
        };
        if (reloadStatus) {
            getAllDeliveryInfoByCustomerId();
            setReloadStatus(false);
        }
        getAllDeliveryInfoByCustomerId();
    }, [reloadStatus]);

    return (
        <Box className={cx('wrapper')}>
            {deliveryInfo.map((item, itemIndex) => (
                <>
                    <Flex className={cx('delivery-info-item')} id={item.id} key={itemIndex}>
                        <Center w="200px">
                            <Text height="25px" fontWeight="700" opacity={0.6} margin="0">
                                {item.name}
                            </Text>
                        </Center>
                        <Center width="200px">
                            <Text height="25px" margin="0">
                                {item.phoneNumber}
                            </Text>
                        </Center>
                        <Center flex="1">
                            <Text height="25px" margin="0">
                                {item.address}
                            </Text>
                        </Center>
                    </Flex>
                </>
            ))}
        </Box>
    );
};

export default DeliveryInformationWithNoRadio;
