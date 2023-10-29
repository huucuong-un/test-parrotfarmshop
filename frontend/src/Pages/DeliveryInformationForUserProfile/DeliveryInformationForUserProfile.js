import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Table, Box, Center, Flex, Radio, Square, Text, textDecoration } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DeliveryInformationAPI from '~/Api/DeliveryInformationAPI';
import classNames from 'classnames/bind';
import styles from '~/Pages/DeliveryInformation/DeliveryInformation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import AddMoreDeliveryInfo from '~/Components/AddMoreDeliveryInfo/AddMoreDeliveryInfo';
import UpdateDeliveryInfo from '~/Components/UpdateDeliveryInfo/UpdateDeliveryInfo';
import { ShopState } from '~/context/ShopProvider';

const cx = classNames.bind(styles);

const DeliveryInformationForUserProfile = ({ selectedDelivery, setSelectedDelivery }) => {
    const [deliveryInfo, setDeliveryInfo] = useState([]);
    const [selectedDeliveryId, setSelectedDeliveryId] = useState();
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(Array(deliveryInfo.length).fill(false)); // Initialize with false for each item
    const { user } = ShopState();
    const [reloadStatus, setReloadStatus] = useState(true);

    const handleShow = () => {
        setShow(!show);
    };

    const handleShowUpdate = (index) => {
        const updatedShowUpdate = [...showUpdate]; // Create a copy of showUpdate array
        updatedShowUpdate[index] = !updatedShowUpdate[index]; // Toggle the value
        setShowUpdate(updatedShowUpdate); // Update the state
    };

    const handleUpdate = (updatedInfo) => {
        // Find the index of the updated item in the deliveryInfo array
        const index = deliveryInfo.findIndex((item) => item.id === updatedInfo.id);

        // Create a copy of the deliveryInfo array
        const updatedDeliveryInfo = [...deliveryInfo];

        // Update the item with the new data
        updatedDeliveryInfo[index] = updatedInfo;

        // Update the state
        setDeliveryInfo(updatedDeliveryInfo);
    };

    const handleAdd = (newInfo) => {
        // Create a copy of the deliveryInfo array
        const updatedDeliveryInfo = [...deliveryInfo];

        // Add the new info to the array
        updatedDeliveryInfo.push(newInfo);

        // Update the state
        setDeliveryInfo(updatedDeliveryInfo);
        if (deliveryInfo.length === 1) {
            setSelectedDeliveryId(deliveryInfo[0].id);
            selectedDelivery(deliveryInfo[0]);
        }
    };

    // Load initial state from localStorage or use an empty array if no data is saved
    useEffect(() => {
        const getAllDeliveryInfoByCustomerId = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const data = await DeliveryInformationAPI.getAll(user.userId, config);

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
                    <Flex
                        className={cx('delivery-info-item')}
                        id={item.id}
                        onClick={() => handleShowUpdate(itemIndex)}
                        key={itemIndex}
                    >
                        <Center w="100px">
                            <Text fontWeight="700" opacity={0.6}>
                                {item.name}
                            </Text>
                        </Center>
                        <Square size="100px">
                            <Text>{item.phoneNumber}</Text>
                        </Square>
                        <Center flex="1">
                            <Text>{item.address}</Text>
                        </Center>

                        <Text onClick={() => handleShowUpdate(itemIndex)} className={cx('edit-button')}>
                            Edit
                        </Text>
                    </Flex>
                    <div className={cx('fade-container ', { showUpdate: showUpdate[itemIndex] })}>
                        {showUpdate[itemIndex] && (
                            <UpdateDeliveryInfo deliveryInfo={item} onUpdate={handleUpdate} w={100} />
                        )}
                    </div>
                </>
            ))}

            <div className={cx('information')}>
                <FontAwesomeIcon onClick={handleShow} icon={faCirclePlus} size="xl" className={cx('add-button')} />
                <Text onClick={handleShow} className={cx('add-button-text')}>
                    Add new contact
                </Text>
            </div>
            <div className={cx('fade-container', { show: show })}>
                {show && <AddMoreDeliveryInfo onAdd={handleAdd} w={100}></AddMoreDeliveryInfo>}
            </div>
        </Box>
    );
};

export default DeliveryInformationForUserProfile;
