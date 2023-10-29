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

import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/Pages/AdFAQSManagement/AdFAQSManagement.module.scss';
import FAQSAPI from '~/Api/FAQSAPI';

const cx = classNames.bind(styles);

function AdFAQSManagement() {
    const [faqsList, setFaqsList] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState(false);
    const [addStatus, setAddStatus] = useState(1);
    const [addFail, setAddFail] = useState(1);
    const [submitStatus, setSubmitStatus] = useState();
    const [vinh, setVinh] = useState(true);

    const changeStatus = async (id, index) => {
        const updatedFaqs = [...faqsList];
        updatedFaqs[index].status = !updatedFaqs[index].status;
        const change = await FAQSAPI.changeStatus(id);
        setFaqsList(updatedFaqs);
        setVinh(true);
    };

    useEffect(() => {
        const getFaqsList = async () => {
            try {
                const faqsList = await FAQSAPI.getAll();
                setFaqsList(faqsList.listResult);
            } catch (error) {
                console.error(error);
            }
        };
        if (vinh) {
            getFaqsList();
            setVinh(false);
        }
    }, [vinh]);

    useEffect(() => {
        const addFaqs = async () => {
            try {
                const data = {
                    title: title,
                    content: content,
                    status: status,
                };

                const add = await FAQSAPI.add(data);
                setVinh(true);
            } catch (error) {
                console.error(error);
            }
        };

        addFaqs();
    }, [addStatus]);

    useEffect(() => {
        console.log(status);
    }, [status]);

    useEffect(() => {
        console.log(addFail);
    }, [addFail]);

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    const handleShow = () => {
        setShow(!show);
    };

    const handleSave = () => {
        if (title === '' || content === '') {
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
        console.log(vinh);
    }, [vinh]);

    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <div className={cx('title')}>
                <h1>FAQS</h1>
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
                                <Th colSpan={2}>New FAQS</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Title</Td>
                                <Td>
                                    <Input
                                        type="text"
                                        borderColor="black"
                                        placeholder="Title..."
                                        fontSize={18}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Content</Td>
                                <Td>
                                    <Textarea
                                        borderColor="black"
                                        placeholder="Content..."
                                        fontSize={18}
                                        onChange={(e) => setContent(e.target.value)}
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
                    <Button colorScheme="green" onClick={handleSave} className={cx('save-btn')} fontSize={18}>
                        Save
                    </Button>
                </TableContainer>
            ) : (
                <></>
            )}
            <div className={cx('sort-space')}>
                <input type="text" placeholder="Title" />
                <input type="date" />

                <select name="status" id="status">
                    <option value="" disabled selected>
                        Status
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <button></button>
            </div>
            <TableContainer>
                <Table size="lg">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Title</Th>
                            <Th>Content</Th>
                            <Th>Create At</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {faqsList &&
                            faqsList.map((faqs, index) => (
                                <Tr key={index}>
                                    <Td>{faqs.id}</Td>
                                    <Td>{faqs.title}</Td>
                                    <Td>{faqs.content}</Td>
                                    <Td>{formatDate(new Date(faqs.createdDate))}</Td>
                                    <Td>
                                        <Switch
                                            size="lg"
                                            isChecked={faqs.status}
                                            colorScheme="green"
                                            onChange={() => changeStatus(faqs.id, index)}
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

export default AdFAQSManagement;
