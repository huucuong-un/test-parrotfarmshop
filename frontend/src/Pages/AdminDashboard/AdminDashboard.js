import React from 'react';
import {
    Box,
    Container,
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Heading,
    Center,
} from '@chakra-ui/react';
import { Col, Row } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './AdminDashboard.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function AdminDashboard() {
    const data = [
        { month: 'Jan', earnings: 40000 },
        { month: 'Feb', earnings: 30000 },
        { month: 'Mar', earnings: 45000 },
        { month: 'Apr', earnings: 35000 },
        { month: 'May', earnings: 50000 },
        { month: 'Jun', earnings: 60000 },
        { month: 'Jul', earnings: 55000 },
        { month: 'Aug', earnings: 65000 },
        { month: 'Sep', earnings: 70000 },
        { month: 'Oct', earnings: 80000 },
        { month: 'Nov', earnings: 90000 },
        { month: 'Dec', earnings: 100000 },
    ];

    return (
        <Container maxW="container.xl">
            <Text fontSize={20} fontWeight={500} paddingTop={10}>
                Dashboard
            </Text>
            <Row>
                <Col xs lg="3" margin="2%">
                    <Box className={cx('statistic-item')}>
                        <Text fontSize={14}>Total Orders</Text>
                        <Text fontWeight={600}>999</Text>
                    </Box>
                </Col>
                <Col md="auto" lg="3">
                    <Box className={cx('statistic-item')}>
                        <Text fontSize={14}>Earnings (Today)</Text>
                        <Text fontWeight={600}>$40,000</Text>
                    </Box>
                </Col>
                <Col md="auto" lg="3">
                    <Box className={cx('statistic-item')}>
                        <Text fontSize={14}>Earnings (Monthly)</Text>
                        <Text fontWeight={600}>$40,000</Text>
                    </Box>
                </Col>
                <Col md="auto" lg="3">
                    <Box className={cx('statistic-item')}>
                        <Text fontSize={14}>Earnings (Monthly)</Text>
                        <Text fontWeight={600}>$40,000</Text>
                    </Box>
                </Col>
            </Row>
            <Row className={cx('second-row')}>
                <Col xs lg="6" margin="2%">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="earnings" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </Col>
                <Col>
                    <Text fontSize={18} textAlign="center" fontWeight={500}>
                        Top 3 Species
                    </Text>
                    <TableContainer>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Species</Th>
                                    <Th>Color</Th>
                                    <Th>Total Price</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>Ronaldo</Td>
                                    <Td>Red</Td>
                                    <Td>$40,000</Td>
                                </Tr>
                                <Tr>
                                    <Td>Messi</Td>
                                    <Td>Red</Td>
                                    <Td>$40,000</Td>
                                </Tr>
                                <Tr>
                                    <Td>Neymar</Td>
                                    <Td>Red</Td>
                                    <Td>$40,000</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminDashboard;
