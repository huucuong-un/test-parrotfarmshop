import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';

import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from '~/Pages/SpeciesSelection/SpeciesSelection.module.scss';
import SortSpace from '~/Components/SortSpace/SortSpace';

const cx = classNames.bind(styles);

function SpeciesSelection() {
    const [parrotSpecies, setParrotSpecies] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
    });

    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getParrotsSpecies = async () => {
            try {
                const parrotSpeciesList = await ParrotSpeciesAPI.getAll(pagination);
                setParrotSpecies(parrotSpeciesList.listResult);
                setTotalPage(parrotSpeciesList.totalPage);
            } catch (error) {
                console.error(error);
            }
        };

        getParrotsSpecies();
    }, [pagination]);

    const handlePageChange = (newPage) => {
        setPagination({
            page: newPage,
            limit: 12,
        });

        setPage(newPage);
        console.log(page);
        console.log(pagination);
    };

    return (
        <div className={cx('wrapper')}>
            <StartPartPage>Species Selection</StartPartPage>
            <SortSpace></SortSpace>
            <div className={cx('inner', 'row')}>
                {parrotSpecies.map((parrot, index) => (
                    <div key={index} className={cx('parrot-card', 'col-lg-3')}>
                        <div className={cx('parrot-card-img')}>
                            <img src={parrot.img} alt="species" />
                        </div>
                        <div className={cx('parrot-card-name')}>
                            <p>{parrot.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx('button-pagination')}>
                <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
                    Prev
                </button>
                <button disabled={page === totalPage} onClick={() => handlePageChange(page + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default SpeciesSelection;
