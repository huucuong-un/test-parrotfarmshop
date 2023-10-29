import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Collapse from 'react-bootstrap/Collapse';
import { Image } from '@chakra-ui/react';
import { Button, ButtonGroup, WrapItem } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faMinus,
    faUser,
    faEnvelope,
    faCalendar,
    faRestroom,
    faTag,
    faLocation,
    faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
} from '@chakra-ui/react';
import { ShopState } from '~/context/ShopProvider';
import DeliveryInformation from '../DeliveryInformation/DeliveryInformation';

const cx = classNames.bind(styles);

function UserProfile() {
    const fileInputRef = useRef(null);

    // Function to trigger the file input when the button is clicked
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    // Function to handle file selection
    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Handle the selected file as needed (e.g., upload or display its information)
            console.log('Selected file:', selectedFile.name);
        }
    };

    const { user } = ShopState();

    const [showShow, setShowShow] = useState(true);

    const toggleShow = () => setShowShow(!showShow);
    const [open, setOpen] = useState(true);
    const btnRef = React.useRef();
    return (
        <>
            {/* wrapper */}
            <div className={cx('wrapper')}>
                {/* userprofile-container */}
                <div className={cx('userprofile-container', 'row')}>
                    {/* userprofile-item */}
                    <div className={cx('userprofile-item', 'col-md-4')}>
                        {/* userprofile-item-header */}
                        <div className={cx('userprofile-item-header', 'row')}>
                            {/* userprofile-item-header-item */}
                            <div className={cx('userprofile-item-header-item', 'col-md-3', 'col-sm-3')}>
                                <img src={user.imgUrl}></img>
                            </div>
                            {/* userprofile-item-header-item */}
                            <div
                                className={cx(
                                    'userprofile-item-header-item',
                                    'col-md-4',
                                    'col-sm-4',
                                    'userprofile-item-header-item-button',
                                )}
                            >
                                <Button onClick={handleButtonClick} colorScheme="blue">
                                    Change Password
                                </Button>
                            </div>
                            {/* userprofile-item-header-item */}
                        </div>
                        {/* userprofile-item-header */}
                        {/* userprofile-item-body */}
                        <div className={cx('userprofile-item-body', 'row')}>
                            <div className={cx('userprofile-item-body-item', 'col-md-12')}>
                                <p style={{ fontSize: '1.6rem', fontWeight: 500 }} className="information">
                                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> UserName:
                                </p>
                                <div className={cx('userprofile-item-body-item-info', 'row')}>
                                    <input
                                        value={user.userName}
                                        disabled
                                        className={cx(
                                            'userprofile-item-body-item-info-name',
                                            'col-md-6',
                                            'information-detail',
                                        )}
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('userprofile-item-body-item', 'col-md-12')}>
                                <p style={{ fontSize: '1.6rem', fontWeight: 500 }} className="information">
                                    <FontAwesomeIcon icon={faTag}></FontAwesomeIcon> Full Name:
                                </p>
                                <div className={cx('userprofile-item-body-item-info', 'row')}>
                                    <p
                                        className={cx(
                                            'userprofile-item-body-item-info-name',
                                            'col-md-6',
                                            'information-detail',
                                        )}
                                    >
                                        {user.fullName}
                                    </p>
                                </div>
                            </div>
                            <div className={cx('userprofile-item-body-item', 'col-md-12')}>
                                <p style={{ fontSize: '1.6rem', fontWeight: 500 }} className="information">
                                    <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> Email:
                                </p>
                                <div className={cx('userprofile-item-body-item-info', 'row')}>
                                    <p
                                        className={cx(
                                            'userprofile-item-body-item-info-name',
                                            'col-md-6',
                                            'information-detail',
                                        )}
                                    >
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                            <div className={cx('userprofile-item-body-item', 'col-md-12')}>
                                <p style={{ fontSize: '1.6rem', fontWeight: 500 }} className="information">
                                    <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> Date of birth:
                                </p>
                                <div className={cx('userprofile-item-body-item-info', 'row')}>
                                    <p
                                        className={cx(
                                            'userprofile-item-body-item-info-name',
                                            'col-md-6',
                                            'information-detail',
                                        )}
                                    >
                                        {user.dob}
                                    </p>
                                </div>
                            </div>
                            <div className={cx('userprofile-item-body-item', 'col-md-12')}>
                                <p style={{ fontSize: '1.6rem', fontWeight: 500 }} className="information">
                                    <FontAwesomeIcon icon={faRestroom}></FontAwesomeIcon> Gender:
                                </p>
                                <div className={cx('userprofile-item-body-item-info', 'row')}>
                                    <p
                                        className={cx(
                                            'userprofile-item-body-item-info-name',
                                            'col-md-6',
                                            'information-detail',
                                        )}
                                    >
                                        {user.gender}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* // */}
                        {/* userprofile-item-body */}
                    </div>
                    <div className={cx('userprofile-item-2', 'col-md-4', 'row')}>
                        <div className={cx('userprofile-item-body-item', 'col-md-12')}>
                            <div className={cx('userprofile-item-footer', 'row')}>
                                <div style={{ display: 'block', width: 700 }}>
                                    <div style={{}}>
                                        <Button
                                            marginBottom={'5%'}
                                            backgroundColor={'rgba(82, 82, 82, 0.115)'}
                                            borderRadius={'25px'}
                                            variant={Text}
                                            onClick={() => setOpen(!open)}
                                            aria-expanded={open}
                                            aria-controls="collapseID"
                                        >
                                            <div>
                                                <FontAwesomeIcon icon={faLocationDot} /> DeliveryInformation{' '}
                                                {!open ? (
                                                    <FontAwesomeIcon icon={faPlus} />
                                                ) : (
                                                    <FontAwesomeIcon icon={faMinus} />
                                                )}
                                            </div>
                                        </Button>
                                        <Collapse in={open}>
                                            <div
                                                id="collapseID"
                                                style={{
                                                    textAlign: 'justify',
                                                    boxShadow:
                                                        'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                                                }}
                                            >
                                                <div
                                                    className="delivery"
                                                    style={{
                                                        textAlign: 'justify',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <p
                                                            style={{ fontSiz: '1.6rem', fontWeight: '500' }}
                                                            className="full-name"
                                                        >
                                                            Le Cong Vinh
                                                        </p>
                                                        <p className="phone">090909232</p>
                                                    </div>
                                                    <p style={{ fontSize: '1.4rem' }} className="address">
                                                        Âp 7 chợ, xã Đông thái, Huyện An Biên
                                                    </p>
                                                </div>
                                                <hr></hr>
                                                <div
                                                    className="delivery"
                                                    style={{
                                                        textAlign: 'justify',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <p
                                                            style={{ fontSiz: '1.6rem', fontWeight: '500' }}
                                                            className="full-name"
                                                        >
                                                            Phan Thi Minh Anh
                                                        </p>
                                                        <p className="phone">093848593</p>
                                                    </div>
                                                    <p style={{ fontSize: '1.4rem' }} className="address">
                                                        Buon trap, Darklag, An Duong
                                                    </p>
                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* userprofile-item */}
                </div>

                {/* userprofile-container */}
            </div>
            {/* wrapper */}
        </>
    );
}

export default UserProfile;
