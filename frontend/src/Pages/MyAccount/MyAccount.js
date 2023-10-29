import React, { useEffect, useState } from 'react';
import { ShopState } from '~/context/ShopProvider';
import styles from './MyAccount.module.scss';
import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.css';
import {
    Avatar,
    Box,
    Container,
    Image,
    List,
    ListItem,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    UnorderedList,
} from '@chakra-ui/react';
import { Col, Row } from 'react-bootstrap';
import { useTransform } from 'framer-motion';
import UserProfileNew from '../UserProfileNew/UserProfileNew';
import DeliveryInformation from '../DeliveryInformation/DeliveryInformation';
import OrderHistory from '../OrderHistory/OrderHistory';
import OrderHistoryNew from '../OrderHistoryNew/OrderHistoryNew';
import DeliveryInformationForUserProfile from '../DeliveryInformationForUserProfile/DeliveryInformationForUserProfile';

const cx = classNames.bind(styles);

function MyAccount() {
    const { user } = ShopState();
    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('userInfo')));

    return (
        <Container className={cx('container')} maxW="container.xl">
            <Tabs variant="enclosed" className={cx('tab-container')}>
                <TabList className={cx('tab-heading')}>
                    <Tab className={cx('tab-heading-item')}>
                        <Text className={cx('tab-heading-text')}>User Profile</Text>
                    </Tab>
                    <Tab className={cx('tab-heading-item')}>
                        <Text className={cx('tab-heading-text')}>Delivery Info</Text>
                    </Tab>
                    <Tab className={cx('tab-heading-item')}>
                        <Text className={cx('tab-heading-text')}>Order History</Text>
                    </Tab>
                </TabList>
                <TabPanels minHeight="600px">
                    <TabPanel>
                        <UserProfileNew></UserProfileNew>
                    </TabPanel>
                    <TabPanel>
                        <DeliveryInformationForUserProfile></DeliveryInformationForUserProfile>
                    </TabPanel>
                    <TabPanel>
                        {/* <OrderHistory></OrderHistory> */}
                        <OrderHistoryNew></OrderHistoryNew>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
}

export default MyAccount;
