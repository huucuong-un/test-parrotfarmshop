import {
    Avatar,
    Box,
    Container,
    Flex,
    Input,
    Switch,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    useToast,
} from '@chakra-ui/react';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminAccountList.module.scss';

import AddRole from '../AddRole/AddRole';
import UpdateRole from '~/Components/UpdateRole/UpdateRole';
import axios from 'axios';

import AccountAPI from '~/Api/AccountAPI';
import AddAccount from '~/Components/AddAccount/AddAccount';
import RoleAPI from '~/Api/RoleAPI';
import DeliveryInformationWithNoRadio from '../DeliveryInformationWithNoRadio/DeliveryInformationWithNoRadio';

const cx = classNames.bind(styles);

const AdminAccountList = () => {
    const [accounts, setAccounts] = useState([]);
    const toast = useToast();
    const [show, setShow] = useState(false);
    const [reloadStatus, setReloadStatus] = useState(true);
    const [roles, setRoles] = useState([]);
    const [showDelivery, setShowDelivery] = useState(false);
    const [selectDeliveryId, setSelectDeliveryId] = useState();

    // useEffect(() => {
    //     console.log(accounts);
    //     console.log(reloadStatus);
    // }, [accounts]);
    const handleShowDelivery = (id) => {
        setSelectDeliveryId(id);
        setShowDelivery(!showDelivery); // Update the state
    };
    useEffect(() => {
        const loadRoles = async () => {
            try {
                const data = await RoleAPI.getRoles();
                setRoles(data);
                console.log(data);
            } catch (error) {
                toast({
                    title: 'Error occur!',
                    description: error.response.data.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                });
                console.log(error);
            }
        };
        if (reloadStatus) {
            loadRoles();
            setReloadStatus(false);
        }
        loadRoles();
    }, [reloadStatus]);
    const handleAdd = (newInfo) => {
        const updatedAccount = [...accounts];

        updatedAccount.unshift(newInfo); // Add newInfo to the beginning of the array

        // Update the state
        setAccounts(updatedAccount);
    };
    const handleStatus = async (id) => {
        var userResponse = window.confirm('Are you sure to change status ?');

        if (userResponse) {
            try {
                // Send a request to update the status on the server
                await axios.delete(`http://localhost:8086/api/user/${id}`);

                // If the request is successful, update the state

                setReloadStatus(true);
            } catch (error) {
                toast({
                    title: 'Error occur!',
                    description: error.response.data.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                });
                console.log(error);
            }
        } else {
            // Hành động nếu người dùng chọn "Không"
        }
    };
    const handleShow = () => {
        setShow(!show);
    };

    useEffect(() => {
        const loadRoles = async () => {
            try {
                const data = await AccountAPI.getAccounts();
                setAccounts(data);
            } catch (error) {
                toast({
                    title: 'Error occur!',
                    description: error.response.data.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                });
                console.log(error);
            }
        };
        if (reloadStatus) {
            loadRoles();
            setReloadStatus(false);
        }
        loadRoles();
    }, [reloadStatus]);

    return (
        <Container maxW="container.xl" fontSize={16}>
            <Box>
                <Text fontSize="20px" fontWeight="600" marginTop="5%">
                    ACCOUNT MANAGEMENT
                </Text>
            </Box>

            <Flex className={cx('add-button')} onClick={handleShow}>
                <FontAwesomeIcon icon={faCirclePlus} />
                <Text className={cx('add-role-text')}>Add new account</Text>
            </Flex>
            <div className={cx('fade-container', { show: show })}>
                {show && <AddAccount onAdd={handleAdd} w={100}></AddAccount>}
            </div>
            <br />
            <br />

            <div className={cx('fade-container', { showDelivery: showDelivery })}>
                <h1 style={{ textAlign: 'center' }}>Delivery Info of userId. {selectDeliveryId}</h1>
                {showDelivery && <DeliveryInformationWithNoRadio userId={selectDeliveryId} />}
            </div>

            <TableContainer width="100%" margin="5% 0">
                <Table variant="simple" fontSize={16}>
                    <TableCaption>Account list</TableCaption>
                    <Thead fontSize={16}>
                        <Tr>
                            <Th>User Id</Th>
                            <Th>Img</Th>
                            <Th>Username</Th>
                            <Th>Full Name</Th>
                            <Th>Email</Th>
                            <Th>Gender</Th>

                            <Th>Role</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody fontSize={16}>
                        {accounts.map((account, index) => {
                            return (
                                <>
                                    <Tr key={index} onClick={() => handleShowDelivery(account.id)} cursor="pointer">
                                        <Td>{account.id}</Td>

                                        <Td>
                                            <Avatar size="xl" src={account.imgUrl} />
                                        </Td>
                                        <Td>{account.userName}</Td>
                                        <Td>{account.fullName}</Td>

                                        <Td>{account.email}</Td>
                                        {account.gender === true ? <Td> Male</Td> : <Td>Female</Td>}

                                        {roles.map((role, roleIndex) =>
                                            role.id === account.roleId ? <Td>{role.name}</Td> : <></>,
                                        )}

                                        <Td minWidth={150}>
                                            <div className={cx('haha')}>
                                                <Switch
                                                    onChange={() => handleStatus(account.id)}
                                                    size="lg"
                                                    isChecked={account.status}
                                                    colorScheme="green"
                                                />
                                                {account.status ? (
                                                    <Text color="green" fontSize={12} overflow="hidden">
                                                        On Processing
                                                    </Text>
                                                ) : (
                                                    <Text color="red" fontSize={12} overflow="hidden">
                                                        Disabled
                                                    </Text>
                                                )}
                                            </div>
                                            <Input
                                                type="hidden"
                                                id="status"
                                                name="status"
                                                variant="filled"
                                                value={account.status}
                                                onChange={(e) => setAccounts({ ...accounts, status: e.target.value })}
                                            />
                                        </Td>
                                    </Tr>
                                </>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AdminAccountList;
