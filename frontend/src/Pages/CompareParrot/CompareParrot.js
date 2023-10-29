import { Box, Image, Text } from '@chakra-ui/react';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import styles from '~/Pages/CompareParrot/CompareParrot.module.scss';

const cx = classNames.bind(styles);

function CompareParrot() {
    const location = useLocation();
    const navigate = useNavigate();

    const data = location.state;
    useEffect(() => {
        console.log(data.selectedComparisonProduct);
    }, []);

    return (
        <Container style={{ minHeight: '800px' }}>
            <Row className={cx('row-item')} fontSize={'18px'} style={{ backgroundColor: '#f4f4f4' }}>
                <Col className={cx('col-item')}></Col>
                {data.selectedComparisonProduct.map((parrot, index) => {
                    return (
                        <Col className={cx('col-item', 'col-item-info')} key={index}>
                            <Box>
                                <Image
                                    boxSize="100px"
                                    objectFit="cover"
                                    src={parrot.img}
                                    alt={parrot.name}
                                    className={cx('img-parrot')}
                                    borderRadius={'50%'}
                                />

                                <Text
                                    fontSize={'18px'}
                                    fontWeight={'bold'}
                                    margin={3}
                                    mt={10}
                                    textTransform={'uppercase'}
                                >
                                    {parrot.name}
                                </Text>
                                <Text mb={8}>{parrot.description}</Text>

                                <Text>
                                    {parrot.colors.map((c) => (
                                        <label style={{ marginRight: '5px' }}>{c.price}$ </label>
                                    ))}
                                </Text>
                            </Box>
                        </Col>
                    );
                })}
            </Row>

            <Row className={cx('row-item')}>
                <Col className={cx('col-item')}>
                    <Text fontWeight={'bold'}> Origin</Text>
                </Col>

                {data.selectedComparisonProduct.map((parrot, index) => {
                    return (
                        <Col className={cx('col-item', 'col-item-info')}>
                            <Text>{parrot.origin}</Text>
                        </Col>
                    );
                })}
            </Row>
            <Row className={cx('row-item')} fontSize={'18px'} style={{ backgroundColor: '#f4f4f4' }}>
                <Col className={cx('col-item')}>
                    <Text fontWeight={'bold'}> Color</Text>
                </Col>

                {data.selectedComparisonProduct.map((parrot, index) => {
                    return (
                        <Col className={cx('col-item', 'col-item-info')} key={index}>
                            {parrot.colors.map((c) => (
                                <Text key={c.color} mr={2}>
                                    {c.color}{' '}
                                </Text>
                            ))}
                        </Col>
                    );
                })}
            </Row>

            <Row className={cx('row-item')}>
                <Col className={cx('col-item')}>
                    <Text fontWeight={'bold'}>Rating</Text>
                </Col>
                {data.selectedComparisonProduct.map((parrot, index) => {
                    return (
                        <Col className={cx('col-item', 'col-item-info')}>
                            <Text>{parrot.parrotAverageRating}</Text>
                        </Col>
                    );
                })}
            </Row>

            <Row className={cx('row-item')} fontSize={'18px'} style={{ backgroundColor: '#f4f4f4' }}>
                <Col className={cx('col-item')}>
                    <Text fontWeight={'bold'}> Average Weight</Text>
                </Col>
                {data.selectedComparisonProduct.map((parrot, index) => {
                    return (
                        <Col className={cx('col-item', 'col-item-info')}>
                            <Text>{parrot.averageWeight} kg</Text>
                        </Col>
                    );
                })}
            </Row>

            <Row className={cx('row-item')}>
                <Col className={cx('col-item')}>
                    <Text fontWeight={'bold'}>Status</Text>
                </Col>
                {data.selectedComparisonProduct.map((parrot, index) => {
                    return (
                        <Col className={cx('col-item', 'col-item-info')}>
                            {parrot.availabilityStatus ? <Text>Available</Text> : <Text>Unavailable</Text>}
                        </Col>
                    );
                })}
            </Row>

            <Row className={cx('row-item')} style={{ backgroundColor: '#f4f4f4' }}>
                <Col className={cx('col-item')}>
                    <Text fontWeight={'bold'}> </Text>
                </Col>
                <Col className={cx('col-item', 'col-item-info')}>
                    <FontAwesomeIcon icon={faLessThan} />
                    <Text
                        fontWeight={'600'}
                        ml={3}
                        mb={0}
                        className={cx('back-to-list')}
                        onClick={() => {
                            navigate('/parrot-product');
                        }}
                    >
                        Back To Parrot List
                    </Text>
                </Col>{' '}
                <Col className={cx('col-item', 'col-item-info')}>
                    <Text fontWeight={'bold'}> </Text>
                </Col>
            </Row>
        </Container>
    );
}

export default CompareParrot;
