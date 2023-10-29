import classNames from 'classnames';
import styles from './LoginSystemLayout.module.scss';

import SystemNavbar from '~/Parts/SystemHeader/SystemHeader';
const cx = classNames.bind(styles);

function LoginSystemLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <SystemNavbar></SystemNavbar>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default LoginSystemLayout;
