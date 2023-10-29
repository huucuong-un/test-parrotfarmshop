import classNames from 'classnames/bind';

import styles from '~/Components/UpdateParrot/UpdateParrot.module.scss';
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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import ParrotAPI from '~/Api/ParrotAPI';
const cx = classNames.bind(styles);

function UpdateParrot({ parrot, reloadData }) {
    const [submissionStatus, setSubmissionStatus] = useState();
    const [shouldFetchData, setShouldFetchData] = useState(true);
    const [species, setSpecies] = useState([]);
    const [speciesColor, setSpeciesColor] = useState([]);
    const [speciesColorByID, setSpeciesColorById] = useState([]);
    const [newParrot, setNewParrot] = useState(parrot);
    console.log('new Parrot');
    console.log(newParrot);
    const handleUpdateParentStatus = () => {
        // Simulate an update action here
        // After the update is successful, call the function from the parent to set reloadData to true
        // This will trigger the parent component to reload its data
        // setStatus(true); // Update the status to true
        reloadData(); // Call the parent function to set reloadData to true
    };
    // Handel add parrot
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                id: newParrot.id,
                age: newParrot.age,
                status: newParrot.status,
                saleStatus: newParrot.saleStatus,
                pregnancyStatus: newParrot.pregnancyStatus,
                healthStatus: newParrot.healthStatus,
                numberOfChildren: newParrot.numberOfChildren,
                colorID: newParrot.colorID,
            };
            const responseParrots = await ParrotAPI.updateParrot(data);
            // Add other fields you want to send to the first API
            if (responseParrots.status === 200) {
                console.log('POST request was successful at species!!');
                setShouldFetchData(true); // Set to true to reload data
            } else {
                console.error('POST request failed with status code - species: ', responseParrots.status);
            }
            setSubmissionStatus(true);
            setTimeout(() => {
                setSubmissionStatus(null);
            }, 5000);
        } catch (error) {
            console.error('Error:', error);
            setSubmissionStatus(false);
        }
    };

    // Add species list
    useEffect(() => {
        const fetchParrotSpecies = async () => {
            try {
                const parrotSpecie = await ParrotSpeciesAPI.getAll();
                setSpecies(parrotSpecie.listResult);
            } catch (error) {
                console.error(error + 'At Add parrot fetch parrot species');
            }
        };
        fetchParrotSpecies();
    }, [speciesColorByID]);

    // Find species color by species id
    useEffect(() => {
        const fetchParrotSpeciesColorbyID = async () => {
            try {
                if (
                    speciesColorByID !== undefined ||
                    speciesColorByID !== 'Select a color' ||
                    speciesColorByID !== 'Selected specie' ||
                    speciesColorByID.length !== 0
                ) {
                    const listSpeciesColorById = await ParrotSpeciesAPI.getListBySpeciesId(speciesColorByID);
                    if (listSpeciesColorById != null) {
                        setSpeciesColor(listSpeciesColorById);
                    }
                } else {
                    // // Handle the case where the response is null
                    // console.error('Received a null response from ParrotSpeciesAPI.getListBySpeciesId');
                    // // You can set an empty array or perform other error handling here
                    setSpeciesColor([]);
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchParrotSpeciesColorbyID();
    }, [speciesColorByID]);
    // Fetch parrot list

    return (
        <div className={cx('wrapper')}>
            <form className={cx('inner')} onSubmit={handleSubmit}>
                <div className={cx('table-container')}>
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
                </div>
                <TableContainer className={cx('table-container')}>
                    <Table size="xs ">
                        <Thead>
                            <Tr>
                                <Th colSpan={2}>Update parrot</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>
                                    <p>Parrot Age</p>
                                </Td>
                                <Td>
                                    <Input
                                        type="number"
                                        id="age"
                                        name="age"
                                        variant="filled"
                                        placeholder="Parrot age"
                                        value={newParrot.age}
                                        onChange={(e) => setNewParrot({ ...newParrot, age: e.target.value })}
                                        required
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <p>Parrot species </p>
                                </Td>
                                <Td>
                                    <select
                                        className={cx('select-btn')}
                                        onChange={(e) => setSpeciesColorById(e.target.value)}
                                    >
                                        <option key={'a'} value={'a'}>
                                            Selected specie
                                        </option>
                                        {species.map((specie, index) => (
                                            <option key={index} value={specie.id}>
                                                {specie.name}
                                            </option>
                                        ))}
                                    </select>
                                </Td>
                            </Tr>

                            <Tr>
                                <Td>
                                    <p>Parrot species color </p>
                                </Td>
                                <Td>
                                    {speciesColor.length === 0 ? (
                                        <p>Species have no color</p>
                                    ) : (
                                        <select
                                            className={cx('select-btn')}
                                            value={newParrot.colorID}
                                            onChange={(e) => {
                                                const selectedColorId = e.target.value;
                                                console.log('Selected color ID:', selectedColorId);
                                                setNewParrot({ ...newParrot, colorID: selectedColorId });
                                            }}
                                        >
                                            {speciesColor.map((item, index) => (
                                                <>
                                                    <option key={'color'}>Select a color</option>

                                                    <option
                                                        key={index}
                                                        value={item.id}
                                                        style={{ backgroundColor: item.color, padding: '5px' }}
                                                    >
                                                        {item.color}
                                                    </option>
                                                    <p>{item.name}</p>
                                                </>
                                            ))}
                                        </select>
                                    )}
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

export default UpdateParrot;
