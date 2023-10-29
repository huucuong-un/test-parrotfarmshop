import classNames from 'classnames/bind';

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
import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/toast';
import Title from '~/Components/Title/Title';

import axios from 'axios';
import styles from '~/Components/UpdatePost/UpdatePost.module.scss';
import PostAPI from '~/Api/PostAPI';

const cx = classNames.bind(styles);
function UpdatePost({ postId, reloadData }) {
    console.log('UpdatePost ' + postId);
    console.log(postId);
    const [newPost, setNewPost] = useState();
    const [post, setPost] = useState({
        description: 'Default by Hnam',
        title: '',
        content: '',
        imageUrl: null,
        startDate: '',
    });
    const handleUpdateParentStatus = () => {
        // Simulate an update action here
        // After the update is successful, call the function from the parent to set reloadData to true
        // This will trigger the parent component to reload its data
        // setStatus(true); // Update the status to true
        reloadData(); // Call the parent function to set reloadData to true
    };
    const [submissionStatus, setSubmissionStatus] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = { postId: postId };
                const postListByID = await PostAPI.get(params);
                setNewPost(postListByID);
            } catch (error) {
                console.log(console.error());
            }
        };
        fetchData();
    }, [postId]);
    useEffect(() => {
        if (newPost && newPost !== undefined) {
            // Update form fields with specie data
            setImg(newPost.imageUrl);
            console.log(img);
            setPost({
                startDate: newPost.startDate || '',
                endDate: newPost.endDate || '',
                title: newPost.title || '', // Provide a default value if title is undefined
                description: newPost.description || '', // Provide a default value if description is undefined
                content: newPost.content || '', // Provide a default value if content is undefined
                status: newPost.status,
                imageUrl: img || '',
            });
            // console.log(specie[0].nestQuantity);
        }
    }, [newPost]);
    console.log('New Post in update');
    console.log(newPost);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                id: postId,
                endDate: post.endDate,
                title: post.title,
                description: post.description,
                content: post.content,
                startDate: post.startDate,
                status: post.status,
                imageUrl: img,
            };
            console.log('daataaa');
            console.log(data);
            const responsePost = await PostAPI.update(data);

            console.log('POST request was successful at species!!');
            // Assuming the response contains the newly created post data
            setSubmissionStatus(true);
            setTimeout(() => {
                setSubmissionStatus();
            }, 5000);
        } catch (error) {
            console.error('Error while making POST request:', error);
            setSubmissionStatus(false);
        }
    };
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [img, setImg] = useState('');
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

    const convertToTrueFormat = (timeText) => {
        let [date, time] = timeText.split('T');
        let [hours, mins, secs] = time.split(':');
        if (date && time && hours && mins && secs) {
            return date + ' ' + time;
        } else if (secs === undefined) {
            return date + ' ' + hours + ':' + mins + ':00';
        }
    };
    return (
        <div className={cx('wrapper')}>
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
                        <Title system>Update Post</Title>
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
                                        variant="filled"
                                        placeholder="Title"
                                        value={post.title}
                                        onChange={(e) => setPost({ ...post, title: e.target.value })}
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
                                        value={post.startDate}
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
                                        value={post.endDate}
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
                                        onClick={handleUpdateParentStatus}
                                    >
                                        EDIT
                                    </Button>
                                </Td>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </form>
        </div>
    );
}

export default UpdatePost;
