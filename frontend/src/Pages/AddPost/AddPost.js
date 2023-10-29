import classNames from 'classnames/bind';

import styles from '~/Pages/AddPost/AddPost.module.scss';
import {
    Input,
    Table,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Thead,
    Td,
    TableContainer,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Textarea,
    Text,
    Switch,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faArrowsRotate, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Title from '~/Components/Title/Title';
import axios from 'axios';
import PostAPI from '~/Api/PostAPI';
import UpdatePost from '~/Components/UpdatePost/UpdatePost';

const cx = classNames.bind(styles);

function AddPost() {
    const [submissionStatus, setSubmissionStatus] = useState();
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState('');
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(false);
    const [reloadData, setReloadData] = useState(false);
    const handleUpdateSuccess = () => {
        setReloadData(true); // Set reloadData to true when the update is successful
    };
    const handleStatus = async (index) => {
        const updatedPost = [...postList];
        updatedPost[index].status = !updatedPost[index].status;

        try {
            // Send a request to update the status on the server
            await axios.delete(`http://localhost:8086/api/post/${updatedPost[index].id}`);

            // If the request is successful, update the state
            setPostList(updatedPost);
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
    // Toast

    const toast = useToast();
    const handleShow = () => {
        setShow(!show);
    };
    const [post, setPost] = useState({
        description: 'Default by Hnam',
        title: '',
        content: '',
        imageUrl: null,
        startDate: '',
        endDate: '',
        status: true,
    });

    const postDetails = (pic) => {
        setLoading(true);
        if (pic === undefined) {
            toast({
                title: 'Select an image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            return;
        }

        if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
            const data = new FormData();
            data.append('file', pic);
            data.append('upload_preset', 'parrotfarmshop');
            data.append('cloud_name', 'dkddhxz2g');
            fetch('https://api.cloudinary.com/v1_1/dkddhxz2g/image/upload', {
                method: 'post',
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setImg(data.url.toString());
                    console.log(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            toast({
                title: 'Select an image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responsePost = await axios.post('http://localhost:8086/api/post', {
                endDate: post.endDate,
                status: post.status,
                title: post.title,
                description: post.description,
                content: post.content,
                startDate: post.startDate,
                imageUrl: img,
            });
            if (responsePost.status === 200) {
                console.log('POST request was successful at species!!');
                // Assuming the response contains the newly created post data
                setPost({ ...post, ...responsePost.data });
                setSubmissionStatus(true);
            } else {
                console.error('POST request failed with status code - species: ', responsePost.status);
                setSubmissionStatus(false);
            }
        } catch (error) {
            console.error('Error while making POST request:', error);
            setSubmissionStatus(false);
        }
    };
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const postList = await PostAPI.getAll();
            setPostList(postList.listResult);
        };
        if (reloadData) {
            fetchData();
            setReloadData(false);
        } else {
            fetchData();
        }
    }, [reloadData, post]);
    const convertToTrueFormat = (timeText) => {
        let [date, time] = timeText.split('T');
        let [hours, mins, secs] = time.split(':');
        if (date && time && hours && mins && secs) {
            return date + ' ' + time;
        } else if (secs === undefined) {
            return date + ' ' + hours + ':' + mins + ':00';
        }
    };
    console.log(postList);
    const [openPostID, setOpenPostID] = useState(null);
    const toggleEditForm = (postID) => {
        if (openPostID === postID) {
            // If the form is already open for this species, close it
            setOpenPostID(null);
        } else {
            // Otherwise, open the form for this species
            setOpenPostID(postID);
        }
    };
    // Sorting
    // Sorting
    // Sorting
    // Sorting
    // Sorting
    const [sort, setSort] = useState({
        page: 1,
        limit: 5,
        searchDate: null,
        status: null,
        title: null,
        content: null,
        description: null,
        sortTile: null,
        sortDate: null,
    });
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const sortData = async () => {
            try {
                const postSortList = await PostAPI.searchSortForPost(sort);
                setPostList(postSortList.listResult);
                setTotalPage(postSortList.totalPage);
            } catch (error) {
                console.error(error);
            }
        };
        sortData();
    }, [sort]);
    const handlePageChange = (newPage) => {
        setSort({
            page: newPage,
            limit: 5,
            email: sort.email,
            phone: sort.phone,
            date: sort.date,
            sortDate: sort.sortDate,
            sortPrice: sort.sortPrice,
            sortTitle: sort.sortTile,
        });

        setPage(newPage);
    };

    const handleClear = () => {
        setSort({
            page: 1,
            limit: 10,
            searchDate: null,
            status: null,
            title: null,
            content: null,
            description: null,
            sortTile: null,
            sortDate: null,
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-wrapper')}>
                <Title system>Add post</Title>
            </div>
            <div className={cx('add-btn')}>
                <Button onClick={handleShow} colorScheme={'green'} size={'lg'}>
                    Add
                    <span className={cx('span-icon', { 'rotate-icon': show })}>
                        {show ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </span>
                </Button>
            </div>

            {show ? (
                <div className={cx('inner-up')}>
                    <div className={cx('post-img')}>{img ? <img src={img} alt="post-img" /> : <></>}</div>
                    <div className={cx('post-info')}>
                        <div className={cx('post-info-title')}>
                            <h1>{post.title}</h1>
                        </div>
                        <div className={cx('post-info-content')}>
                            <p>{post.content}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}

            {show ? (
                <form className={cx('inner')} onSubmit={handleSubmit}>
                    <TableContainer className={cx('table-container-add')}>
                        {(submissionStatus === true && (
                            <Alert status="success">
                                <AlertIcon />
                                <AlertTitle>Success!</AlertTitle>
                                <AlertDescription>Your form has been submitted successfully.</AlertDescription>
                            </Alert>
                        )) ||
                            (submissionStatus === false && (
                                <Alert status="error">
                                    <AlertIcon />
                                    <AlertTitle>Failed to add parrot species - </AlertTitle>
                                    <AlertDescription>Please check your input!!!</AlertDescription>
                                </Alert>
                            ))}
                        <div className={cx('title-container')}>
                            <Title system>Add Post</Title>
                        </div>
                        <Table size="xs ">
                            <Tbody>
                                <Tr>
                                    <Td>Title</Td>
                                    <Td className={cx('text-area')}>
                                        <Input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={post.title}
                                            onChange={(e) => {
                                                setPost({ ...post, title: e.target.value });
                                            }}
                                            variant="filled"
                                            placeholder="Title"
                                            required
                                        />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>Content</Td>
                                    <Td className={cx('text-area')}>
                                        <Textarea
                                            value={post.content}
                                            onChange={(e) => setPost({ ...post, content: e.target.value })}
                                        />
                                    </Td>
                                </Tr>

                                <Tr>
                                    <Td>Start day</Td>
                                    <Td className={cx('text-area')}>
                                        <Input
                                            placeholder="Select Date and Time"
                                            size="md"
                                            step="1"
                                            type="datetime-local"
                                            onChange={(e) => {
                                                const timeConvert = convertToTrueFormat(e.target.value);
                                                setPost({ ...post, startDate: timeConvert });
                                            }}
                                            required
                                        />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>End day</Td>
                                    <Td className={cx('text-area')}>
                                        <Input
                                            placeholder="Select Date and Time"
                                            size="md"
                                            step="1"
                                            type="datetime-local"
                                            onChange={(e) => {
                                                const timeConvert = convertToTrueFormat(e.target.value);
                                                setPost({ ...post, endDate: timeConvert });
                                            }}
                                            required
                                        />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>Post image</Td>
                                    <Td className={cx('text-area')}>
                                        <Input
                                            type="file"
                                            p={1.5}
                                            id="image"
                                            name="image"
                                            accept="image/*"
                                            onChange={(e) => postDetails(e.target.files[0])}
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
                                            isLoading={loading}
                                        >
                                            ADD
                                        </Button>
                                    </Td>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </form>
            ) : (
                <></>
            )}
            <div className={cx('sort-space')}>
                <FontAwesomeIcon icon={faArrowsRotate} className={cx('refresh-icon')} onClick={handleClear} />
                <input
                    type="text"
                    placeholder="Content"
                    onChange={(e) => setSort({ ...sort, content: e.target.value })}
                />
                <input type="text" placeholder="Title" onChange={(e) => setSort({ ...sort, title: e.target.value })} />
                <input
                    type="text"
                    placeholder="Description"
                    onChange={(e) => setSort({ ...sort, description: e.target.value })}
                />
                {/* Sort date */}
                <input
                    type="date"
                    placeholder="Date"
                    onChange={(e) => setSort({ ...sort, sortDate: e.target.value })}
                />
                {/* Sort title */}
                <select
                    name="sortTitle"
                    id="sortTitle"
                    onChange={(e) => setSort({ ...sort, sortTitle: e.target.value })}
                >
                    <option value="b">Title</option>
                    <option value="TASC">Ascending</option>
                    <option value="TDESC">Descending</option>
                </select>
                <select name="sortDate" id="sortDate" onChange={(e) => setSort({ ...sort, sortDate: e.target.value })}>
                    <option value="b">Date</option>
                    <option value="DASC">Ascending</option>
                    <option value="DDESC">Descending</option>
                </select>
                <select
                    name="sortStatus"
                    id="sortStatus"
                    onChange={(e) => setSort({ ...sort, status: e.target.value })}
                >
                    <option value="b">Status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
            </div>
            <TableContainer className={cx('table-container')}>
                <Table size="xs ">
                    <Thead>
                        <Tr>
                            <Th className={cx('text-center')}>Post ID</Th>
                            <Th className={cx('text-center')}>Title</Th>
                            <Th className={cx('text-center')}>Content</Th>
                            <Th className={cx('text-center')}>Description</Th>
                            <Th className={cx('text-center')}>Image</Th>
                            <Th className={cx('text-center')}>Start date</Th>
                            <Th className={cx('text-center')}>End date</Th>
                            <Th className={cx('text-center')}>Status</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {postList.map((post, index) => (
                            <>
                                <Tr key={index}>
                                    <Td>{post.id}</Td>
                                    <Td>{post.title}</Td>
                                    <Td>
                                        <div className={cx('td-content')}>{post.content}</div>
                                    </Td>
                                    <Td>{post.description}</Td>
                                    <Td>
                                        <img src={post.imageUrl} />
                                    </Td>
                                    <Td>{post.startDate}</Td>
                                    <Td>{post.endDate}</Td>
                                    <Td>
                                        <Switch
                                            onChange={() => handleStatus(index)}
                                            size="lg"
                                            isChecked={post.status}
                                            colorScheme="green"
                                        />
                                        {post.status ? (
                                            <Text color="green" fontSize={12} overflow="hidden">
                                                On Processing
                                            </Text>
                                        ) : (
                                            <Text color="red" fontSize={12} overflow="hidden">
                                                Disabled
                                            </Text>
                                        )}

                                        <Input
                                            type="hidden"
                                            id="status"
                                            name="status"
                                            variant="filled"
                                            value={status}
                                            onChange={(e) => setPost({ ...post, status: e.target.value })}
                                        />
                                    </Td>
                                    <Td>
                                        <Button
                                            key={post.id}
                                            onClick={() => toggleEditForm(post.id)}
                                            colorScheme={'green'}
                                            size={'lg'}
                                        >
                                            {openPostID === post.id ? 'Close Edit' : 'Edit'}
                                        </Button>
                                    </Td>
                                </Tr>

                                <Tr key={index + 'post'}>
                                    {openPostID === post.id && (
                                        <Td colSpan={10}>
                                            <UpdatePost postId={post.id} reloadData={handleUpdateSuccess} />
                                        </Td>
                                    )}
                                </Tr>
                            </>
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
        </div>
    );
}

export default AddPost;
