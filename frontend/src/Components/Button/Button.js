import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '~/Components/Button/Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to = false,
    href,
    text = false,
    disable = false,
    leftIcon,
    add,
    loginSystemBtn,
    editDeteleSwitch,
    children,
    className,
    onClick,
    key,
    backgroundColorBlue,
    register,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    //remove event listener when btn is disabled
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        to,
        text,
        disable,
        add,
        register,
        loginSystemBtn,
        editDeteleSwitch,
        backgroundColorBlue,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
        </Comp>
    );
}

export default Button;
