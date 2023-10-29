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
    useToast,
    RadioGroup,
    Stack,
    Radio,
    Text,
    Select,
} from '@chakra-ui/react';
import classNames from 'classnames/bind';
import styles from '~/Components/AddAccount/AddAccount.module.scss';
import { useEffect, useState } from 'react';
import AccountAPI from '~/Api/AccountAPI';
import RoleAPI from '~/Api/RoleAPI';
const cx = classNames.bind(styles);
function AddAccount(props) {
    const [img, setImg] = useState();
    const [roles, setRoles] = useState([]);

    const [status, setStatus] = useState(false);
    //these useState for upload image
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [gender, setGender] = useState();
    const [submissionStatus, setSubmissionStatus] = useState();
    const [account, setAccount] = useState({
        userName: '',
        email: '',
        password: '',
        fullName: '',
        status: status,
        roleId: null,
        imgUrl: img,
    });

    const handleStatus = () => {
        setStatus(!status);
    };

    const [reloadStatus, setReloadStatus] = useState(true);

    useEffect(() => {
        const loadRoles = async () => {
            try {
                const data = await RoleAPI.getRoles();
                setRoles(data);
                console.log(data);
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
        if (reloadStatus) {
            loadRoles();
            setReloadStatus(false);
        }
        loadRoles();
    }, [reloadStatus]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to the first API endpoint
            const responseAccount = await AccountAPI.addAccount({
                userName: account.email.split('@')[0],
                email: account.email,
                password: account.password,
                fullName: account.fullName,
                status: status,
                roleId: account.roleId,
                imgUrl: img,
                gender: gender,
            });
            props.onAdd({
                id: responseAccount.userId,
                userName: responseAccount.userName,
                fullName: responseAccount.fullName,
                email: responseAccount.email,
                status: responseAccount.status,
                roleId: responseAccount.roleId,
                token: responseAccount.token,
                imgUrl: responseAccount.imgUrl,
                gender: responseAccount.gender,
                dob: responseAccount.dob,
            });
            console.log(responseAccount);
            if (responseAccount.status === 200) {
                console.log('POST request was successful at ACCOUNT!!');
            } else {
                console.error('POST request failed with status code - ACCOUNT: ', responseAccount.status);
            }

            setSubmissionStatus(true);
        } catch (error) {
            console.error('Error:', error);
            setSubmissionStatus(false);
        }
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

        if (pic.type === 'image/jpeg' || pic.type === 'image/png' || pic.type === 'image/jpg') {
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

    return (
        <div className={cx('wrapper')}>
            <form onSubmit={handleSubmit} className={cx('inner')}>
                <TableContainer className={cx('table-container')}>
                    <Table size="xs ">
                        <Thead>
                            <Tr>
                                <Th fontSize={16}>Add Account</Th>
                                <Th fontSize={16}></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td fontSize={16}>Full Name</Td>
                                <Td>
                                    <Input
                                        fontSize={16}
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        variant="filled"
                                        placeholder="Full Name"
                                        value={account.fullName}
                                        onChange={(e) => setAccount({ ...account, fullName: e.target.value })}
                                        required
                                    />
                                </Td>
                            </Tr>

                            <Tr>
                                <Td fontSize={16}>Email</Td>
                                <Td>
                                    <Input
                                        fontSize={16}
                                        type="text"
                                        id="email"
                                        name="email"
                                        variant="filled"
                                        placeholder="Email"
                                        value={account.email}
                                        onChange={(e) => setAccount({ ...account, email: e.target.value })}
                                        required
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td fontSize={16}>Password</Td>
                                <Td>
                                    <Input
                                        fontSize={16}
                                        type="text"
                                        id="password"
                                        name="password"
                                        variant="filled"
                                        placeholder="Password"
                                        value={account.password}
                                        onChange={(e) => setAccount({ ...account, password: e.target.value })}
                                        required
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Gender</Td>
                                <Td>
                                    <RadioGroup onChange={setGender} defaultValue="null" fontSize={16} value={gender}>
                                        <Stack spacing={20} direction="row">
                                            <Radio value="true" size="lg">
                                                <Text fontSize={16} m={0}>
                                                    Male
                                                </Text>
                                            </Radio>
                                            <Radio value="false" fontSize={16} size="lg">
                                                <Text fontSize={16} m={0}>
                                                    Female
                                                </Text>
                                            </Radio>
                                        </Stack>
                                    </RadioGroup>
                                </Td>
                            </Tr>

                            <Tr>
                                <Td fontSize={16}>Status</Td>
                                <Td>
                                    <div className={cx('haha')}>
                                        <Switch onChange={handleStatus} size="lg" isChecked={status} />
                                        {status ? <p fontSize={16}>On Processing</p> : <p fontSize={16}>Disabled</p>}
                                    </div>
                                    <Input
                                        type="hidden"
                                        id="status"
                                        name="status"
                                        variant="filled"
                                        value={status}
                                        onChange={(e) => setAccount({ ...account, status: e.target.value })}
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td fontSize={16}>Image</Td>{' '}
                                <Td>
                                    <Input
                                        fontSize={16}
                                        type="file"
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        onChange={(e) => postDetails(e.target.files[0])}
                                        required
                                    />
                                </Td>
                            </Tr>

                            <Tr>
                                <Td fontSize={16}>Role</Td>{' '}
                                <Td>
                                    <Select
                                        placeholder="Select option"
                                        fontSize={16}
                                        onChange={(e) => setAccount({ ...account, roleId: e.target.value })}
                                    >
                                        {roles.map((role, roleIndex) => (
                                            <>
                                                <option value={role.id} fontSize={16}>
                                                    {role.name}
                                                </option>
                                                ;
                                            </>
                                        ))}
                                    </Select>
                                </Td>
                            </Tr>
                        </Tbody>

                        <Tfoot>
                            <Tr>
                                <Td></Td>
                                <Td className={cx('submit-btn')}>
                                    <Button
                                        isLoading={loading}
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

export default AddAccount;
