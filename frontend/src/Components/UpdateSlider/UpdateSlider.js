import classNames from 'classnames/bind';

import {
    Input,
    Table,
    Tbody,
    Tfoot,
    Tr,
    Td,
    TableContainer,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/toast';
import styles from '~/Components/UpdateSlider/UpdateSlider.module.scss';
import SliderAPI from '~/Api/SliderAPI';
const cx = classNames.bind(styles);
function UpdateSlider({ slider, reloadData }) {
    const [submissionStatus, setSubmissionStatus] = useState();
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState('');
    // Toast
    const toast = useToast();
    const [newSlider, setNewSlider] = useState(slider);
    console.log('newSlider kkkkk');
    console.log(newSlider.id);
    const handleUpdateParentStatus = () => {
        // Simulate an update action here
        // After the update is successful, call the function from the parent to set reloadData to true
        // This will trigger the parent component to reload its data
        // setStatus(true); // Update the status to true
        reloadData(); // Call the parent function to set reloadData to true
    };
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
            const data = {
                id: newSlider.id,
                sliderName: newSlider.sliderName,
                sliderDescription: newSlider.sliderDescription,
                sliderImageURL: img,
                status: newSlider.status,
            };
            console.log('daataaa');
            console.log(data.id);
            const responsePost = await SliderAPI.update(data);

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
    return (
        <div className={cx('wrapper')}>
            <form className={cx('inner')} onSubmit={handleSubmit}>
                <TableContainer className={cx('table-container')}>
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
                    <div className={cx('title-post')}>
                        <div className={cx('title')}>
                            <h1>Add slider</h1>
                        </div>
                    </div>
                    <Table size="xs">
                        <Tbody>
                            <Tr>
                                <Td>Slider name: </Td>
                                <Td>
                                    <Input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={newSlider.sliderName}
                                        onChange={(e) => setNewSlider({ ...newSlider, sliderName: e.target.value })}
                                        variant="filled"
                                        placeholder="Slider name"
                                        required
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Slider description: </Td>
                                <Td>
                                    <Input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={newSlider.sliderDescription}
                                        onChange={(e) =>
                                            setNewSlider({ ...newSlider, sliderDescription: e.target.value })
                                        }
                                        variant="filled"
                                        placeholder="Description"
                                        required
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Parrot image</Td>
                                <Td>
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
                                <Td className={cx('submit-btn')} onClick={handleUpdateParentStatus}>
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
        </div>
    );
}

export default UpdateSlider;
