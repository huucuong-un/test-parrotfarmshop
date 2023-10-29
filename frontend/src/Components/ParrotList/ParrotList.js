// import 'bootstrap/dist/css/bootstrap.min.css

import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMagnifyingGlass, faCircleXmark, faSolid } from '@fortawesome/free-solid-svg-icons';

import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import ParrotAPI from '~/Api/ParrotAPI';
import { useCartStatus } from '~/Components/CartStatusContext/CartStatusContext';
import FeedbackAPI from '~/Api/FeedbackAPI';

import SortSpace from '../SortSpace/SortSpace';

import { useState, useEffect } from 'react';

import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    Tooltip,
} from '@chakra-ui/react';

import styles from '~/Components/ParrotList/ParrotList.module.scss';
import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import number1 from '~/Assets/image/NumberComparison/number-v4-1.png';
import number2 from '~/Assets/image/NumberComparison/number-2.png';
import number3 from '~/Assets/image/NumberComparison/number-3.png';

const cx = classNames.bind(styles);

const parrotSpeciesURL = 'http://localhost:8086/api/parrot-species';

// Make an HTTP GET request to the API endpoint
const datas = () => {
    fetch(parrotSpeciesURL)
        .then((response) => {
            // Check if the response status is OK (200)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse the JSON response
            return response.json();
        })
        .then((data) => {
            // Store the fetched data in a constant variable
            const parrotSpeciesData = data;

            // You can now use parrotSpeciesData as needed
            console.log(parrotSpeciesData);
        })
        .catch((error) => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
        });
};

console.log(datas);

