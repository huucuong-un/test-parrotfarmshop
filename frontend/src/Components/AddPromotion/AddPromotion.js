import {
    Table,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Switch,
    Input,
    Thead,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import classNames from 'classnames/bind';
import styles from '~/Pages/AddRole/AddRole.module.scss';
import { useState } from 'react';
import axios from 'axios';
const cx = classNames.bind(styles);
function AddPromotion() {
    const [submissionStatus, setSubmissionStatus] = useState();
    const [role, setRole] = useState({
        name: '',
        description: '',
        status: false,
    });

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [status, setStatus] = useState(false);

    const handleStatus = () => {
        setStatus(!status);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to the first API endpoint
            const responseParrots = await axios.post('http://localhost:8086/api/role', {
                // Add other fields you want to send to the first API
                name: role.name,
                description: role.description,
                status: role.status,
            });
            if (responseParrots.status === 200) {
                console.log('POST request was successful at species!!');
            } else {
                console.error('POST request failed with status code - species: ', responseParrots.status);
            }

            setSubmissionStatus(true);
        } catch (error) {
            console.error('Error:', error);
            setSubmissionStatus(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <form onSubmit={handleSubmit} className={cx('inner')}>
                <TableContainer className={cx('table-container')}>
                    <Table size="xs ">
                        <Thead>
                            <Tr>
                                <Th fontSize={16}>Add Role</Th>
                                <Th fontSize={16}></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td fontSize={16}>Role name</Td>
                                <Td>
                                    <Input
                                        fontSize={16}
                                        type="text"
                                        id="name"
                                        name="name"
                                        variant="filled"
                                        placeholder="Name"
                                        value={role.name}
                                        onChange={(e) => setRole({ ...role, name: e.target.value })}
                                        required
                                    />
                                </Td>
                            </Tr>

                            <Tr>
                                <Td fontSize={16}>Description</Td>
                                <Td>
                                    <Input
                                        fontSize={16}
                                        type="text"
                                        id="description"
                                        name="description"
                                        variant="filled"
                                        placeholder="Description"
                                        value={role.description}
                                        onChange={(e) => setRole({ ...role, description: e.target.value })}
                                        required
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td fontSize={16}>Status</Td>
                                <Td>
                                    <div className={cx('haha')}>
                                        <Switch onChange={handleStatus} size="lg" isChecked={status} />
                                        {status ? <p fontSize={16}>Available</p> : <p fontSize={16}>Unavailable</p>}
                                    </div>
                                    <Input
                                        type="hidden"
                                        id="pregnancy"
                                        name="pregnancy"
                                        variant="filled"
                                        value={status}
                                        onChange={(e) => setRole({ ...role, status: e.target.value })}
                                    />
                                </Td>
                            </Tr>
                        </Tbody>

                        <Tfoot>
                            <Tr>
                                <Td></Td>
                                <Td className={cx('submit-btn')}>
                                    <Button
                                        fontSize={16}
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

export default AddPromotion;
