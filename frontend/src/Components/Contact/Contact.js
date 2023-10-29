import React from 'react';
import { Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import telephoneLogo from '~/Assets/image/Logo/telephoneLogo.png';
import telegramLogo from '~/Assets/image/Logo/telegramLogo.png';
import ZaloLogo from '~/Assets/image/Logo/ZaloLogo.png';
import MessengerLogo from '~/Assets/image/Logo/messenger.png';
import styles from '~/Components/Contact/Contact.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
export default function Contact() {
    return (
        <div className={cx('wapper')}>
            <div className={cx('inner')}>
                <Accordion className={cx('contact-logo')} allowToggle>
                    <AccordionItem className={cx('accordionItem')} width={70}>
                        <h2>
                            <AccordionButton className={cx('accordionButton')}>
                                <FontAwesomeIcon className={cx('logo')} icon={faComments} />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <a href="tel://0898878931" target="_blank">
                                <img className={cx('contact_img')} src={telephoneLogo} />
                            </a>
                        </AccordionPanel>
                        <AccordionPanel pb={4}>
                            <a href="https://m.me/j/AbbbNC86oDEKEb1Y/" target="_blank">
                                <img className={cx('contact_img')} src={MessengerLogo} />
                            </a>
                        </AccordionPanel>
                        <AccordionPanel pb={4}>
                            <a href="https://zalo.me/g/rrovpr452" target="_blank">
                                <img className={cx('contact_img')} src={ZaloLogo} />
                            </a>
                        </AccordionPanel>
                        <AccordionPanel pb={4}>
                            <a href="https://t.me/+ZkuBXHe6lVFhZGJl" target="_blank">
                                <img className={cx('contact_img')} src={telegramLogo} />
                            </a>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
