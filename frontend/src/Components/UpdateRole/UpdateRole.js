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
import styles from '~/Components/UpdateRole/UpdateRole.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RoleAPI from '~/Api/RoleAPI';
const cx = classNames.bind(styles);
function UpdateRole(props) {
    const [newRole, setNewRole] = useState(props.role);

    const [status, setStatus] = useState(false);

    const handleStatus = () => {
        setStatus(!status);
    };

    const handleSubmit = async () => {
        try {
            // Make a POST request to the first API endpoint
            const responseRole = await RoleAPI.updateRole(
                {
                    // Add other fields you want to send to the first API

                    name: newRole.name,
                    description: newRole.description,
                    status: newRole.status,
                    createdDate: newRole.createdDate,
                },
                newRole.id,
            );
            props.onUpdate(responseRole);
            console.log(responseRole.data);
            if (responseRole.status === 200) {
                console.log('POST request was successful at ROLE!!');
            } else {
                console.error('POST request failed with status code - ROLE: ', responseRole.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <form onSubmit={handleSubmit} className={cx('inner')}>
                <TableContainer className={cx('table-container')}>
                    <Table size="xs ">
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
                                        value={newRole.name}
                                        onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
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
                                        value={newRole.description}
                                        onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
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
                                        fontSize={16}
                                        className={cx('btn')}
                                        onClick={handleSubmit}
                                        width="100%"
                                        style={{ marginTop: 15 }}
                                        margin="8px"
                                    >
                                        CHANGE
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

export default UpdateRole;
