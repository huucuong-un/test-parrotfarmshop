import Navbar from '~/Parts/Navbar/Navbar';
import Footer from '~/Parts/Footer/Footer';
import classNames from 'classnames/bind';
import styles from '~/Components/DefaultLayout/DefaultLayout.module.scss';
import Contact from '../Contact/Contact';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Navbar />
            <div className={cx('content')}>{children}</div>
            <Contact></Contact>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
