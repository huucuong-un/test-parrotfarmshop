import classNames from 'classnames/bind';
import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import styles from '~/Pages/FAQs/FAQs.module.scss';
import Title from '~/Components/Title/Title';
import { Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import FAQSAPI from '~/Api/FAQSAPI';

const cx = classNames.bind(styles);

function Faq() {
    const [faqsList, setFaqsList] = useState([]);

    useEffect(() => {
        const getFaqsList = async () => {
            try {
                const faqsList = await FAQSAPI.getAll();
                setFaqsList(faqsList.listResult);
            } catch (error) {
                console.error(error);
            }
        };

        getFaqsList();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <StartPartPage>FAQS</StartPartPage>
            <div className={cx('container')}>
                <div className={cx('faqs-title')}>
                    <h1>Read answers to what most people ask us</h1>
                </div>

                <Accordion className={cx('accordion')} allowToggle>
                    {faqsList &&
                        faqsList.map((faqs, index) => (
                            <AccordionItem className={cx('accord-item')}>
                                <h3>
                                    <AccordionButton>
                                        <Box as="span" flex="1" textAlign="left">
                                            {faqs.title}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h3>
                                <AccordionPanel pb={4}>{faqs.content}</AccordionPanel>
                            </AccordionItem>
                        ))}
                </Accordion>
            </div>
        </div>
    );
}

export default Faq;
