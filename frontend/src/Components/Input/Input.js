import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({ className, placeholder, dob, type, gender, ...passProps }) {
    const props = {
        dob,
        ...passProps,
    };

    const classes = cx('wrapper', {
        [className]: className,
        dob,
        gender,
    });
    return (
        <div className={cx(classes)}>
            <input className={cx('input')} placeholder={placeholder} type={type} {...props}></input>
        </div>
    );
}

export default Input;
