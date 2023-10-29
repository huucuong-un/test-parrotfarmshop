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
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faAngleRight, faAngleLeft, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from '~/Pages/StaffFeedBack/StaffFeedback.module.scss';

import React, { useState, useEffect } from 'react';
import FeedbackAPI from '~/Api/FeedbackAPI';
import UserAPI from '~/Api/UserAPI';
import ParrotSpeciesColorAPI from '~/Api/ParrotSpeciesColorAPI';
import { ShopState } from '~/context/ShopProvider';

import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';

const cx = classNames.bind(styles);
function StaffFeedback() {
    const [feedbackList, setFeedbackList] = useState([]);
    const [combineData, setCombineData] = useState([]);
    const [show, setShow] = useState(false);
    const [loggedUser, setLoggedUser] = useState();
    const { user } = ShopState();
    const [feedback, setFeedback] = useState({ content: null });
    const [replyData, setReplyData] = useState({});

    useEffect(() => {
        const getCombine = async () => {
            try {
                const colorName = await ParrotSpeciesColorAPI.findOneSpeciesByParrotID(feedback.colorId);
                const speciesName = await ParrotSpeciesAPI.getSpeciesByColorId(feedback.colorId);
                console.log(colorName);
                const param = {
                    colorName: colorName[0].color,
                    speciesName: speciesName.name,
                };
                setReplyData(param);
            } catch (error) {
                console.log(error);
            }
        };
        getCombine();
    }, [feedback]);

    const StarRating = ({ rating }) => {
        const stars = [];

        var count = 0;
        for (let i = 0; i < rating; i++) {
            stars.push(<FontAwesomeIcon icon={solidStar} key={count} />);
            count = count + 1;
        }

        if (rating < 5) {
            for (let i = 0; i < 5 - rating; i++) {
                stars.push(<FontAwesomeIcon icon={regularStar} key={count} />);
                count = count + 1;
            }
        }
        return stars;
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    }, []);
    const [vinh, setVinh] = useState(true);
    const [thanh, setThanh] = useState(0);
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
    const [textareaValue, setTextareaValue] = useState('');

    const handleReply = async () => {
        // Update the state variable with the new value from the textarea
        try {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');

            // Định dạng thành "yyyy/mm/dd"
            const formattedDate = new Date(`${year}/${month}/${day}`);

            console.log(formattedDate);
            const replyParam = {
                id: feedback.id,
                content: feedback.content,
                rating: feedback.rating,
                belongTo: 'parrot',
                userId: feedback.userId,
                replyerId: user.userId,
                replyContent: textareaValue === '' ? null : textareaValue,
                replyDate: textareaValue === '' ? null : formattedDate,
                colorId: feedback.colorId,
                orderId: feedback.orderId,
                status: true,
            };

            await FeedbackAPI.create(replyParam);
            onClose();
            setVinh(true);
        } catch (error) {}
    };
    const handleTextareaChange = (event) => {
        // Update the state variable with the new value from the textarea
        try {
            setTextareaValue(event.target.value);
            console.log(textareaValue);
        } catch (error) {}
    };

    const handleShow = (index) => {
        if (document.getElementById(index).style.display === 'block') {
            document.getElementById(index).style.display = 'none';
        } else {
            document.getElementById(index).style.display = 'block';
        }
    };

    const OverlayOne = () => <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [overlay, setOverlay] = React.useState(<OverlayOne />);

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
                                        <Td>
                                            <StarRating rating={feedback.rating}></StarRating>
                                        </Td>
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
                                                color={'white'}
                                                backgroundColor={feedback.replyContent === null ? '#319795' : 'grey'}
                                                onClick={() => {
                                                    setOverlay(<OverlayOne />);
                                                    setFeedback(feedback);
                                                    setTextareaValue(feedback.replyContent);
                                                    onOpen();
                                                }}
                                            >
                                                Reply
                                            </Button>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td id={index} display={'none'} colSpan="10"></Td>
                                    </Tr>
                                </React.Fragment>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {' '}
                size={'full'}
                {overlay}
                <ModalContent>
                    <ModalHeader>Reply</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className={cx('rate-area')}>
                            <div className={cx('product-container')}>
                                <div className={cx('product-img')}>
                                    <img
                                        src="https://images.unsplash.com/photo-1630159914088-a1895c434cc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                        alt="product-img"
                                    />
                                </div>
                                <div className={cx('product-info')}>
                                    <div className={cx('product-title')}>
                                        <p>{replyData.speciesName}</p>
                                    </div>
                                    <div className={cx('product-type')}>
                                        <p>Category:{replyData.colorName} </p>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('rating-star-container')}>
                                <div className={cx('rating-star-title')}>
                                    <p>
                                        Rating:<StarRating rating={feedback.rating}></StarRating>
                                    </p>
                                </div>
                                <div className={cx('rating-star-icon')}>
                                    <div className={cx('row')}>
                                        <div className={cx('col text-center')}></div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('rating-input')}>
                                <p>
                                    Content:<Text>{feedback.content}</Text>
                                </p>
                                Reply
                                <Textarea
                                    fontSize={15}
                                    onChange={handleTextareaChange}
                                    value={textareaValue}
                                ></Textarea>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className={cx('button-footer')}>
                        <Button onClick={handleReply}>Save</Button>

                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
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
