import classNames from 'classnames/bind';
import ChangePasswordForm from '~/Components/ChangePasswordForm/ChangePasswordForm';
import styles from '~/Pages/ChangePassword/ChangePassword.module.scss';

const cx = classNames.bind(styles);

function ChangePassword() {
    return (
        <div className={cx('wrapper')}>
            <ChangePasswordForm></ChangePasswordForm>
        </div>
    );
}

export default ChangePassword;
