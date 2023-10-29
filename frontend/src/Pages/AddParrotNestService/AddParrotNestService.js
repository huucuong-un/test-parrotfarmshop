import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
    Text,
    Divider,
    ButtonGroup,
    Button,
    Stack,
    Heading,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
} from '@chakra-ui/react';

import classNames from 'classnames/bind';
import styles from '~/Pages/AddParrotNestService/AddParrotNestService.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faL } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import ParrotAPI from '~/Api/ParrotAPI';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import ParrotSpeciesColorAPI from '~/Api/ParrotSpeciesColorAPI';
import ChooseProduct from '~/Components/ChooseProduct/ChooseProduct';
import ParrotCoupleAPI from '~/Api/ParrotCoupleAPI';
import { color } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NestAPI from '~/Api/NestAPI';

const cx = classNames.bind(styles);

function AddParrotNestService() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [combineData, setCombineData] = useState([]);
    const [parrotSpecies, setParrotSpecies] = useState([]);
    const [choosenFirstParrotSpecies, setChoosenFirstParrotSpecies] = useState();
    const [firstParrotColor, setFirstParrotColor] = useState([]);
    const [firstParrotColorSelected, setFirstParrotColorSelected] = useState(false);
    const [choosenColorFirst, setChoosenColorFirst] = useState(false);
    const [choosenColorSecond, setChoosenColorSecond] = useState(false);
    const [secondParrotColor, setSecondParrotColor] = useState([]);
    const [firstParrot, setFirstParrot] = useState({
        age: null,
        status: true,
        saleStatus: false,
        pregnancyStatus: false,
        healthStatus: true,
        numberOfChildren: 2,
        gender: true,
        colorID: null,
    });
    const [secondParrot, setSecondParrot] = useState({
        age: null,
        status: true,
        saleStatus: false,
        pregnancyStatus: true,
        healthStatus: true,
        numberOfChildren: 2,
        gender: false,
        colorID: null,
    });
    const [nestPrice, setNestPrice] = useState({});
    const [speciesToPass, setSpeciesToPass] = useState({});
    const [combineSpecies, setcombineSpecies] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getParrotSpecies = async () => {
            try {
                const parrotSpecies = await NestAPI.getAll();
                setParrotSpecies(parrotSpecies);
            } catch (error) {
                console.error(error);
            }
        };

        getParrotSpecies();
    }, []);

    useEffect(() => {
        try {
            console.log(combineData);
        } catch (error) {}
    }, [combineData]);

    useEffect(() => {
        const getParrotSpecies = async () => {
            const data = [];
            for (const item of parrotSpecies) {
                const parrot = { ...item };
                try {
                    parrot.species = await ParrotSpeciesAPI.get(item.speciesId);
                    data.push(parrot);
                } catch (error) {
                    console.error(error);
                }
            }
            setCombineData(data);
        };
        getParrotSpecies();
    }, [parrotSpecies]);

    useEffect(() => {
        const getNestPriceBySpecies = async () => {
            try {
                const nestPriceBySpeciesId = await NestAPI.getNestPriceBySpeciesId(choosenFirstParrotSpecies);
                setNestPrice(nestPriceBySpeciesId);
            } catch (error) {
                console.error(error);
            }
        };

        getNestPriceBySpecies();
    }, [choosenFirstParrotSpecies]);

    useEffect(() => {
        const getFirstParrotColor = async () => {
            try {
                const parrotColor = await ParrotSpeciesColorAPI.findOneSpeciesByParrotID(choosenFirstParrotSpecies);
                setFirstParrotColor(parrotColor);
            } catch (error) {
                console.error(error);
            }
        };

        getFirstParrotColor();
    }, [choosenFirstParrotSpecies]);

    useEffect(() => {
        const getSecondParrotColor = async () => {
            try {
                const parrotColor = await ParrotSpeciesColorAPI.findOneSpeciesByParrotID(choosenFirstParrotSpecies);
                setSecondParrotColor(parrotColor);
            } catch (error) {
                console.error(error);
            }
        };

        getSecondParrotColor();
    }, [choosenFirstParrotSpecies]);

    useEffect(() => {
        const getSpeciesByColorId = async () => {
            try {
                const speciesByColorId = await ParrotSpeciesAPI.getSpeciesByColorId(choosenFirstParrotSpecies);
                setSpeciesToPass(speciesByColorId);
            } catch (error) {
                console.error(error);
            }
        };

        getSpeciesByColorId();
    }, [choosenFirstParrotSpecies]);

    useEffect(() => {
        console.log(combineSpecies);
    }, [combineSpecies]);

    useEffect(() => {
        const combineSpeciesWithIsNest = () => {
            try {
                setcombineSpecies({
                    ...speciesToPass,
                    isNest: true,
                    firstParrot: firstParrot,
                    secondParrot: secondParrot,
                    nestPrice: nestPrice,
                });
            } catch (error) {
                console.error(error);
            }
        };

        combineSpeciesWithIsNest();
    }, [speciesToPass, firstParrot, secondParrot]);

    useEffect(() => {
        console.log(firstParrot);
    }, [firstParrot]);

    useEffect(() => {
        console.log(secondParrot);
    }, [secondParrot]);

    // useEffect(() => {
    //     console.log(firstParrotColorSelected);
    // }, [firstParrotColorSelected]);

    // useEffect(() => {
    //     console.log(combineSpecies);
    // }, [combineSpecies]);

    // useEffect(() => {
    //     if(firstParrot.age || )
    // }, [firstParrot, secondParrot])

    const handleBreed = async () => {
        // const addFirstParrot = await ParrotAPI.add(firstParrot);
        // const addSecondParrot = await ParrotAPI.add(secondParrot);
        // const addParrotCouple = await ParrotCoupleAPI.add({
        //     parrotMaleId: addFirstParrot.gender === true ? addFirstParrot.id : addSecondParrot.id,
        //     parrotFemaleId: addSecondParrot.gender === false ? addSecondParrot.id : addFirstParrot.id,
        //     status: true,
        // });
        navigate('/payment', {
            state: [combineSpecies],
        });
    };

    const handleGenderSelect = ({ e, type }) => {
        if (e === 'true' && type === 'firstParrot') {
            setFirstParrot({
                ...firstParrot,
                gender: (e = true),
                pregnancyStatus: false,
            });
            setSecondParrot({
                ...secondParrot,
                gender: false,
                pregnancyStatus: true,
            });
        } else if (e === 'false' && type === 'firstParrot') {
            setFirstParrot({
                ...firstParrot,
                gender: (e = false),
                pregnancyStatus: true,
            });
            setSecondParrot({
                ...secondParrot,
                gender: true,
                pregnancyStatus: false,
            });

            // setSecondParrot({
            //     ...secondParrot,
            //     pregnancyStatus: false,
            // });
        } else if (e === 'true' && type === 'secondParrot') {
            setSecondParrot({
                ...secondParrot,
                gender: true,
                pregnancyStatus: false,
            });

            setFirstParrot({
                ...firstParrot,
                gender: (e = false),
                pregnancyStatus: true,
            });
        } else if (e === 'false' && type === 'secondParrot') {
            setSecondParrot({
                ...secondParrot,
                gender: false,
                pregnancyStatus: true,
            });

            setFirstParrot({
                ...firstParrot,
                gender: (e = true),
                pregnancyStatus: false,
            });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Card maxW="md">
                    <CardBody>
                        <Image
                            src="https://img.freepik.com/premium-photo/two-love-parrots-rainbow-colors-illustartion_739548-1591.jpg"
                            alt="Green double couch with wooden legs"
                            borderRadius="lg"
                        />
                        <Stack mt="6" spacing="3">
                            <Heading size="lg" margin={0} minHeight={26}>
                                First Parrot
                            </Heading>
                            <Text>
                                <div className={cx('add-form')}>
                                    <div className={cx('add-form-item')}>
                                        <label>Color:</label>
                                        <select
                                            onChange={(e) => {
                                                setFirstParrot({ ...firstParrot, colorID: parseInt(e.target.value) });
                                                setFirstParrotColorSelected(false);
                                                setChoosenColorFirst(true);
                                            }}
                                        >
                                            <option
                                                value=""
                                                disabled
                                                selected={
                                                    firstParrotColorSelected ||
                                                    (firstParrotColorSelected === false && choosenColorFirst === false)
                                                }
                                            >
                                                Colors
                                            </option>
                                            {firstParrotColor &&
                                                firstParrotColor.map((firstParrotColor, firstParrotColorIndex) => (
                                                    <option key={firstParrotColorIndex} value={firstParrotColor.id}>
                                                        {firstParrotColor.color}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Age:</label>
                                        <input
                                            type="number"
                                            onChange={(e) =>
                                                setFirstParrot({ ...firstParrot, age: parseInt(e.target.value) })
                                            }
                                        />
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Health Status:</label>
                                        <select
                                            onChange={(e) =>
                                                setFirstParrot({
                                                    ...firstParrot,
                                                    healthStatus:
                                                        e.target.value === 'true'
                                                            ? (e.target.value = true)
                                                            : (e.target.value = false),
                                                })
                                            }
                                        >
                                            <option value="true">Good</option>
                                            <option value="false">Not Good</option>
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Pregnancy Status:</label>
                                        <select
                                            onChange={(e) =>
                                                setFirstParrot({
                                                    ...firstParrot,
                                                    pregnancyStatus:
                                                        e.target.value === 'true'
                                                            ? (e.target.value = true)
                                                            : (e.target.value = false),
                                                })
                                            }
                                        >
                                            {firstParrot.gender ? (
                                                <option value="false">No</option>
                                            ) : (
                                                <>
                                                    <option value="true">Yes</option>
                                                    <option value="false">No</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Gender:</label>
                                        <select
                                            onChange={(e) =>
                                                handleGenderSelect({ e: e.target.value, type: 'firstParrot' })
                                            }
                                        >
                                            <option value="false" selected={firstParrot.gender === false}>
                                                Female
                                            </option>
                                            <option value="true" selected={firstParrot.gender === true}>
                                                Male
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </Text>
                        </Stack>
                    </CardBody>
                </Card>
                <div className={cx('breed-zone')}>
                    {firstParrot.age === null ||
                    firstParrot.colorID === null ||
                    secondParrot.age === null ||
                    secondParrot.colorID === null ? (
                        <>
                            <Text>Choose Species</Text>
                            <FontAwesomeIcon icon={faHeart} className={cx('icon', 'disable')} />
                        </>
                    ) : (
                        <>
                            <Text>Breed Here</Text>
                            <FontAwesomeIcon icon={faHeart} className={cx('icon')} onClick={handleBreed} />
                        </>
                    )}

                    <div className={cx('add-form-item', 'species-selected')}>
                        {/* <label>Species:</label> */}
                        <select
                            onChange={(e) => {
                                setChoosenFirstParrotSpecies(e.target.value);
                                setFirstParrot({ ...firstParrot, colorID: null });
                                setSecondParrot({ ...secondParrot, colorID: null });
                                setFirstParrotColorSelected(true);
                                setChoosenColorFirst(false);
                                setChoosenColorSecond(false);
                            }}
                        >
                            <option value="" disabled selected>
                                Species
                            </option>
                            {combineData &&
                                combineData.map((species, speciesIndex) => (
                                    <option key={speciesIndex} value={species.speciesId}>
                                        {species.species[0].name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <Card maxW="md">
                    <CardBody>
                        <Image
                            src="https://img.freepik.com/premium-photo/two-love-parrots-rainbow-colors-illustartion_739548-1591.jpg"
                            alt="Green double couch with wooden legs"
                            borderRadius="lg"
                        />
                        <Stack mt="6" spacing="3">
                            <Heading size="lg" margin={0} minHeight={26}>
                                Second Parrot
                            </Heading>
                            <Text>
                                <div className={cx('add-form')}>
                                    <div className={cx('add-form-item')}>
                                        <label>Color:</label>
                                        <select
                                            onChange={(e) => {
                                                setSecondParrot({ ...secondParrot, colorID: parseInt(e.target.value) });
                                                setFirstParrotColorSelected(false);
                                                setChoosenColorSecond(true);
                                            }}
                                        >
                                            <option
                                                value=""
                                                disabled
                                                selected={
                                                    firstParrotColorSelected ||
                                                    (firstParrotColorSelected === false && choosenColorSecond === false)
                                                }
                                            >
                                                Colors
                                            </option>
                                            {firstParrotColor &&
                                                firstParrotColor.map((firstParrotColor, firstParrotColorIndex) => (
                                                    <option key={firstParrotColorIndex} value={firstParrotColor.id}>
                                                        {firstParrotColor.color}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Age:</label>
                                        <input
                                            type="number"
                                            onChange={(e) =>
                                                setSecondParrot({ ...secondParrot, age: parseInt(e.target.value) })
                                            }
                                        />
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Health Status:</label>
                                        <select
                                            onChange={(e) =>
                                                setSecondParrot({
                                                    ...secondParrot,
                                                    healthStatus:
                                                        e.target.value === 'true'
                                                            ? (e.target.value = true)
                                                            : (e.target.value = false),
                                                })
                                            }
                                        >
                                            <option value="true">Good</option>
                                            <option value="false">Not Good</option>
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Pregnancy Status:</label>
                                        <select
                                            onChange={(e) =>
                                                setSecondParrot({
                                                    ...secondParrot,
                                                    pregnancyStatus:
                                                        e.target.value === 'true'
                                                            ? (e.target.value = true)
                                                            : (e.target.value = false),
                                                })
                                            }
                                        >
                                            {secondParrot.gender === true ? (
                                                <option value="false">No</option>
                                            ) : (
                                                <>
                                                    <option value="true">Yes</option>
                                                    <option value="false">No</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Gender:</label>
                                        <select
                                            onChange={(e) =>
                                                handleGenderSelect({ e: e.target.value, type: 'secondParrot' })
                                            }
                                        >
                                            <option value="false" selected={secondParrot.gender === false}>
                                                Female
                                            </option>
                                            <option value="true" selected={secondParrot.gender === true}>
                                                Male
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </Text>
                        </Stack>
                    </CardBody>
                </Card>

                <AlertDialog
                    motionPreset="slideInBottom"
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                        <AlertDialogHeader>Save Changes?</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>Are you sure you want to save this parrot ?</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                No
                            </Button>
                            <Button colorScheme="red" ml={3}>
                                Yes
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}

export default AddParrotNestService;
