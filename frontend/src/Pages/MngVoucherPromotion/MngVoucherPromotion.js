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
    Textarea,
    Input,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Stack,
} from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import PromotionAPI from '~/Api/PromotionAPI';
import styles from '~/Pages/MngVoucherPromotion/MngVoucherPromotion.module.scss';

const cx = classNames.bind(styles);

function MngVoucherPromotion() {
    const [voucherList, setVoucherList] = useState([]);
    const [vinh, setVinh] = useState(true);
    const [show, setShow] = useState(false);
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState(false);
    const [addStatus, setAddStatus] = useState(1);
    const [addFail, setAddFail] = useState(1);
    const [submitStatus, setSubmitStatus] = useState();

    useEffect(() => {
        const getVoucherList = async () => {
            try {
                const voucherList = await PromotionAPI.getAll();
                console.log(voucherList);
                setVoucherList(voucherList);
                setVinh(false);
            } catch (error) {
                console.error(error);
            }
        };

        if (vinh) {
            getVoucherList();
            setVinh(false);
        }
    }, [vinh]);

    useEffect(() => {
        const addPromotion = async () => {
            try {
                const data = {
                    code: code,
                    description: description,
                    value: value,
                    startDate: startDate,
                    endDate: endDate,
                    status: status,
                };

                const add = await PromotionAPI.add(data);
                setVinh(true);
            } catch (error) {
                console.error(error);
            }
        };

        addPromotion();
    }, [addStatus]);

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    const changeStatus = async (id, index) => {
        const updatedVoucher = [...voucherList];
        updatedVoucher[index].status = !updatedVoucher[index].status;
        const change = await PromotionAPI.changeStatus(id);
        setVoucherList(updatedVoucher);
        setVinh(true);
    };

    const handleShow = () => {
        setShow(!show);
    };

    const handleSave = () => {
        if (code === '' || description === '' || value === '' || startDate === '' || endDate === '') {
            setAddFail((prev) => prev + 1);
            setSubmitStatus(false);
            setTimeout(() => {
                setSubmitStatus();
            }, 50000);
        } else {
            setAddStatus((prev) => prev + 1);
            setSubmitStatus(true);
            setTimeout(() => {
                setSubmitStatus();
            }, 50000);
        }
    };

    const handleSwitch = () => {
        console.log('Switch');
        if (status === false) {
            setStatus(true);
        } else {
            setStatus(false);
        }
    };

    useEffect(() => {
        console.log(status);
    }, [status]);

    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <div className={cx('title')}>
                <h1>Promotions</h1>
            </div>
            <div className={cx('add-btn')}>
                <Button onClick={handleShow} colorScheme="green" size="lg">
                    Add
                    <span className={cx('span-icon', { 'rotate-icon': show })}>
                        {show ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </span>
                </Button>
            </div>

            {(submitStatus === true && (
                <Stack spacing={3} className={cx('alert')}>
                    <Alert status="success">
                        <AlertIcon />
                        There was an error processing your request
                    </Alert>
                </Stack>
            )) ||
                (submitStatus === false && (
                    <Stack spacing={3}>
                        <Alert status="error">
                            <AlertIcon />
                            There was an error processing your request
                        </Alert>
                    </Stack>
                ))}

            {show ? (
                <TableContainer paddingTop={10} paddingBottom={10}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th colSpan={2}>New Voucher</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Voucher Code</Td>
                                <Td>
                                    <Input
                                        type="text"
                                        borderColor="black"
                                        placeholder="Code..."
                                        fontSize={18}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Description</Td>
                                <Td>
                                    <Textarea
                                        borderColor="black"
                                        placeholder="Description..."
                                        fontSize={18}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Value</Td>
                                <Td>
                                    <Input
                                        type="number"
                                        borderColor="black"
                                        placeholder="Value..."
                                        fontSize={18}
                                        onChange={(e) => setValue(e.target.value)}
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Start Date</Td>
                                <Td>
                                    <Input
                                        type="date"
                                        borderColor="black"
                                        fontSize={18}
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>End Date</Td>
                                <Td>
                                    <Input
                                        type="date"
                                        borderColor="black"
                                        fontSize={18}
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Status</Td>
                                <Td>
                                    <Switch size="lg" colorScheme="green" onChange={handleSwitch}></Switch>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                    <Button colorScheme="green" className={cx('save-btn')} fontSize={18} onClick={handleSave}>
                        Save
                    </Button>
                </TableContainer>
            ) : (
                <></>
            )}
            <div className={cx('sort-space')}>
                <select name="status" id="status">
                    <option value="" disabled selected>
                        Rating
                    </option>

                    <option value="active">1</option>
                    <option value="active">2</option>
                    <option value="active">3</option>
                    <option value="active">4</option>
                    <option value="active">5</option>
                </select>

                <select name="status" id="status">
                    <option value="" disabled selected>
                        Status
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <input type="date" />
                <select name="price" id="price">
                    <option value="" disabled selected>
                        Price
                    </option>
                </select>

                <button></button>
            </div>
            <TableContainer>
                <Table size="lg">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Voucher Code</Th>
                            <Th>Description</Th>
                            <Th>Create at</Th>
                            <Th>Start date</Th>
                            <Th>End date</Th>
                            <Th>Value</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {voucherList &&
                            voucherList.map((voucher, index) => (
                                <Tr key={index}>
                                    <Td>{voucher.id}</Td>
                                    <Td>{voucher.code}</Td>
                                    <Td>{voucher.description}</Td>
                                    <Td>{formatDate(new Date(voucher.createdDate))}</Td>
                                    <Td>{formatDate(new Date(voucher.startDate))}</Td>
                                    <Td>{formatDate(new Date(voucher.endDate))}</Td>
                                    <Td>{voucher.value}</Td>
                                    <Td>
                                        <Switch
                                            size="lg"
                                            isChecked={voucher.status}
                                            colorScheme="green"
                                            onChange={() => changeStatus(voucher.id, index)}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default MngVoucherPromotion;
