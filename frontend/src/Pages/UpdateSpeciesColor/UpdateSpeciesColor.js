import classNames from 'classnames/bind';
import styles from '~/Pages/UpdateSpeciesColor/UpdateSpeciesColor.module.scss';
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
import parrotSpeciesColorAPI from '~/Api/ParrotSpeciesColorAPI';

const cx = classNames.bind(styles);
function UpdateSpeciesColor({ speciesID, speciesColorID }) {
    const [submissionStatus, setSubmissionStatus] = useState();

    // Handle posting image
    const [img, setImg] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
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
    }; //End Handle posting image

    const handleUpdate = () => {};
    const [colorExist, setColorExist] = useState();
    const [combineData, setCombineData] = useState([]);

    function isColorExisted(id, input) {
        for (const parent of combineData) {
            if (id === parent.id) {
                console.log('Color existed');
                for (const child of parent.colors) {
                    if (input.toString() === child.color.toString()) {
                        console.log('color existed | parent name: ' + parent.name + ' | with color: ' + child.color);
                        return true;
                    }
                }
            } else {
                console.log('name: ' + parent.name + ' id ' + parent.id + ' not existed color');
            }
        }
        return false;
    }
    // Function to fetch species by its ID
    const [species, setSpecies] = useState([]);
    useEffect(() => {
        const fetchParrotSpecies = async () => {
            try {
                const parrotSpecies = await ParrotSpeciesAPI.get(speciesID);
                setSpecies(parrotSpecies);
            } catch (error) {
                console.error(error);
            }
        };
        fetchParrotSpecies();
    }, []);
    console.log(species); //End function to fetch species by its ID

    // ConsoleLog
    console.log('combine data list');
    // console.log(combineData);
    console.log('specie id: ' + speciesID);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <TableContainer className={cx('table-container')}>
                    <div className={cx('title-post')}>
                        <div className={cx('title')}>
                            <h1>Update species color</h1>
                        </div>
                    </div>
                    <Table className={cx('table-specie-color')} size="md">
                        <Tbody>
                            <Tr>
                                <Td>Color </Td>
                                <Td>
                                    <Input
                                        type="text"
                                        id="color"
                                        name="color"
                                        placeholder="Enter color"
                                        variant="filled"
                                        required
                                    />
                                </Td>
                            </Tr>

                            {/* Parrot color */}

                            <Tr>
                                <Td>Price</Td>
                                <Td>
                                    <Input
                                        type="text"
                                        id="price"
                                        name="price"
                                        placeholder="Enter price"
                                        variant="filled"
                                        required
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Parrot image</Td>
                                <Td>
                                    <Input
                                        type="file"
                                        id="img"
                                        name="img"
                                        accept="image/*"
                                        onChange={(e) => postDetails(e.target.files[0])} // Pass the index of the species
                                        required
                                    />
                                </Td>
                            </Tr>
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
                        </Tbody>
                    </Table>
                </TableContainer>

                <input
                    type="hidden"
                    id="id"
                    name="id"
                    placeholder="Enter species ID"
                    // value={data.id}
                    readOnly // Make it read-only to display the species ID
                    variant="filled"
                    required
                />
            </div>
        </div>
    );
}

export default UpdateSpeciesColor;
