import classNames from 'classnames/bind';
import styles from '~/Pages/ParrotProduct/ParrotProduct.module.scss';

import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import SortSpace from '~/Components/SortSpace/SortSpace';
import ParrotList from '~/Components/ParrotList/ParrotList';

import { useState } from 'react';

const cx = classNames.bind(styles);

function ParrotProduct() {
    const [search, setSearch] = useState('');
    const [sortWay, setSortWay] = useState('');

    const handleSearchChange = (newSearchValue) => {
        setSearch(newSearchValue);
    };

    const handleSortChange = (newSortValue) => {
        setSortWay(newSortValue);
    };

    return (
        <div className={cx('wrapper')}>
            <StartPartPage>Parrots</StartPartPage>
            <SortSpace
                search={search}
                onSearchChange={handleSearchChange}
                onSortChange={handleSortChange}
                sortWay={sortWay}
            ></SortSpace>
            <ParrotList search={search} sortWay={sortWay}></ParrotList>
        </div>
    );
}

export default ParrotProduct;
