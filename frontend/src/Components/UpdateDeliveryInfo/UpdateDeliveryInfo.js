import {
    Button,
    Table,
    Input,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Alert,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/Components/UpdateDeliveryInfo/UpdateDeliveryInfo.module.scss';
import DeliveryInformationAPI from '~/Api/DeliveryInformationAPI';
import { ShopState } from '~/context/ShopProvider';

const cx = classNames.bind(styles);

function UpdateDeliveryInfo(props) {
    const [newDeliveryInfo, setNewDeliveryInfo] = useState(props.deliveryInfo);
    const { user } = ShopState();
    const updateDeliveryInfo = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const updatedInfo = await DeliveryInformationAPI.updateDeliveryInfo(
                {
                    id: newDeliveryInfo.id,
                    name: newDeliveryInfo.name,
                    phoneNumber: newDeliveryInfo.phoneNumber,
                    address: newDeliveryInfo.address,
                    status: newDeliveryInfo.status,
                    userId: user.userId,
                    pickingStatus: newDeliveryInfo.pickingStatus,
                },
                config,
            );
            setLoading(false);
            setSubmissionStatus(true);

            props.onUpdate(updatedInfo);
        } catch (error) {
            setSubmissionStatus(false);
            setLoading(false);
            console.error(error);
        }
    };

    const [submissionStatus, setSubmissionStatus] = useState();
    const [loading, setLoading] = useState(false);
    return (
        <div>
            <div className={cx('alert-container')}>
                {(submissionStatus === true && (
                    <Alert status="success" fontSize={12}>
                        <AlertIcon />
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>Update successfully.</AlertDescription>
                    </Alert>
                )) ||
                    (submissionStatus === false && (
                        <Alert status="error" fontSize={12}>
                            <AlertIcon />
                            <AlertTitle>Failed to update!!- </AlertTitle>
                            <AlertDescription>Please check again!!!</AlertDescription>
                        </Alert>
                    ))}
            </div>

            <TableContainer className={cx('table-container')}>
                <Table size="xs ">
                    <Tbody>
                        <Tr>
                            <Td>Contact name</Td>
                            <Td>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newDeliveryInfo.name}
                                    onChange={(e) => setNewDeliveryInfo({ ...newDeliveryInfo, name: e.target.value })}
                                    variant="filled"
                                    placeholder="Contact name"
                                    required
                                />
                            </Td>
                        </Tr>

                        <Tr>
                            <Td>Phone Number</Td>
                            <Td>
                                <Input
                                    type="number"
                                    id="phone-number"
                                    name="phone-number"
                                    value={newDeliveryInfo.phoneNumber}
                                    onChange={(e) =>
                                        setNewDeliveryInfo({ ...newDeliveryInfo, phoneNumber: e.target.value })
                                    }
                                    variant="filled"
                                    placeholder="Phone number"
                                    required
                                />
                            </Td>
                        </Tr>

                        <Tr>
                            <Td>Address</Td>
                            <Td>
                                <Input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={newDeliveryInfo.address}
                                    onChange={(e) =>
                                        setNewDeliveryInfo({ ...newDeliveryInfo, address: e.target.value })
                                    }
                                    variant="filled"
                                    placeholder="Address"
                                    required
                                />
                            </Td>
                        </Tr>
                    </Tbody>

                    <Tfoot>
                        <Tr>
                            <Td></Td>
                            <Td className={cx('submit-btn')}>
                                <Button
                                    type="submit"
                                    className={cx('btn')}
                                    width="100%"
                                    style={{ marginTop: 15 }}
                                    margin="8px"
                                    onClick={() => {
                                        updateDeliveryInfo();
                                        // window.location.reload();
                                    }}
                                    isLoading={loading}
                                    backgroundColor={'#444'}
                                >
                                    Save Change
                                </Button>
                            </Td>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </div>
    );
}

export default UpdateDeliveryInfo;
