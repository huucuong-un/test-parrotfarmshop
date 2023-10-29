import {
    Container,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Switch,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

import DeliveryInformation from '~/Api/DeliveryInformationAPI';
import OrderAPI from '~/Api/OrderAPI';

import classNames from 'classnames/bind';
import styles from '~/Pages/StaffOrderManagement/StaffOrderManagement.module.scss';

const cx = classNames.bind(styles);

function StaffOrderManagement() {
    const [orders, setOrders] = useState();
    const [sort, setSort] = useState({
        page: 1,
        limit: 12,
        email: null,
        phone: null,
        date: null,
        sortDate: null,
        sortPrice: null,
    });
    const [combineData, setCombineData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const OverlayOne = () => <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [overlay, setOverlay] = React.useState(<OverlayOne />);

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    const handlePageChange = (newPage) => {
        setSort({
            page: newPage,
            limit: 12,
            email: sort.email,
            phone: sort.phone,
            date: sort.date,
            sortDate: sort.sortDate,
            sortPrice: sort.sortPrice,
        });

        setPage(newPage);
    };

    useEffect(() => {
        const getOrderWithUser = async () => {
            try {
                const orderList = await OrderAPI.searchByEmailAndPhone(sort);
                setOrders(orderList.listResult);
                setTotalPage(orderList.totalPage);
            } catch (error) {
                console.error(error);
            }
        };

        getOrderWithUser();
    }, [sort]);

    useEffect(() => {
        const getDelByOrderId = async () => {
            const data = [];
            try {
                for (const item of orders) {
                    const orderList = { ...item };
                    orderList.deliveryInformation = await DeliveryInformation.getOneById(
                        item.orderDTO.deliveryInformationId,
                    );
                    data.push(orderList);
                }
            } catch (error) {
                console.error(error);
            }
            setCombineData(data);
        };

        getDelByOrderId();
    }, [orders]);

    const handleClear = () => {
        setSort({
            page: 1,
            limit: 12,
            email: null,
            phone: null,
            date: null,
            sortDate: null,
            sortPrice: null,
        });
    };

    useEffect(() => {
        console.log(sort);
    }, [sort]);

    useEffect(() => {
        console.log(totalPage);
    }, [totalPage]);

    useEffect(() => {
        console.log(page);
    }, [page]);

    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <div className={cx('title')}>
                <h1>Order</h1>
            </div>
            <div className={cx('sort-space')}>
                <FontAwesomeIcon icon={faArrowsRotate} className={cx('refresh-icon')} onClick={handleClear} />
                <input type="email" placeholder="Mail" onChange={(e) => setSort({ ...sort, email: e.target.value })} />
                <input type="tel" placeholder="Phone" onChange={(e) => setSort({ ...sort, phone: e.target.value })} />
                <input type="date" onChange={(e) => setSort({ ...sort, date: e.target.value })} />

                <select name="status" id="status">
                    <option value="" disabled selected>
                        Status
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <select name="price" id="price" onChange={(e) => setSort({ ...sort, sortDate: e.target.value })}>
                    <option value="" disabled selected>
                        Sort Date
                    </option>
                    <option value="DDESC">Newest</option>
                    <option value="DASC">Oldest</option>
                </select>
                <select name="price" id="price" onChange={(e) => setSort({ ...sort, sortPrice: e.target.value })}>
                    <option value="" disabled selected>
                        Price
                    </option>
                    <option value="PDESC">Highest</option>
                    <option value="PASC">Lowest</option>
                </select>
            </div>
            <TableContainer className={cx('table-container')}>
                <Table size="lg">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Customer Name</Th>
                            <Th>Mail</Th>
                            <Th>Phone</Th>
                            <Th>Create At</Th>
                            <Th>Price</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {combineData &&
                            combineData.map((order, index) => (
                                <Tr key={index}>
                                    <Td>{order.orderDTO.id}</Td>
                                    <Td>{order.userDTO.fullName}</Td>
                                    <Td>{order.userDTO.email}</Td>
                                    <Td>{order.deliveryInformation.phoneNumber}</Td>
                                    <Td>{formatDate(new Date(order.orderDTO.createdDate))}</Td>
                                    <Td>{order.orderDTO.totalPrice}</Td>
                                    <Td>
                                        {/* {order.orderDTO.status ? <Switch size="lg" isChecked /> : <Switch size="lg" />} */}
                                        <Button
                                            colorScheme="green"
                                            onClick={() => {
                                                setOverlay(<OverlayOne />);
                                                onOpen();
                                            }}
                                        >
                                            Update
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <div className={cx('button-pagination')}>
                <button disabled={page <= 1} onClick={() => handlePageChange(page - 1)} colorScheme="pink">
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                {Array.from({ length: totalPage }, (_, index) => (
                    <p key={index} className={cx('number-page')} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </p>
                ))}
                <button disabled={page === totalPage} onClick={() => handlePageChange(page + 1)} colorScheme="pink">
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </div>

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody></ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
}

export default StaffOrderManagement;
