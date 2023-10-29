import classNames from 'classnames/bind';
import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import styles from '~/Pages/PostDetail/PostDetail.module.scss';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostAPI from '~/Api/PostAPI';

const cx = classNames.bind(styles);

function PostDetail() {
    const location = useLocation();
    const receivedData = location.state;
    const [post, setPost] = useState({});

    useEffect(() => {
        const getPostItem = async () => {
            try {
                const params = {
                    postId: receivedData,
                };
                const getPost = PostAPI.get(params);
                getPost.then((result) => {
                    setPost(result);
                });
            } catch (error) {
                console.error(error);
            }
        };
        getPostItem();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <StartPartPage>Post Details</StartPartPage>
            <div className="inner">
                <div className={cx('inner-up')}>
                    <div className={cx('post-img')}>
                        <img
                            src="https://images.unsplash.com/photo-1588336142586-36aff13141fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            alt="post-img"
                        />
                    </div>

                    <div className={cx('post-info')}>
                        <div className={cx('post-info-title')}>
                            <h1>{post.title}</h1>
                        </div>
                        <div className={cx('post-info-content')}>
                            <p>{post.content}</p>
                        </div>
                    </div>
                </div>

                <div className={cx('inner-down')}>
                    <div className={cx('inner-down-title')}>
                        <h1>Latests Events</h1>
                    </div>
                    <div className={cx('post-latests-container')}>
                        <div className={cx('post-latests-img')}>
                            <img
                                src="https://images.unsplash.com/photo-1588336142586-36aff13141fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt="post-latests-img"
                            />
                        </div>
                        <div className={cx('post-latests-info')}>
                            <p className={cx('post-latests-info-title')}>Vatos Locos and Friend Friday 5.26</p>
                            <p className={cx('post-latests-info-date')}>May 19, 2021</p>
                            <div className={cx('more-btn')}>
                                <button>More</button>
                            </div>
                        </div>
                    </div>

                    <div className={cx('post-latests-container')}>
                        <div className={cx('post-latests-img')}>
                            <img
                                src="https://images.unsplash.com/photo-1588336142586-36aff13141fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt="post-latests-img"
                            />
                        </div>
                        <div className={cx('post-latests-info')}>
                            <p className={cx('post-latests-info-title')}>Vatos Locos and Friend Friday 5.26</p>
                            <p className={cx('post-latests-info-date')}>May 19, 2021</p>
                            <div className={cx('more-btn')}>
                                <button>More</button>
                            </div>
                        </div>
                    </div>

                    <div className={cx('post-latests-container')}>
                        <div className={cx('post-latests-img')}>
                            <img
                                src="https://images.unsplash.com/photo-1588336142586-36aff13141fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt="post-latests-img"
                            />
                        </div>
                        <div className={cx('post-latests-info')}>
                            <p className={cx('post-latests-info-title')}>Vatos Locos and Friend Friday 5.26</p>
                            <p className={cx('post-latests-info-date')}>May 19, 2021</p>
                            <div className={cx('more-btn')}>
                                <button>More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