function ParrotList(props) {
    const [parrotSpecies, setParrotSpecies] = useState([]);
    const [combineData, setCombineData] = useState([]);
    const [combineDataWithCountReview, setcombineDataWithCountReview] = useState([]);
    const [selectedColor, setSelectedColor] = useState({});
    const [quantities, setQuantities] = useState({});
    const [countParrot, setCountParrot] = useState(null);
    const [selectedColorId, setSelectedColorId] = useState({});
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
    });
    const [sortWithPagination, setSortWithPagination] = useState({
        page: 1,
        limit: 12,
        sortway: '',
    });

    const [searchWithPagination, setSearchWithPagination] = useState({
        page: 1,
        limit: 12,
        name: '',
    });
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);

    const dataToPass = {
        selectedColor,
        combineData,
        selectedColorId,
    };
    const { addToCartStatus, setAddToCartStatus } = useCartStatus();

    useEffect(() => {
        setSearchWithPagination({
            page: 1,
            limit: 12,
            name: props.search,
        });
    }, [props.search]);

    useEffect(() => {
        setSortWithPagination({
            page: 1,
            limit: 12,
            sortway: props.sortWay,
        });
    }, [props.sortWay]);

    // console.log(combineData);
    const [selectedComparisonProduct, setSelectedComparisonProduct] = useState([]);

    const handleColorSelection = async (parrotId, color, price, colorId) => {
        setSelectedColor({
            ...selectedColor,
            [parrotId]: {
                color: color,
                price: price,
                colorId: colorId,
            },
        });
        setSelectedColorId(colorId);
    };

    const handleAddToCompareProducts = (parrot) => {
        setSelectedComparisonProduct((prevProducts) => {
            if (prevProducts.length >= 0) {
                let compareSection = document.getElementById('compare-section-id');
                compareSection.style.display = 'block';
            }

            const isParrotAlreadySelected = prevProducts.some((p) => p.id === parrot.id);

            if (isParrotAlreadySelected) {
                return prevProducts.filter((p) => p.id !== parrot.id);
            } else {
                if (prevProducts.length === 3) {
                    return prevProducts;
                }
                return [...prevProducts, parrot];
            }
        });
    };

    const handleRemoveComparisonProduct = (parrot) => {
        setSelectedComparisonProduct((prevProducts) => {
            return prevProducts.filter((p) => p.id !== parrot.id);
        });
    };

    const handleCancelComparison = () => {
        let compareSection = document.getElementById('compare-section-id');
        compareSection.style.display = 'none';
        setSelectedComparisonProduct([]);
    };

    useEffect(() => {
        // console.log(selectedComparisonProduct);
        if (selectedComparisonProduct.length === 0) {
            let compareSection = document.getElementById('compare-section-id');
            compareSection.style.display = 'none';
        }
    }, [selectedComparisonProduct]);

    const handleQuantityIncrease = (parrotId) => {
        if (quantities[parrotId] < countParrot) {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [parrotId]: (prevQuantities[parrotId] || 0) + 1, // Tăng quantity cho parrot cụ thể
            }));
        }
    };

    const handleQuantityDecrease = (parrotId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [parrotId]: Math.max((prevQuantities[parrotId] || 0) - 1, 1), // Giới hạn số lượng tối thiểu là 1
        }));
    };
    useEffect(() => {
        const getParrotsSpecies = async () => {
            try {
                // const params = {
                //     page: 1,
                //     limit: 12,
                // };
                const parrotSpeciesList = await ParrotSpeciesAPI.getAll(pagination);
                setParrotSpecies(parrotSpeciesList.listResult);
                setTotalPage(parrotSpeciesList.totalPage);
            } catch (error) {
                console.error(error);
            }
        };
        getParrotsSpecies();
    }, [pagination]);

    useEffect(() => {
        const getSortParrotSpecies = async () => {
            try {
                // const params = {
                //     page: 1,
                //     limit: 12,
                //     sortway: 'NDESC',
                // };
                const sortList = await ParrotSpeciesAPI.sort(sortWithPagination);
                console.log(sortList.listResult);
                setParrotSpecies(sortList.listResult);
            } catch (error) {
                console.error(error);
            }
        };
        getSortParrotSpecies();
    }, [sortWithPagination]);

    useEffect(() => {
        const getSearchParrotSpecies = async () => {
            try {
                const params = {
                    page: 1,
                    limit: 12,
                    name: 'c',
                };
                const searchList = await ParrotSpeciesAPI.search(searchWithPagination);
                setParrotSpecies(searchList.listResult);
                console.log(parrotSpecies);
            } catch (error) {
                console.error(error);
            }
        };
        getSearchParrotSpecies();
    }, [searchWithPagination]);

    useEffect(() => {
        console.log(parrotSpecies);
    }, [parrotSpecies]);

    useEffect(() => {
        const getCountAvailableParrotId = async () => {
            try {
                const availableParrot = await ParrotAPI.countAvailableParrotId(selectedColorId);
                setCountParrot(availableParrot);
            } catch (error) {
                console.error(error);
            }
        };

        getCountAvailableParrotId();
    }, [selectedColorId]);

    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            for (const item of parrotSpecies) {
                const parrot = { ...item };
                try {
                    const params = {
                        id: item.id,
                    };
                    parrot.colors = await ParrotSpeciesAPI.getListBySpeciesId(item.id);
                    parrot.countReview = await FeedbackAPI.countReview(params);
                    data.push(parrot);
                } catch (error) {
                    console.error(error);
                }
            }

            const initialSelectedColor = {};
            data.forEach((parrot) => {
                if (parrot.colors.length > 0) {
                    let maxColorId = parrot.colors[0].id;
                    parrot.colors.forEach((color) => {
                        if (color.id > maxColorId) {
                            maxColorId = color.id;
                        }
                    });
                    initialSelectedColor[parrot.id] = {
                        color: parrot.colors[0].color,
                        price: parrot.colors[0].price,
                        colorId: maxColorId,
                    };
                }
            });

            setSelectedColor(initialSelectedColor);

            const initialQuantities = {};
            data.forEach((parrot) => {
                initialQuantities[parrot.id] = 1;
            });
            setQuantities(initialQuantities);
            setCombineData(data);
        };

        fetchData();
    }, [parrotSpecies]);

    useEffect(() => {
        console.log(combineData);
    }, [combineData]);

    const handleAddToCart = ({ name, img, quantity, price, color, colorID, id }) => {
        setAddToCartStatus((prev) => prev + 1);
        const existingCart = JSON.parse(localStorage.getItem('parrot')) || [];
        const existingItem = existingCart.find((item) => item.name === name && item.color === color);
        let maxId = 0;
        if (existingCart.length != 0) {
            existingCart.forEach((item) => {
                if (item.id > maxId) {
                    maxId = item.id;
                }
            });
        }
        if (existingItem) {
            // Nếu mục đã tồn tại, tăng số lượng lên 1
            existingItem.quantity += 1;
        } else {
            // Nếu mục chưa tồn tại, thêm nó vào danh sách
            existingCart.push({
                id: existingCart.length == 0 ? 0 : maxId + 1,
                name,
                img,
                quantity: 1,
                price,
                color,
                colorID,
            });

            // setTotalParrotsInCart((prevTotal) => prevTotal + 1);
        }
        const newCart = [...existingCart];
        localStorage.setItem('parrot', JSON.stringify(newCart));
        // localStorage.clear();
        const deleteAfterMilliseconds = 365 * 24 * 60 * 60 * 1000; // 1 năm
        // const deleteAfterMilliseconds = 1 * 60 * 1000; // 1 phút
        setTimeout(() => {
            localStorage.removeItem('parrot'); // Xóa dữ liệu sau khoảng thời gian đã đặt
        }, deleteAfterMilliseconds);
    };

    const handlePageChange = (newPage) => {
        setPagination({
            page: newPage,
            limit: 12,
        });

        setSortWithPagination({
            page: newPage,
            limit: 12,
            sortway: sortWithPagination,
        });

        setSearchWithPagination({
            page: newPage,
            limit: 12,
            name: searchWithPagination,
        });

        setPage(newPage);
        console.log(page);
        console.log(pagination);
    };

    const dataCompareToPass = {
        selectedComparisonProduct,
    };
    console.log(combineData);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner', 'row')}>
                {combineData.map((parrot, index) => {
                    return (
                        <div className={cx('parrot-card', 'col-lg-3')} key={index}>
                            <div className={cx('parrot-img')}>
                                <Link to={`/parrot-product/parrot-detail/${parrot.id}`} state={dataToPass}>
                                    <img className={cx('img')} src={parrot.img} alt="parrot" />
                                </Link>
                                <Link to="">
                                    <Tooltip
                                        label="Check to compare"
                                        aria-label="A tooltip"
                                        fontSize="lg"
                                        placement="auto"
                                    >
                                        <button
                                            className={cx('buy-btn')}
                                            onClick={() => {
                                                handleAddToCompareProducts(parrot);
                                            }}
                                        >
                                            {selectedComparisonProduct.some((p) => p.id === parrot.id) ? (
                                                <FontAwesomeIcon icon={faCircleXmark} />
                                            ) : (
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            )}
                                        </button>
                                    </Tooltip>
                                </Link>
                                <Link to="">
                                    <Tooltip label="Add to cart" aria-label="A tooltip" fontSize="lg" placement="auto">
                                        {/* <FontAwesomeIcon className={cx('cart-btn')} icon={faBagShopping} /> */}

                                        <button
                                            className={cx('cart-btn')}
                                            onClick={() =>
                                                handleAddToCart({
                                                    id: count,
                                                    name: parrot.name,
                                                    img: parrot.img,
                                                    quantity: 1,
                                                    price: selectedColor[parrot.id]?.price,
                                                    color: selectedColor[parrot.id]?.color,
                                                    colorID: selectedColor[parrot.id]?.colorId,
                                                })
                                            }
                                        >
                                            +
                                        </button>
                                    </Tooltip>
                                </Link>
                            </div>

                            {/* <div className={cx('parrot-info')}>
                                <p className={cx('parrot-name')}>{parrot.name}</p>

                                <div className={cx('parrot-color')}>
                                    {parrot.colors.map((color, colorIndex) => (
                                        <div className={cx('cuong')}>
                                            <button
                                                key={colorIndex}
                                                className={cx('parrot-color-item', {
                                                    selected: color.color === selectedColor[parrot.id]?.color,
                                                })}
                                                onClick={() =>
                                                    handleColorSelection(parrot.id, color.color, color.price, color.id)
                                                }
                                                style={{ backgroundColor: color.color }}
                                            ></button>
                                        </div>
                                    ))}
                                </div> */}

                            <div className={cx('parrot-info')}>
                                <p className={cx('parrot-name')}>{parrot.name}</p>

                                <div className={cx('parrot-color')}>
                                    {parrot.colors.map((color, colorIndex) => (
                                        <div className={cx('cuong')}>
                                            <button
                                                key={colorIndex}
                                                className={cx('parrot-color-item', {
                                                    selected: color.color === selectedColor[parrot.id]?.color,
                                                })}
                                                onClick={() =>
                                                    handleColorSelection(parrot.id, color.color, color.price, color.id)
                                                }
                                                style={{ backgroundColor: color.color }}
                                            ></button>
                                        </div>
                                    ))}
                                </div>

                                <div className={cx('parrot-price')}>
                                    <p>$ {selectedColor[parrot.id]?.price}</p>
                                </div>
                                <div className={cx('parrot-like')}>
                                    <FontAwesomeIcon className={cx('parrot-like-icon')} icon={faHeart} />
                                    <p className={cx('parrot-like-quantity')}>{parrot.countReview} reviews</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={cx('compare-section')} id="compare-section-id">
                <Container className={cx('compare-container')}>
                    <Row className={cx('compare-row')}>
                        <Col className={cx('compare-col')}>
                            <Text fontSize="4xl" as="b" textAlign={'left'}>
                                COMPARE UP TO 3 PRODUCTS
                            </Text>
                        </Col>
                        <Col xs={7} className={cx('compare-col', 'compare-col-product')}>
                            <Menu>
                                <Box className={cx('product-item')}>
                                    {selectedComparisonProduct.length === 0 ? (
                                        <Avatar size="2xl" src={number1} />
                                    ) : (
                                        <>
                                            <button
                                                className={cx('product-item-cancel-button')}
                                                onClick={() =>
                                                    handleRemoveComparisonProduct(selectedComparisonProduct[0])
                                                }
                                            >
                                                x
                                            </button>
                                            <Avatar size="2xl" src={selectedComparisonProduct[0].img} />
                                        </>
                                    )}
                                </Box>
                                <Box className={cx('product-item')}>
                                    {selectedComparisonProduct.length < 2 ? (
                                        <Avatar size="2xl" src={number2} />
                                    ) : (
                                        <>
                                            <button
                                                className={cx('product-item-cancel-button')}
                                                onClick={() =>
                                                    handleRemoveComparisonProduct(selectedComparisonProduct[1])
                                                }
                                            >
                                                x
                                            </button>
                                            <Avatar size="2xl" src={selectedComparisonProduct[1].img} />
                                        </>
                                    )}
                                </Box>
                                <Box className={cx('product-item')}>
                                    {selectedComparisonProduct.length < 3 ? (
                                        <Avatar size="2xl" src={number3} />
                                    ) : (
                                        <>
                                            <button
                                                className={cx('product-item-cancel-button')}
                                                onClick={() =>
                                                    handleRemoveComparisonProduct(selectedComparisonProduct[2])
                                                }
                                            >
                                                x
                                            </button>
                                            <Avatar size="2xl" src={selectedComparisonProduct[2].img} />
                                        </>
                                    )}
                                </Box>
                            </Menu>
                        </Col>
                        <Col className={cx('compare-col', 'compare-col-confirm')}>
                            {selectedComparisonProduct.length > 1 ? (
                                <Link
                                    to={`/compare-products`}
                                    state={dataCompareToPass}
                                    class={cx('compare-button-confirm')}
                                >
                                    COMPARE SELECTION
                                </Link>
                            ) : (
                                <Button
                                    size="lg"
                                    class={cx('compare-button-confirm')}
                                    disabled={selectedComparisonProduct.length <= 1}
                                    style={{
                                        opacity: selectedComparisonProduct.length <= 1 ? '0.5' : '1',
                                    }}
                                >
                                    COMPARE SELECTION
                                </Button>
                            )}

                            <Button
                                size="lg"
                                class={cx('compare-button-cancel')}
                                onClick={() => handleCancelComparison()}
                            >
                                CANCEL
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className={cx('button-pagination')}>
                <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
                    Prev
                </button>
                <button disabled={page === totalPage} onClick={() => handlePageChange(page + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default ParrotList;
