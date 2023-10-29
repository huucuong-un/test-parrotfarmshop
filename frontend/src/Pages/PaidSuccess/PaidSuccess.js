import { Button, ButtonGroup } from '@chakra-ui/react';

import classNames from 'classnames/bind';
import styles from '~/Pages/PaidSuccess/PaidSuccess.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function PaidSuccess() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <FontAwesomeIcon icon={faCircleCheck} className={cx('check-icon')} />
                <h1>Paid Successfully!</h1>
                <div className={cx('active')}>
                    <Link to="/">
                        <Button size="lg" colorScheme="blue">
                            Home
                        </Button>
                    </Link>
                    <Link to="/order-history-new">
                        <Button size="lg" colorScheme="blue">
                            Order History
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PaidSuccess;
