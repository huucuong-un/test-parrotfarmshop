import classNames from 'classnames/bind';
import styles from '~/Pages/AddSlider/AddSlider.module.scss';
import {
    Input,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Switch,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import Title from '~/Components/Title/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faArrowsRotate, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import UpdateSlider from '~/Components/UpdateSlider/UpdateSlider';
import axios from 'axios';
import SliderAPI from '~/Api/SliderAPI';

const cx = classNames.bind(styles);

function AddSlider() {
    const [submissionStatus, setSubmissionStatus] = useState();
    const [loading, setLoading] = useState(false);

    const [img, setImg] = useState('');
    const [show, setShow] = useState(false);
    // Toast
    const toast = useToast();
    const handleShow = () => {
        setShow(!show);
    };
    const [slider, setSlider] = useState({
        sliderName: '',
        sliderDescription: '',
        sliderImageURL: img,
        status: true,
    });
    const [sliderList, setSliderList] = useState([]);
    const [reloadData, setReloadData] = useState(false);
    const handleUpdateSuccess = () => {
        setReloadData(true); // Set reloadData to true when the update is successful
    };
    useEffect(() => {
        const fetchData = async () => {
            const sliderList = await SliderAPI.getAll();
            setSliderList(sliderList.listResult);
        };
        if (reloadData) {
            fetchData();
            setReloadData(false);
        } else {
            fetchData();
        }
    }, [reloadData, slider]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responsePost = await axios.post('http://localhost:8086/api/slider', {
                sliderName: slider.sliderName,
                sliderDescription: slider.sliderDescription,
                sliderImageURL: img,
                status: slider.status,
            });

            console.log('POST request was successful at species!!');
            // Assuming the response contains the newly created post data
            setSlider({ ...slider, ...responsePost.data });
            setSubmissionStatus(true);
        } catch (error) {
            console.error('Error while making POST request:', error);
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
    const handleStatus = async (index) => {
        try {
            const updatedSlider = [...sliderList];
            updatedSlider[index].status = !updatedSlider[index].status;
            await axios.delete(`http://localhost:8086/api/slider/${updatedSlider[index].id}`);
            console.log('slider list in change status');
            console.log(updatedSlider);
            setSliderList(updatedSlider);
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
    const [openSliderID, setOpenSliderID] = useState(null);
    const toggleEditForm = (sliderID) => {
        if (openSliderID === sliderID) {
            // If the form is already open for this species, close it
            setOpenSliderID(null);
        } else {
            // Otherwise, open the form for this species
            setOpenSliderID(sliderID);
        }
    };

    // SORTING SPACEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    // SORTING SPACEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    const [sort, setSort] = useState({
        page: 1,
        limit: 10,
        name: null,
        status: null,
        date: null,
        sortDate: null,
    });
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    useEffect(() => {
        const sortData = async () => {
            try {
                const sliderSortList = await SliderAPI.searchSortForSlider(sort);
                setSliderList(sliderSortList.listResult);
                setTotalPage(sliderSortList.totalPage);
            } catch (error) {
                console.log(error);
            }
        };
        sortData();
    }, [sort]);

    const handlePageChange = (newPage) => {
        setSort({
            page: newPage,
            limit: 10,
            name: sort.name,
            status: sort.status,
            date: sort.date,
            sortDate: sort.sortDate,
        });

        setPage(newPage);
    };
    const handleClear = () => {
        setSort({
            page: 1,
            limit: 10,
            name: null,
            status: null,
            date: null,
            sortDate: null,
        });
    };

    console.log(sliderList);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-container')}>
                <Title system>Add slider</Title>
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
                                            id="sliderName"
                                            name="sliderName"
                                            value={slider.sliderName}
                                            onChange={(e) => setSlider({ ...slider, sliderName: e.target.value })}
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
                                            id="sliderDescription"
                                            name="sliderDescription"
                                            value={slider.sliderDescription}
                                            onChange={(e) =>
                                                setSlider({ ...slider, sliderDescription: e.target.value })
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
                    placeholder="Slider name"
                    onChange={(e) => setSort({ ...sort, name: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Slider name"
                    onChange={(e) => setSort({ ...sort, date: e.target.value })}
                />
                <select name="status" id="status" onChange={(e) => setSort({ ...sort, status: e.target.value })}>
                    <option value="" disabled selected>
                        Status
                    </option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>

                <select name="sortDate" id="sortDate" onChange={(e) => setSort({ ...sort, sortDate: e.target.value })}>
                    <option value="" disabled selected>
                        Sort Date
                    </option>
                    <option value="DDESC">Newest</option>
                    <option value="DASC">Oldest</option>
                </select>
            </div>
            <TableContainer className={cx('table-container')}>
                <Table size="xs ">
                    <Thead>
                        <Tr>
                            <Th className={cx('text-center')}>Slider ID</Th>
                            <Th className={cx('text-center')}>Slider name</Th>
                            <Th className={cx('text-center')}>Description</Th>
                            <Th className={cx('text-center')}>Slider image</Th>
                            <Th className={cx('text-center')}>Status</Th>
                            <Th className={cx('text-center')}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {sliderList.map((slider, index) => (
                            <>
                                <Tr key={slider.id}>
                                    <Td>{slider.id}</Td>
                                    <Td>{slider.sliderName}</Td>
                                    <Td>{slider.sliderDescription}</Td>
                                    <Td className={cx('image-container')}>
                                        <img src={slider.sliderImageURL} />
                                    </Td>
                                    <Td>
                                        <Switch
                                            onChange={() => handleStatus(index)}
                                            size="lg"
                                            isChecked={slider.status}
                                            colorScheme="green"
                                        />
                                        {slider.status ? (
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
                                            value={slider.status}
                                            onChange={(e) => setSlider({ ...slider, status: e.target.value })}
                                        />
                                    </Td>
                                    <Td>
                                        <Button
                                            key={slider.id}
                                            size="lg"
                                            colorScheme="green"
                                            onClick={() => toggleEditForm(slider.id)}
                                        >
                                            {openSliderID === slider.id ? 'Close edit' : 'Edit'}
                                        </Button>
                                    </Td>
                                </Tr>
                                <Tr key={index + 'slider'}>
                                    {openSliderID === slider.id && (
                                        <Td colSpan={8}>
                                            <UpdateSlider slider={slider} reloadData={handleUpdateSuccess} />
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

export default AddSlider;
