import classNames from 'classnames/bind';
import styles from '~/Pages/MngOrder/MngOrder.module.scss';

import { Input, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import Buttons from '~/Components/Button/Button';

const cx = classNames.bind(styles);

function MngOrder() {
    return (
        <div className={cx('wrapper')}>
            {/* Title */}
            <div className={cx('title')}>
                <h1>Order</h1>
            </div>
            {/* Sort space */}
            <div className={cx('add-btn')}>
                <div className={cx('sort-space')}>
                    <form className={cx('sort-space-form')}>
                        <input type="email" placeholder="Mail" />
                        <input type="text" placeholder="Phone" />

                        <select name="status" id="status">
                            <option value="" disabled selected>
                                Status
                            </option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>

                        <select name="price" id="price">
                            <option value="" disabled selected>
                                Create at
                            </option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <select name="price" id="price">
                            <option value="" disabled selected>
                                Price
                            </option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </form>
                </div>
            </div>
            {/* Table */}
            <form className={cx('inner')}>
                <TableContainer>
                    <Table size="lg">
                        <Thead>
                            <Tr>
                                <Th className={`${cx('center-text')}`}>ID</Th>
                                <Th className={`${cx('center-text')}`}>Parrot ID </Th>
                                <Th className={`${cx('center-text')}`}>Customer name</Th>
                                <Th className={`${cx('center-text')}`}>Phone number</Th>
                                <Th className={`${cx('center-text')}`}>Mail</Th>
                                <Th className={`${cx('center-text')}`}>Create at</Th>
                                <Th className={`${cx('center-text')}`}>Price</Th>
                                <Th className={`${cx('center-text')}`}>Status</Th>
                                <Th className={`${cx('center-text')}`}>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td className={`${cx('center-text')}`}>1</Td>
                                <Td className={`${cx('center-text')}`}>1</Td>
                                <Td className={`${cx('center-text')}`}>NGUYEN HOANG NAM</Td>
                                <Td className={`${cx('center-text')}`}>0909928005</Td>
                                <Td className={`${cx('center-text')}`}>nawaniac133@gmail.com</Td>
                                <Td className={`${cx('center-text')}`}>30%</Td>
                                <Td className={`${cx('center-text')}`}>2000000</Td>
                                <Td className={`${cx('center-text')}`}>Active</Td>
                                <Td className={`${cx('center-text')} ${cx('action-column')}`}></Td>
                            </Tr>
                            <Tr>
                                <Td className={`${cx('center-text')}`}>2</Td>
                                <Td className={`${cx('center-text')}`}>2</Td>
                                <Td className={`${cx('center-text')}`}>NGUYEN HOANG NU</Td>
                                <Td className={`${cx('center-text')}`}>0909928006</Td>
                                <Td className={`${cx('center-text')}`}>nawaniac134@gmail.com</Td>
                                <Td className={`${cx('center-text')}`}>30%</Td>
                                <Td className={`${cx('center-text')}`}>3000000</Td>
                                <Td className={`${cx('center-text')}`}>Active</Td>
                                <Td className={`${cx('center-text')}`}></Td>
                            </Tr>
                            <Tr>
                                <Td className={`${cx('center-text')}`}>1</Td>
                                <Td className={`${cx('center-text')}`}>1</Td>
                                <Td className={`${cx('center-text')}`}>NGUYEN HOANG NAM</Td>
                                <Td className={`${cx('center-text')}`}>0909928005</Td>
                                <Td className={`${cx('center-text')}`}>nawaniac133@gmail.com</Td>
                                <Td className={`${cx('center-text')}`}>30%</Td>
                                <Td className={`${cx('center-text')}`}>2000000</Td>
                                <Td className={`${cx('center-text')}`}>Active</Td>
                                <Td className={`${cx('center-text')}`}></Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </form>
        </div>
    );
}

export default MngOrder;
