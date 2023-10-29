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
import styles from '~/Pages/AdNestDevelopmentStatus/AdNestDevelopmentStatus.module.scss';
import FAQSAPI from '~/Api/FAQSAPI';
import NestAPI from '~/Api/NestAPI';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';

const cx = classNames.bind(styles);

function AdNestDevelopmentStatus() {
    const [faqsList, setFaqsList] = useState([]);
    const [nestPrice, setNestPrice] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState(false);
    const [addStatus, setAddStatus] = useState(false);
    const [addFail, setAddFail] = useState(1);
    const [submitStatus, setSubmitStatus] = useState();
    const [vinh, setVinh] = useState(true);
    const [combineData, setCombineData] = useState([]);
    const [species, setSpecies] = useState([]);

    const changeStatus = async (id, index) => {
        const updatedFaqs = [...faqsList];
        updatedFaqs[index].status = !updatedFaqs[index].status;
        const change = await NestAPI.changeStatusForNestDevelopmentStatus(id);
        setFaqsList(updatedFaqs);
        setVinh(true);
    };

    useEffect(() => {
        const getNestPriceList = async () => {
            try {
                const params = {
                    page: 1,
                    limit: 12,
                };
                const nestList = await NestAPI.getAllNestDevelopmentStatus(params);
                setFaqsList(nestList.listResult);
            } catch (error) {
                console.error(error);
            }
        };
        if (vinh) {
            getNestPriceList();
            setVinh(false);
        }
    }, [vinh]);

    useEffect(() => {
        const getNestDevelopmentStatusList = async () => {
            try {
                const nestPriceList = await NestAPI.getAll();
                setNestPrice(nestPriceList);
            } catch (error) {
                console.error(error);
            }
        };
        if (show) {
            getNestDevelopmentStatusList();
        }
    }, [show]);

    useEffect(() => {
        const getSpecies = async () => {
            try {
                const speciesList = await ParrotSpeciesAPI.getAll();
                setSpecies(speciesList.listResult);
            } catch (error) {
                console.error(error);
            }
        };

        getSpecies();
    }, [show]);

    useEffect(() => {
        console.log(status);
    }, [status]);

    useEffect(() => {
        const addFaqs = async () => {
            try {
                const data = {
                    name: title,
                    description: description,
                    sequence: price,
                    available: status,
                };
                if (addStatus === false) {
                    setAddFail((prev) => prev + 1);
                    // setSubmitStatus(false);
                    setTimeout(() => {
                        setSubmitStatus();
                    }, 50000);
                } else {
                    const add = await NestAPI.addNestDevelopmentStatus(data);
                    setVinh(true);
                    setAddStatus(false);
                }
            } catch (error) {
                console.error(error);
            }
        };

        addFaqs();
    }, [addStatus]);

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
        if (title === '' || description === '' || price === 0) {
            setAddFail((prev) => prev + 1);
            setSubmitStatus(false);
            setTimeout(() => {
                setSubmitStatus();
            }, 50000);
        } else {
            setAddStatus(true);
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
    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <div className={cx('title')}>
                <h1>NEST DEVELOPMENT STATUS</h1>
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
                                <Th colSpan={2}>New Nest Development Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Name</Td>
                                <Td>
                                    <Input
                                        type="text"
                                        borderColor="black"
                                        placeholder="Name..."
                                        fontSize={18}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Description</Td>
                                <Td>
                                    <Input
                                        type="text"
                                        borderColor="black"
                                        placeholder="Description..."
                                        fontSize={18}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Sequence</Td>
                                <Td>
                                    <Input
                                        type="number"
                                        borderColor="black"
                                        placeholder="Sequence..."
                                        fontSize={18}
                                        onChange={(e) => setPrice(e.target.value)}
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
                            <Th>Name</Th>
                            <Th>Description</Th>
                            <Th>Sequence</Th>
                            <Th>Created Date</Th>
                            <Th>Available</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {faqsList &&
                            faqsList.map((faqs, index) => (
                                <Tr key={index}>
                                    <Td>{faqs.id}</Td>
                                    <Td>{faqs.name}</Td>
                                    <Td>{faqs.description}</Td>
                                    <Td>{faqs.sequence}</Td>
                                    <Td>{formatDate(new Date(faqs.createdDate))}</Td>
                                    <Td>
                                        <Switch
                                            size="lg"
                                            isChecked={faqs.available}
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

export default AdNestDevelopmentStatus;
