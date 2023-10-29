import classNames from 'classnames/bind';
import styles from '~/Pages/UpdateSpecies/UpdateSpecies.module.scss';
import {
    Input,
    Table,
    Tbody,
    Tr,
    Td,
    TableContainer,
    Tfoot,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/toast';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';

//Note: This class Data Flow
// Take specie id through component in AddSpeciesColor.js => Then paste specieID to UseEffect take specie by specieID
// After take specie by specieID => setParrotSpeSpecies data field by specie that be took by ID
// Then set value for input by using parrotSpecies.<DATA FIELD>
/////

const cx = classNames.bind(styles);
function UpdateSpecies({ specieID, onUpdateSuccess }) {
    const [specie, setSpecie] = useState();
    const [submissionStatus, setSubmissionStatus] = useState();
    const [species, setSpecies] = useState([]);

    //these useState for upload image
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState('');

    // Parrot Species and species color usestate
    const [parrotSpecies, setParrotSpecies] = useState({
        name: '',
        quantity: 30,
        nestQuantity: 13,
        description: '',
        availabilityStatus: true,
        origin: '',
        averageWeight: '',
        parrotAverageRating: 4.5,
        nestAverageRating: 4.0,
        status: true,
    });

    // Toast
    const toast = useToast();

    useEffect(() => {
        const fetchSpeciesByID = async () => {
            try {
                const specieById = await ParrotSpeciesAPI.get(specieID);

                setSpecie(specieById);
            } catch (error) {
                console.log('Error at UpdateSpecies.js fetchSpeciesByID | Error:  ' + error);
            }
        };
        fetchSpeciesByID();
    }, []);

    // This UseEffect to setParrotSpecies from specie by id
    useEffect(() => {
        if (specie && specie.length > 0) {
            // Update form fields with specie data
            setParrotSpecies({
                name: specie[0].name,
                description: specie[0].description,
                quantity: specie[0].quantity,
                nestQuantity: specie[0].nestQuantity,
                origin: specie[0].origin,
                averageWeight: specie[0].averageWeight,
            });
            console.log(specie[0].nestQuantity);
        }
    }, [specie]); // Add specie to the dependency array

    // This function use to  handle update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // const formData = new FormData();
            // formData.append('image', parrotSpeciesColor.imageUrl); // Append the image file
            // Make a POST request to the first API endpoint
            const data = {
                id: specieID,
                name: parrotSpecies.name,
                description: parrotSpecies.description,
                quantity: parrotSpecies.quantity,
                nestQuantity: parrotSpecies.nestQuantity,
                parrotAverageRating: parrotSpecies.parrotAverageRating,
                nestAverageRating: parrotSpecies.nestAverageRating,
                origin: parrotSpecies.origin,
                availabilityStatus: parrotSpecies.status,
                averageWeight: parrotSpecies.averageWeight,
                img: img,
            };
            const responseSpecies = await ParrotSpeciesAPI.update(data);

            if (responseSpecies.status === 200) {
                console.log('PUT request was successful at UpdateSpecies.js!!');
            } else {
                console.error('PUT request failed at UpdateSpecies.js with status code:', responseSpecies.status);
                console.error('Response data:', responseSpecies);
            }

            setSpecies((prevSpecies) => [...prevSpecies, responseSpecies.data]);
            // handleRefreshClick();

            setSpecies([...species, responseSpecies.data]);

            setSubmissionStatus(true);
            // Set time out for notification
            setTimeout(() => {
                setSubmissionStatus();
            }, 7000);
        } catch (error) {
            console.error('Error:', error);
            setSubmissionStatus(false);
        }
    };

    // Function to post image
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

    // Log data
    console.log('species by id');
    console.log(specie);
    console.log('Update species: ' + specieID);

    const handleUpdateParentStatus = () => {
        // Simulate an update action here
        // After the update is successful, call the function from the parent to set reloadData to true
        // This will trigger the parent component to reload its data
        // setStatus(true); // Update the status to true
        onUpdateSuccess(); // Call the parent function to set reloadData to true
    };
    return (
        <div className={cx('wrapper')}>
            <form onSubmit={handleUpdate} className={cx('inner')}>
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
                            <h1>Update species</h1>
                        </div>
                    </div>
                    <Table className={cx('table-specie-color')} size="md">
                        <Tbody>
                            <Tr>
                                <Td>Parrot species name</Td>
                                <Td>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={parrotSpecies.name}
                                        onChange={(e) => setParrotSpecies({ ...parrotSpecies, name: e.target.value })}
                                        variant="filled"
                                        placeholder="Parrot name"
                                        required
                                    />
                                </Td>
                            </Tr>

                            <Tr>
                                <Td>Description</Td>
                                <Td>
                                    <Input
                                        type="text"
                                        id="description"
                                        name="description"
                                        value={parrotSpecies.description}
                                        onChange={(e) =>
                                            setParrotSpecies({ ...parrotSpecies, description: e.target.value })
                                        }
                                        variant="filled"
                                        placeholder="Description"
                                        required
                                    />
                                </Td>
                            </Tr>

                            <Tr>
                                <Td>Origin</Td>
                                <Td>
                                    <Input
                                        type="text"
                                        id="origin"
                                        name="origin"
                                        value={parrotSpecies.origin}
                                        onChange={(e) => setParrotSpecies({ ...parrotSpecies, origin: e.target.value })}
                                        variant="filled"
                                        placeholder="Origin"
                                        required
                                    />
                                </Td>
                            </Tr>

                            <Tr>
                                <Td>Average weight</Td>
                                <Td>
                                    <Input
                                        type="number"
                                        min="0"
                                        max="4"
                                        step="0.01"
                                        id="averageWeight"
                                        name="averageWeight"
                                        value={parrotSpecies.averageWeight} // Use the averageWeight state variable
                                        onChange={(e) =>
                                            setParrotSpecies({ ...parrotSpecies, averageWeight: e.target.value })
                                        }
                                        variant="filled"
                                        placeholder="Average weight"
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
                                        Update
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

export default UpdateSpecies;
