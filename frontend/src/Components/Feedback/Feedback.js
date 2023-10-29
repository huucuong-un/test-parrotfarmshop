import classNames from 'classnames/bind';
import styles from '~/Components/Feedback/Feedback.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import FeedbackAPI from '~/Api/FeedbackAPI';
import UserAPI from '~/Api/UserAPI';

import ParrotSpeciesColorAPI from '~/Api/ParrotSpeciesColorAPI';

import { useState } from 'react';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Feedback({ feedbackType, colorSortList }) {
    console.log(feedbackType);
    console.log(colorSortList);

    const [feedbackList, setFeedbacksList] = useState([]);
    const [count, setCount] = useState(0);
    const [combineData, setCombineData] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const [combineDataWithColor, setCombineDataWithColor] = useState([]);
    const [colorSort, setColorSort] = useState([]);
    const [ratingSort, setRatingSort] = useState(null);
    const [colorSortSelect, setcolorSortSelect] = useState(null);
    const [runOnce, setRunOnce] = useState(0);
    const [param, setParam] = useState({
        page: 1,
        limit: 6,
        speciesId: feedbackType.id,
        productType: feedbackType.type,
        rating: null,
        colorId: null,
    });
    const [paramCount, setParamCount] = useState({
        rating: null,
        colorId: null,
    });

    const StarRating = ({ rating }) => {
        const stars = [];

        var count = 0;
        for (let i = 0; i < rating; i++) {
            stars.push(<FontAwesomeIcon icon={solidStar} key={count} />);
            count = count + 1;
        }

        if (rating < 5) {
            for (let i = 0; i < 5 - rating; i++) {
                stars.push(<FontAwesomeIcon icon={regularStar} key={count} />);
                count = count + 1;
            }
        }
        return stars;
    };

    const sortFeedbackByRating = ({ rating, id, color }) => {
        setRatingSort(rating);
        setcolorSortSelect(color);
        for (let i = 0; i <= 5; i++) {
            const aliasId = 'rs' + i;
            document.getElementById(aliasId).style.backgroundColor = '';
        }
        document.getElementById(id).style.backgroundColor = '#f6c504';
        console.log(id);
        const param = {
            page: 1,
            limit: 6,
            speciesId: feedbackType.id,
            productType: feedbackType.type,
            rating: rating,
            colorId: color,
        };
        setParam(param);
    };

    useEffect(() => {
        const getFeedbackList = async () => {
            try {
                // const params = {
                //     page: 1,
                //     limit: 12,
                // };

                const feedbackListp = await FeedbackAPI.getAll(param);
                setFeedbacksList(feedbackListp.listResult);
                setTotalPage(feedbackListp.totalPage);
                console.log(feedbackListp.listResult);
            } catch (error) {
                console.error(error);
            }
        };
        // Gọi hàm getParrots khi component được mount
        getFeedbackList();
    }, [param]);
    // list feedback => luu no feedbacklist usestate => for lap cai list feedback
    useEffect(() => {
        const getUserName = async () => {
            const data = [];

            try {
                for (const items of feedbackList) {
                    const user = { ...items };
                    const userobject = await UserAPI.getUserById(items.userId);
                    user.username = userobject.userName;
                    user.imgUrl = userobject.imgUrl;
                    data.push(user);
                }
                setCombineData(data);
            } catch (error) {
                console.log(error);
            }
        };
        getUserName();
    }, [feedbackList]);
    useEffect(() => {
        const getColor = async () => {
            const dataColor = [];
            try {
                for (const items of combineData) {
                    const color = { ...items };
                    const colorobject = await ParrotSpeciesColorAPI.findOneSpeciesColorById(items.colorId);
                    console.log(colorobject[0]);
                    color.color = colorobject[0].color;
                    dataColor.push(color);
                }
                console.log(dataColor);

                setCombineDataWithColor(dataColor);
            } catch (error) {}
        };
        getColor();
    }, [combineData]);

    useEffect(() => {
        console.log(combineDataWithColor);
    }, [combineDataWithColor]);

    useEffect(() => {
        const createColorSort = async () => {
            const colorSorts = [];
            const rs = 'rs';
            const aliasIdO = 'rs0';
            colorSorts.push(
                <div id={aliasIdO} className={cx('sort-item')}>
                    <button
                        onClick={() => sortFeedbackByRating({ rating: null, id: aliasIdO, color: colorSortSelect })}
                    >
                        All
                    </button>
                </div>,
            );
            for (let i = 5; i >= 1; i--) {
                const aliasId = rs + i;
                var params = {
                    rating: i,
                    colorId: colorSortSelect,
                };
                const numberOfFeedback = await FeedbackAPI.countReview(params);

                if (numberOfFeedback === 0) {
                    colorSorts.push(
                        <div style={{ opacity: '0.7' }} id={aliasId} key={i} className={cx('sort-item')}>
                            <button
                                style={{ cursor: 'default' }}
                                disabled
                                onClick={() => sortFeedbackByRating({ rating: i, id: aliasId })}
                            >
                                {i} <FontAwesomeIcon icon={solidStar} /> ( {numberOfFeedback} )
                            </button>
                        </div>,
                    );
                } else {
                    colorSorts.push(
                        <div id={aliasId} key={i} className={cx('sort-item')}>
                            <button
                                onClick={() => sortFeedbackByRating({ rating: i, id: aliasId, color: colorSortSelect })}
                            >
                                {i} <FontAwesomeIcon icon={solidStar} /> ( {numberOfFeedback} )
                            </button>
                        </div>,
                    );
                }
            }
            setCount(1);
            setColorSort(colorSorts);
            console.log(colorSortSelect);
        };
        createColorSort();
    }, [feedbackList]);
    useEffect(() => {
        try {
            sortFeedbackByRating({ raing: null, id: 'rs0', color: colorSortSelect });
        } catch (error) {}
    }, [count]);
    return (
        <div className={cx('wrapper')}>
            <h1>Feedback</h1>
            <div className={cx('sort-feedback-container')}>
                <div className={cx('sort-item-container')}>
                    {colorSort}
                    <select
                        value={colorSortSelect}
                        style={{
                            cursor: 'pointer',
                            border: '0.5px solid rgba(0, 0, 0, 0.1)',
                        }}
                        onChange={(e) => sortFeedbackByRating({ rating: null, id: 'rs0', color: e.target.value })}
                    >
                        <option value="">Colors</option>
                        {colorSortList.map((color, index) => (
                            <option value={color.id}>{color.color}</option>
                        ))}
                    </select>
                </div>
            </div>
            {combineDataWithColor.map((feedback, index) => (
                <div className={cx('feedback-item')} key={index}>
                    <div className={cx('feedback-header')}>
                        <div className={cx('user-avatar')}>
                            <img src={feedback.imgUrl} alt="user-avatar" />
                        </div>
                        <div className={cx('feedback-header-info')}>
                            <p className={cx('feedback-header-info-name')}>{feedback.username}</p>
                            <div className={cx('parrot-star')}>
                                <StarRating rating={feedback.rating}></StarRating>
                            </div>
                        </div>
                    </div>
                    <div className={cx('feadback-date-and-type-container')}>
                        <div className={cx('feadback-date')}>
                            <p>{feedback.createdDate}</p>
                        </div>
                        <div className={cx('feadback-type')}>
                            <p>{feedback.color}</p>
                        </div>
                    </div>

                    <div className={cx('feadback-content')}>
                        <p>{feedback.content}</p>
                    </div>
                    {feedback.replyContent !== null ? (
                        <div className={cx('feadback-reply')}>
                            <div className={cx('feedback-header')}>
                                <div style={{ border: '1px solid black' }} className={cx('admin-avatar')}>
                                    <img
                                        src="http://localhost:3000/static/media/2(5).74c204955106ee08d9c2.png"
                                        alt="user-avatar"
                                    />
                                </div>
                                <div className={cx('feedback-header-info')}>
                                    <p className={cx('feedback-header-info-name', 'reply-font')}>Parrot Farm Shop</p>
                                    <div className={cx('feadback-date')}>
                                        <p>{feedback.replyDate}</p>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('feadback-content')}>
                                <p className={cx('reply-font')}>{feedback.replyContent}</p>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Feedback;
