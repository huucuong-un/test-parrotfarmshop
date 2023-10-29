import {
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
import styles from './AdminRoleList.module.scss';
import RoleAPI from '~/Api/RoleAPI';
import AddRole from '../AddRole/AddRole';
import UpdateRole from '~/Components/UpdateRole/UpdateRole';
import axios from 'axios';

const cx = classNames.bind(styles);

const AdminRoleList = () => {
    const [roles, setRoles] = useState([]);
    const toast = useToast();
    const [show, setShow] = useState(false);
    const [reloadStatus, setReloadStatus] = useState(true);
    const [showUpdate, setShowUpdate] = useState(Array(roles.length).fill(false)); // Initialize with false for each item
    useEffect(() => {
        console.log(roles);
        console.log(reloadStatus);
    }, [roles]);
    const handleAdd = (newInfo) => {
        const updatedRole = [...roles];

        updatedRole.unshift(newInfo); // Add newInfo to the beginning of the array

        // Update the state
        setRoles(updatedRole);
    };
    const handleStatus = async (id) => {
        try {
            // Send a request to update the status on the server
            await axios.delete(`http://localhost:8086/api/role/${id}`);

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
    };
    const handleShow = () => {
        setShow(!show);
    };

    useEffect(() => {
        console.log(reloadStatus);
    }, [reloadStatus]);

    const handleShowUpdate = (index) => {
        const updatedShowUpdate = [...showUpdate]; // Create a copy of showUpdate array
        updatedShowUpdate[index] = !updatedShowUpdate[index]; // Toggle the value
        setShowUpdate(updatedShowUpdate); // Update the state
    };

    const handleUpdate = (updatedInfo) => {
        // Find the index of the updated item in the deliveryInfo array
        const index = roles.findIndex((item) => item.id === updatedInfo.id);

        // Create a copy of the deliveryInfo array
        const updatedDeliveryInfo = [...roles];

        // Update the item with the new data
        updatedDeliveryInfo[index] = updatedInfo;

        // Update the state
        setRoles(updatedDeliveryInfo);
    };

    useEffect(() => {
        const loadRoles = async () => {
            try {
                const data = await RoleAPI.getRoles();
                setRoles(data);
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
                    ROLE MANAGEMENT
                </Text>
            </Box>

            <Flex className={cx('add-button')} onClick={handleShow}>
                <FontAwesomeIcon icon={faCirclePlus} />
                <Text className={cx('add-role-text')}>Add role</Text>
            </Flex>
            <div className={cx('fade-container', { show: show })}>
                {show && <AddRole onAdd={handleAdd} w={100}></AddRole>}
            </div>
            <TableContainer width="100%" margin="5% 0">
                <Table variant="simple" fontSize={16}>
                    <TableCaption>Role list</TableCaption>
                    <Thead fontSize={16}>
                        <Tr>
                            <Th>Role Id</Th>
                            <Th>Role Title</Th>
                            <Th>Role Description</Th>
                            <Th>Status</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody fontSize={16}>
                        {roles.map((role, index) => {
                            return (
                                <>
                                    <Tr key={index}>
                                        <Td>{role.id}</Td>
                                        <Td>{role.name}</Td>
                                        <Td>{role.description}</Td>
                                        <Td minWidth={150}>
                                            <div className={cx('haha')}>
                                                <Switch
                                                    onChange={() => handleStatus(index)}
                                                    size="lg"
                                                    isChecked={role.status}
                                                    colorScheme="green"
                                                />
                                                {role.status ? (
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
                                                value={role.status}
                                                onChange={(e) => setRoles({ ...roles, status: e.target.value })}
                                            />
                                        </Td>

                                        <Td onClick={() => handleShowUpdate(index)} className={cx('edit-button')}>
                                            Edit
                                        </Td>
                                    </Tr>
                                    <div className={cx('fade-container', { showUpdate: showUpdate[index] })}>
                                        {showUpdate[index] && <UpdateRole role={role} onUpdate={handleUpdate} />}
                                    </div>
                                </>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AdminRoleList;
