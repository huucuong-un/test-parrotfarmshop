import classNames from 'classnames/bind';
import styles from './SystemHeader.module.scss';
import logo from '~/Assets/image/Logo/2(5).png';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SystemHeader() {
    return (
        <div className={cx('wrapper')}>
            <Link className={cx('logo')} to="/">
                <img src={logo} alt="logo"></img>
            </Link>
        </div>
    );
}

export default SystemHeader;
