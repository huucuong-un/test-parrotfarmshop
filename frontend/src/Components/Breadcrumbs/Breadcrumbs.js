import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import styles from '~/Components/Breadcrumbs/Breadcrumbs.module.scss';

const cx = classNames.bind(styles);

function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home / </Link>
                </li>
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    return isLast ? (
                        <li key={name}>{name} / </li>
                    ) : (
                        <li key={name}>
                            <Link to={routeTo}>{name} / </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Breadcrumbs;
