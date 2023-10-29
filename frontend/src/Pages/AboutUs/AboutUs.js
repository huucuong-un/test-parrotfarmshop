import classNames from 'classnames/bind';
import styles from '~/Pages/AboutUs/AboutUs.module.scss';

const cx = classNames.bind(styles);

function AboutUs() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <img
                        src="https://cdn.shopify.com/s/files/1/0344/6469/files/about_title.png?v=1505310894"
                        alt="about-us"
                    />
                    <img
                        src="https://cdn.shopify.com/s/files/1/0344/6469/files/about-01_copy.png?v=1523372937"
                        alt="..."
                    />
                </div>
                <div className={cx('about-us-content')}>
                    <p>
                        Inspired by our unconditional love for cats, Meowingtons is more than a company – it is a
                        community for cat lovers to share in the latest and greatest cat trends, news, memes, and advice
                        – all while shopping from the largest variety of unique, cat-themed products.
                    </p>
                    <p>And the best part? We get to help cats in need.</p>
                    <p>
                        Here at Meowingtons, we believe that every cat deserves a forever home, and our mission is to
                        help these amazing felines in any way we can. To give back to our feline community, we work
                        closely with our shelter partners by fostering cats from our office, donating essential supplies
                        and enrichment toys, and sponsoring community cat adoption events – all to help the cats who
                        need it most!
                    </p>
                    <p>
                        We here at Meowingtons are devout and longstanding partners with a local rescue, the Good Luck
                        Cat Cafe! Each month, we sponsor the adoption fee of an adoptable cat at the cafe in hopes of
                        helping them find the forever homes they deserve. This amazing cat cafe is run 100% on donations
                        and volunteers by the Lady Luck Animal Rescue, a 501(c)(3) nonprofit animal rescue.
                    </p>
                </div>
                <div className={cx('success-story-header')}>
                    <h1>Read our Foster Success Stories! </h1>
                </div>
                <div className={cx('about-us-content')}>
                    <p>
                        Our team has been part of an Office Cats Foster Program. We fostered cats from our office space
                        in Fort Lauderdale, Florida. See our Foster Cats Page for their success stories!
                    </p>
                    <div className={cx('center-img')}>
                        <img src="https://storage.googleapis.com/pod_public/1300/160173.jpg" alt="many-parrot" />
                    </div>
                    <p>
                        As the Meowingtons team and community grow, we hope to be able to foster more than just one cat
                        at a time – we hope to make Meowingtons into a full-fledged fostering team alongside website
                        operation.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
