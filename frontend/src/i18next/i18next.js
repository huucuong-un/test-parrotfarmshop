import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            'Shopping With Fun': 'Shopping With Fun',
        },
    },
    vi: {
        translation: {
            'Shopping With Fun': 'Mua sắm vui vẻ',
        },
    },
};
i18next.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false, // react already safes from xss
    },
});
