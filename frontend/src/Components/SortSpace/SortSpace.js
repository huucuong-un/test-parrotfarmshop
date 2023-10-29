import styles from '~/Components/SortSpace/SortSpace.module.scss';
import classNames from 'classnames/bind';
import { Input, Stack, InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/react';

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function SortSpace(props) {
    const [search, setSearch] = useState('');
    const [sortWay, setSortWay] = useState('');
    // console.log(search);

    const handleSearchChange = (event) => {
        const newSearchValue = event.target.value;
        setSearch(newSearchValue);
        props.onSearchChange(newSearchValue); // Gọi callback để truyền giá trị `search` lên component cha
    };

    const handleSortChange = (event) => {
        const newSortValue = event.target.value;
        setSortWay(newSortValue);
        props.onSortChange(newSortValue);
    };

    // const handleSelectSort = (event) => {
    //     setSortWay(event);
    // };

    return (
        <div className={cx('wrapper')}>
            <div>
                <div className={cx('sort-space')}>
                    <select className={cx('select')} name="Features" id="dsa" onChange={handleSortChange}>
                        <option defaultValue selected>
                            Features
                        </option>
                        <option value="NASC">A to Z</option>
                        <option value="NDESC">Z to A</option>
                        <option value="PASC">Low to High</option>
                        <option value="PDESC">High to Low</option>
                    </select>
                    <div className={cx('search')}>
                        <input
                            className={cx('search-input')}
                            type="text"
                            placeholder="Search..."
                            onChange={handleSearchChange}
                        />
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SortSpace;
