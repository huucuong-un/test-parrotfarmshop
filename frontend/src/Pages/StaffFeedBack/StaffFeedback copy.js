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
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button,
    Textarea,
} from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faAngleRight, faAngleLeft, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from '~/Pages/StaffFeedBack/StaffFeedback.module.scss';

import React, { useState, useEffect } from 'react';
import FeedbackAPI from '~/Api/FeedbackAPI';
import UserAPI from '~/Api/UserAPI';
import ParrotSpeciesColorAPI from '~/Api/ParrotSpeciesColorAPI';

const cx = classNames.bind(styles);
function StaffFeedback() {
    const [feedbackList, setFeedbackList] = useState([]);
    const [combineData, setCombineData] = useState([]);
    const [show, setShow] = useState(false);

    const [vinh, setVinh] = useState(true);
    const [sort, setSort] = useState({
        page: 1,
        limit: 12,
        rating: null,
        speciesId: null,
        date: null,
        username: null,
        status: null,
        sortRating: null,
        sortDate: null,
    });
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const handleShow = (index) => {
        if (document.getElementById(index).style.display === 'block') {
            document.getElementById(index).style.display = 'none';
        } else {
            document.getElementById(index).style.display = 'block';
        }
    };

    const handlePageChange = (newPage) => {
        setSort({
            page: newPage,
            limit: 12,
            rating: sort.rating,
            speciesId: sort.speciesId,
            date: sort.date,
            username: sort.username,
            status: sort.status,
            sortRating: sort.sortRating,
            sortDate: sort.sortDate,
        });

        setPage(newPage);
    };

    const changeStatus = async (id, index) => {
        const updatedFeedback = [...feedbackList];
        updatedFeedback[index].status = !updatedFeedback[index].status;
        const change = await FeedbackAPI.changeStatus(id);
        setFeedbackList(updatedFeedback);
        setVinh(true);
    };

    useEffect(() => {
        const getFeedback = async () => {
            try {
                const feedbackList = await FeedbackAPI.getAllFeedbackSystem(sort);
                console.log(feedbackList);
                setFeedbackList(feedbackList.listResult);
                setTotalPage(feedbackList.totalPage);
            } catch (error) {
                console.log(error);
            }
        };
        if (vinh) {
            getFeedback();
            setVinh(false);
        }

        getFeedback();
    }, [vinh || sort]);

    useEffect(() => {
        const getUserbyId = async () => {
            const data = [];
            for (const item of feedbackList) {
                const feedback = { ...item };
                try {
                    feedback.userInfor = await UserAPI.getUserById(item.userId);
                    feedback.species = await ParrotSpeciesColorAPI.findOneSpeciesByColorId(item.colorId);
                    data.push(feedback);
                } catch (error) {
                    console.error(error);
                }
            }
            setCombineData(data);
        };
        getUserbyId();
    }, [feedbackList]);

    useEffect(() => {
        console.log(combineData);
    }, [combineData]);

    useEffect(() => {
        console.log(feedbackList);
    }, [feedbackList]);

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    const handleSortChange = (event) => {
        const newSortValue = event.target.value;
        console.log(newSortValue);
    };

    useEffect(() => {
        console.log(sort);
    }, [sort]);

    useEffect(() => {
        console.log(totalPage);
    }, [totalPage]);

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

    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <div className={cx('title')}>
                <h1>Feedback</h1>
            </div>
            <div className={cx('sort-space')}>
                <FontAwesomeIcon icon={faArrowsRotate} className={cx('refresh-icon')} onClick={handleClear} />
                <select
                    name="status"
                    id="status"
                    onChange={(e) => setSort({ ...sort, rating: parseInt(e.target.value) })}
                >
                    <option value="" disabled selected>
                        Rating
                    </option>

                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <select name="status" id="status" onChange={(e) => setSort({ ...sort, sortRating: e.target.value })}>
                    <option value="" disabled selected>
                        Sort Rating
                    </option>
                    <option value="RDESC">Highest</option>
                    <option value="RASC">Lowest</option>
                </select>

                <select name="status" id="status" onChange={(e) => setSort({ ...sort, sortDate: e.target.value })}>
                    <option value="" disabled selected>
                        Sort Date
                    </option>
                    <option value="DDESC">Newest</option>
                    <option value="DASC">Oldest</option>
                </select>
                <select name="status" id="status" onChange={(e) => setSort({ ...sort, status: e.target.value })}>
                    <option value="" disabled selected>
                        Status
                    </option>
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                </select>

                <input
                    type="number"
                    className={cx('sort-species-id')}
                    placeholder="Species Id..."
                    onChange={(e) => setSort({ ...sort, speciesId: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="username..."
                    onChange={(e) => setSort({ ...sort, username: e.target.value })}
                />

                <input type="date" value={sort.date} onChange={(e) => setSort({ ...sort, date: e.target.value })} />

                <button></button>
            </div>

            <TableContainer className={cx('table-container')}>
                <Table size="lg">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Customer Name</Th>
                            <Th>Content</Th>
                            <Th>Species</Th>
                            <Th>Create At</Th>
                            <Th>Rating</Th>
                            <Th>Status</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {combineData &&
                            combineData.map((feedback, index) => (
                                <React.Fragment key={index}>
                                    <Tr>
                                        <Td>{feedback.id}</Td>
                                        <Td>{feedback.userInfor.fullName}</Td>
                                        <Td className={cx('feedback-content')} maxWidth={100}>
                                            {feedback.content}
                                        </Td>
                                        <Td>{feedback.species.name}</Td>
                                        <Td>{formatDate(new Date(feedback.createdDate))}</Td>
                                        <Td>{feedback.rating}</Td>
                                        <Td>
                                            <Switch
                                                size="lg"
                                                isChecked={feedback.status}
                                                colorScheme="green"
                                                onChange={() => changeStatus(feedback.id, index)}
                                            />
                                        </Td>
                                        <Td>
                                            <Button
                                                cursor={'pointer'}
                                                onClick={() => {
                                                    handleShow(index);
                                                }}
                                            >
                                                Reply
                                            </Button>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td id={index} display={'none'} colSpan="10">
                                            <Textarea fontSize={18} minHeight={100} borderColor={'black'}></Textarea>
                                            <Button>Send</Button>
                                        </Td>
                                    </Tr>
                                </React.Fragment>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>

            {/* 
            <TableContainer className={cx('table-container')}>
                <Table size="lg">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Customer Name</Th>
                            <Th>Content</Th>
                            <Th>Species</Th>
                            <Th>Create At</Th>
                            <Th>Rating</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {combineData &&
                            combineData.map((feedback, index) => (
                                <Tr onClick={handleShow} key={index}>
                                    <Td>{feedback.id}</Td>
                                    <Td>{feedback.userInfor.fullName}</Td>
                                    <Td className={cx('feedback-content')} maxWidth={100}>
                                        {feedback.content}
                                    </Td>
                                    <Td>{feedback.species.name}</Td>
                                    <Td>{formatDate(new Date(feedback.createdDate))}</Td>
                                    <Td>{feedback.rating}</Td>
                                    <Td>
                                        <Switch
                                            size="lg"
                                            isChecked={feedback.status}
                                            colorScheme="green"
                                            onChange={() => changeStatus(feedback.id, index)}
                                        />
                                    </Td>
                                 
                                </Tr>
                                
                            ))}
                    </Tbody>
                </Table>
            </TableContainer> */}
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
        </Container>
    );
}

export default StaffFeedback;
