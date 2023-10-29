import styles from '~/Components/SystemLayout/System.module.scss';
import classNames from 'classnames/bind';
import SystemNavbar from '~/Parts/SystemNavbar/SystemNavbar';

const cx = classNames.bind(styles);

function SystemLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <SystemNavbar></SystemNavbar>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default SystemLayout;
