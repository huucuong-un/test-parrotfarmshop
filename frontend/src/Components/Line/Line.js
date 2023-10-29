import classNames from 'classnames/bind';
import styles from './Line.module.scss';

const cx = classNames.bind(styles);
function Line() {
    return (
        <div class="wrapper">
            <hr className={cx('horizontal-line')}></hr>
        </div>
    );
}

export default Line;
