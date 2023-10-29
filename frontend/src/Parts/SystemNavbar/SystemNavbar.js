import styles from '~/Parts/SystemNavbar/SystemNavbar.module.scss';
import classNames from 'classnames/bind';
import Button from '~/Components/Button/Button';

import logo from '~/Assets/image/Logo/2(5).png';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SystemNavbar({ staff, manager }) {
    const staffItem = [
        {
            title: 'ORDERS',
            path: '/staff-order-management',
        },

        {
            title: 'FEEDBACKS',
            path: '/staff-feedback',
        },
    ];

    const managerItem = [
        {
            title: 'ACCOUNTS',
            path: '/staff-order-management',
        },

        {
            title: 'ROLES',
            path: '/staff-feedback',
        },
        {
            title: 'SERVICE',
            path: '/staff-feedback',
        },
        {
            title: 'SPECIES',
            path: '/staff-feedback',
        },
        {
            title: 'COLORS',
            path: '/staff-feedback',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="">
                    <img className={cx('logo')} src={logo} alt="logo" />
                </Link>
                <div className={cx('nav-items')}>
                    <Link to="/admin/account">
                        <p>ACCOUNTS</p>
                    </Link>
                    <Link to="/admin/role">
                        <p>ROLES</p>
                    </Link>
                    <Link>
                        <p>SERVICE</p>
                    </Link>
                    <Link to="/add-parrot-species">
                        <p>SPECIES</p>
                    </Link>
                    <Link to="/add-parrot">
                        <p>PARROTS</p>
                    </Link>
                </div>

                <div className={cx('user-account')}>
                    <p>Nguyen Thanh</p>
                </div>
                <div className={cx('out-btn')}>
                    <Button className={cx('out-btn-icon')} to="">
                        Out
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SystemNavbar;
